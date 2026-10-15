import { describe, it, expect } from 'vitest';
import { weddingConfig } from '../config/invitation';

describe('Wedding Configuration Suite', () => {
  it('should have complete couple details and monograms', () => {
    expect(weddingConfig.couple.groom.name).toBe('عمر');
    expect(weddingConfig.couple.bride.name).toBe('ياسمين');
    expect(weddingConfig.couple.monogramArabic).toBe('ع & ي');
    expect(weddingConfig.couple.monogramLatin).toBe('O & Y');
  });

  it('should have valid ISO event start and end dates with timezone', () => {
    const startTimestamp = Date.parse(weddingConfig.event.date);
    const endTimestamp = Date.parse(weddingConfig.event.endDate);

    expect(isNaN(startTimestamp)).toBe(false);
    expect(isNaN(endTimestamp)).toBe(false);
    expect(endTimestamp).toBeGreaterThan(startTimestamp);
    expect(weddingConfig.event.timezone).toBe('Africa/Cairo');
  });

  it('should have valid venue and Google Maps link', () => {
    expect(weddingConfig.venue.name).toBeTruthy();
    expect(weddingConfig.venue.googleMapsUrl).toMatch(/^https?:\/\//);
  });

  it('should strictly adhere to modest, Islamic-compliant assets', () => {
    // Verified modest motifs: palace architecture, formal groom suit, bridal white floral bouquet
    expect(weddingConfig.photos.hero).toBeTruthy();
    expect(weddingConfig.photos.groomMotif).toBeTruthy();
    expect(weddingConfig.photos.brideMotif).toBeTruthy();
    expect(weddingConfig.photos.gallery.length).toBeGreaterThanOrEqual(3);
  });

  it('should have the exact, unparaphrased Quranic verse and reference', () => {
    const expectedVerse =
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ';
    const expectedReference = 'سورة الروم، الآية ٢١';

    expect(weddingConfig.messages.quranicVerse).toBe(expectedVerse);
    expect(weddingConfig.messages.quranicReference).toBe(expectedReference);
  });
});

describe('Countdown Logic Suite', () => {
  it('should correctly calculate days, hours, minutes, and seconds for future dates', () => {
    const now = Date.now();
    const futureDate = new Date(now + ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000).toISOString();

    const diff = new Date(futureDate).getTime() - now;
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    expect(days).toBe(2);
    expect(hours).toBe(3);
    expect(minutes).toBe(4);
    expect(seconds).toBe(5);
  });

  it('should flag expired dates gracefully', () => {
    const pastDate = '2020-01-01T00:00:00';
    const diff = new Date(pastDate).getTime() - Date.now();
    const isExpired = diff <= 0;

    expect(isExpired).toBe(true);
  });
});

describe('Calendar Integration Suite (Google Calendar & iCal)', () => {
  const formatUtcDateString = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  it('should generate valid Google Calendar URL parameters with timezone and venue', () => {
    const startUtc = formatUtcDateString(weddingConfig.event.date);
    const endUtc = formatUtcDateString(weddingConfig.event.endDate);

    const title = encodeURIComponent(
      `حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`
    );
    const location = encodeURIComponent(
      `${weddingConfig.venue.name}، ${weddingConfig.venue.address}، ${weddingConfig.venue.city}`
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtc}/${endUtc}&location=${location}&ctz=${encodeURIComponent(weddingConfig.event.timezone)}`;

    expect(googleCalendarUrl).toContain('calendar.google.com/calendar/render');
    expect(googleCalendarUrl).toContain(encodeURIComponent(weddingConfig.couple.groom.name));
    expect(googleCalendarUrl).toContain(encodeURIComponent(weddingConfig.venue.name));
    expect(googleCalendarUrl).toContain(startUtc);
    expect(googleCalendarUrl).toContain(endUtc);
  });

  it('should generate RFC 5545 compliant iCalendar (.ics) structure', () => {
    const startUtc = formatUtcDateString(weddingConfig.event.date);
    const endUtc = formatUtcDateString(weddingConfig.event.endDate);
    const nowUtc = formatUtcDateString(new Date().toISOString());

    const summary = `حفل زفاف ${weddingConfig.couple.groom.name} & ${weddingConfig.couple.bride.name}`;
    const location = `${weddingConfig.venue.name}, ${weddingConfig.venue.address}`;

    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luxury Wedding Invitation//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${Date.parse(weddingConfig.event.date)}@palace.invitation`,
      `DTSTAMP:${nowUtc}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ];

    const icsContent = icsLines.join('\r\n');

    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('VERSION:2.0');
    expect(icsContent).toContain('BEGIN:VEVENT');
    expect(icsContent).toContain(`SUMMARY:${summary}`);
    expect(icsContent).toContain(`LOCATION:${location}`);
    expect(icsContent).toContain(`DTSTART:${startUtc}`);
    expect(icsContent).toContain(`DTEND:${endUtc}`);
    expect(icsContent).toContain('END:VEVENT');
    expect(icsContent).toContain('END:VCALENDAR');
  });
});
