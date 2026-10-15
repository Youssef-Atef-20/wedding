import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { InvitationCover } from './components/InvitationCover';
import { CoupleReveal } from './components/CoupleReveal';
import { CinematicGallery } from './components/CinematicGallery';
import { WeddingDate } from './components/WeddingDate';
import { PersonalMessage } from './components/PersonalMessage';
import { WeddingDetails } from './components/WeddingDetails';
import { RSVPSection } from './components/RSVPSection';
import { ClosingScene } from './components/ClosingScene';
import { AudioToggle } from './components/AudioToggle';
import { FloatingNav } from './components/FloatingNav';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when components and assets mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1E251E] text-[#F8F4EC] selection:bg-[#B79A66] selection:text-[#1E251E]">
      {/* Background Film Grain Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Floating Audio Soundtrack Controller */}
      <AudioToggle />

      {/* Floating Section Navigation Pill */}
      <FloatingNav />

      {/* Main Narrative Scenes Flow */}
      <main className="w-full relative">
        {/* Scene 1: Invitation Cover & 3D Unfolding Envelope */}
        <InvitationCover />

        {/* Scene 2: Reveal The Couple */}
        <CoupleReveal />

        {/* Scene 3: Cinematic Photography Sequence */}
        <CinematicGallery />

        {/* Scene 4: The Wedding Date & Live Countdown */}
        <WeddingDate />

        {/* Scene 5: A Personal Message & Quranic Blessing */}
        <PersonalMessage />

        {/* Scene 6: Wedding Details, Timetable & Google Maps */}
        <WeddingDetails />

        {/* Scene 7: RSVP Form to WhatsApp */}
        <RSVPSection />

        {/* Scene 8: The Final Moment & Navigation */}
        <ClosingScene />
      </main>
    </div>
  );
}

export default App;
