import { describe, it, expect } from 'vitest';
import { weddingConfig } from '../config/invitation';

describe('Wedding Configuration Suite', () => {
  it('should have complete couple details and monograms', () => {
    expect(weddingConfig.couple.groom.name).toBe('عمر');
    expect(weddingConfig.couple.bride.name).toBe('ياسمين');
    expect(weddingConfig.couple.monogramArabic).toBe('ع & ي');
    expect(weddingConfig.couple.monogramLatin).toBe('O & Y');
  });

  it('should have a valid ISO event date', () => {
    const timestamp = Date.parse(weddingConfig.event.date);
    expect(isNaN(timestamp)).toBe(false);
    expect(new Date(timestamp).getFullYear()).toBeGreaterThanOrEqual(2026);
  });

  it('should have a valid WhatsApp phone number and Google Maps link', () => {
    expect(weddingConfig.rsvp.whatsappNumber).toMatch(/^\d{10,15}$/);
    expect(weddingConfig.venue.googleMapsUrl).toMatch(/^https?:\/\//);
  });
});

describe('Countdown Logic Suite', () => {
  it('should correctly calculate days, hours, minutes, and seconds for future dates', () => {
    // 2 days, 3 hours, 4 minutes, 5 seconds in future
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

describe('RSVP WhatsApp Message Formatting', () => {
  it('should encode attending message with guest name and count accurately', () => {
    const name = 'أحمد محمود';
    const guestCount = 2;
    const groom = weddingConfig.couple.groom.name;
    const bride = weddingConfig.couple.bride.name;

    const message =
      `السلام عليكم ورحمة الله وبركاته،\n` +
      `أنا: ${name}\n` +
      `يشرفني تأكيد حضور حفل زفاف ${groom} & ${bride}.\n` +
      `عدد الحضور: ${guestCount} فرد.\n` +
      `بارك الله لكما وبارك عليكما وجمع بينكما في خير!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${encoded}`;

    expect(whatsappUrl).toContain('wa.me/' + weddingConfig.rsvp.whatsappNumber);
    expect(whatsappUrl).toContain(encodeURIComponent(name));
    expect(whatsappUrl).toContain(encodeURIComponent(`عدد الحضور: ${guestCount} فرد.`));
  });

  it('should encode polite apology message when declining', () => {
    const name = 'سارة خالد';
    const groom = weddingConfig.couple.groom.name;
    const bride = weddingConfig.couple.bride.name;

    const message =
      `السلام عليكم ورحمة الله وبركاته،\n` +
      `أنا: ${name}\n` +
      `أعتذر بكل أسف لعدم تمكني من حضور حفل زفاف ${groom} & ${bride}.\n` +
      `مع أطيب تمنياتي لكم بحياة زوجية سعيدة ومباركة!`;

    const encoded = encodeURIComponent(message);
    expect(decodeURIComponent(encoded)).toContain('أعتذر بكل أسف');
    expect(decodeURIComponent(encoded)).toContain(name);
  });
});
