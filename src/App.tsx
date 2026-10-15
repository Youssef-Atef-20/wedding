import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { InvitationCover } from './components/InvitationCover';
import { CoupleReveal } from './components/CoupleReveal';
import { QuranicVerse } from './components/QuranicVerse';
import { CinematicGallery } from './components/CinematicGallery';
import { WeddingDate } from './components/WeddingDate';
import { PersonalMessage } from './components/PersonalMessage';
import { WeddingDetails } from './components/WeddingDetails';
import { ClosingScene } from './components/ClosingScene';
import { FloatingNav } from './components/FloatingNav';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    // Native browser scrolling - zero latency, zero wheel interception
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1E251E] text-[#F8F4EC] selection:bg-[#B79A66] selection:text-[#1E251E] overflow-x-hidden">
      {/* Background Film Grain Noise Texture (Zero repaint cost, non-scrolling) */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Section Navigation Pill (Responsive & auto-hiding) */}
      <FloatingNav />

      {/* Main Narrative Scenes Flow with Native Responsive Scrolling */}
      <main className="w-full relative pb-16 sm:pb-20">
        {/* Scene 1: Invitation Cover & 3D Unfolding Envelope */}
        <InvitationCover />

        {/* Scene 2: Reveal The Couple (Modest, Regal & Proportioned) */}
        <CoupleReveal />

        {/* Scene 3: Dedicated Sacred Quranic Verse Section */}
        <QuranicVerse />

        {/* Scene 4: Cinematic Atmosphere & Architecture */}
        <CinematicGallery />

        {/* Scene 5: The Wedding Date, Countdown & Add to Calendar */}
        <WeddingDate />

        {/* Scene 6: A Personal Family Invitation Letter */}
        <PersonalMessage />

        {/* Scene 7: Wedding Details, Timetable & Google Maps */}
        <WeddingDetails />

        {/* Scene 8: The Final Moment & Navigation */}
        <ClosingScene />
      </main>
    </div>
  );
}

export default App;
