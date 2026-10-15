import { useState, useRef, useEffect, type FC } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioToggle: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const sequenceTimerRef = useRef<number | null>(null);

  // Synthesize a very gentle, cinematic romantic ambient chord progression using Web Audio API
  // This guarantees 100% offline reliability, zero 404s, zero CORS issues, and zero lag.
  const playRomanticChords = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Elegant Pentatonic & Romantic chord progressions (Frequencies in Hz)
      // D major / B minor / G major luxury cinematic progression
      const chords = [
        [293.66, 369.99, 440.0, 587.33], // D - F# - A - D
        [246.94, 293.66, 369.99, 440.0],  // B - D - F# - A
        [196.0, 246.94, 293.66, 392.0],   // G - B - D - G
        [220.0, 277.18, 329.63, 440.0],   // A - C# - E - A
      ];

      let chordIndex = 0;

      const scheduleChord = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;
        const currentChord = chords[chordIndex];
        const now = ctx.currentTime;

        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Arpeggio offset
          const noteStart = now + noteIdx * 0.18;
          const noteDuration = 3.2;

          gain.gain.setValueAtTime(0.0001, noteStart);
          gain.gain.exponentialRampToValueAtTime(0.035, noteStart + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + noteDuration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(noteStart);
          osc.stop(noteStart + noteDuration);
        });

        chordIndex = (chordIndex + 1) % chords.length;
        sequenceTimerRef.current = window.setTimeout(scheduleChord, 3400);
      };

      scheduleChord();
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  const stopAudio = () => {
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      stopAudio();
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      playRomanticChords();
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      stopAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-6 left-6 z-50">
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'كتم الموسيقى المحيطة' : 'تشغيل الموسيقى الاحتفالية الهادئة'}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1E251E]/80 hover:bg-[#283226] backdrop-blur-xl border border-[#B79A66]/40 text-[#E8D8BD] text-xs font-sans-ar shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <div className="relative w-5 h-5 flex items-center justify-center text-[#B79A66]">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#E8D8BD]/60" />
          )}
        </div>

        <span className="hidden sm:inline font-medium">
          {isPlaying ? 'الموسيقى تعمل' : 'موسيقى الحفل'}
        </span>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-2 bg-[#B79A66] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-3 bg-[#B79A66] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-2.5 bg-[#B79A66] rounded-full animate-bounce" />
          </div>
        )}

        <Music className="w-3.5 h-3.5 text-[#B79A66]/60 hidden sm:block" />
      </button>
    </div>
  );
};
