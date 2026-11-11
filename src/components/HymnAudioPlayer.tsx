import React, { useState, useEffect, useRef } from 'react';
import { SENA_HYMN_VERSES } from '../data/senaData';

export const HymnAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Anthem melodic motifs (frequencies in Hz for a solemn brass/bell fanfare)
  const anthemNotes = [
    // Coro: "Estudiantes del SENA adelante..."
    { freq: 261.63, dur: 0.4 }, // C4
    { freq: 329.63, dur: 0.4 }, // E4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 523.25, dur: 0.8 }, // C5
    { freq: 493.88, dur: 0.4 }, // B4
    { freq: 440.00, dur: 0.4 }, // A4
    { freq: 392.00, dur: 0.6 }, // G4
    // "...por Colombia luchad con amor"
    { freq: 349.23, dur: 0.4 }, // F4
    { freq: 392.00, dur: 0.4 }, // G4
    { freq: 440.00, dur: 0.5 }, // A4
    { freq: 392.00, dur: 0.4 }, // G4
    { freq: 349.23, dur: 0.4 }, // F4
    { freq: 329.63, dur: 0.7 }, // E4
    // "...con el ánimo noble y radiante"
    { freq: 293.66, dur: 0.4 }, // D4
    { freq: 349.23, dur: 0.4 }, // F4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 440.00, dur: 0.4 }, // A4
    { freq: 392.00, dur: 0.4 }, // G4
    { freq: 349.23, dur: 0.4 }, // F4
    { freq: 329.63, dur: 0.6 }, // E4
    // "...transformémosle el mundo en mejor"
    { freq: 293.66, dur: 0.4 }, // D4
    { freq: 261.63, dur: 0.4 }, // C4
    { freq: 329.63, dur: 0.4 }, // E4
    { freq: 392.00, dur: 0.5 }, // G4
    { freq: 261.63, dur: 0.9 }, // C4
  ];

  const playTone = (ctx: AudioContext, freq: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm brass / harmonic organ overtone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration - 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback silent
    }
  };

  const startPlayback = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);

      let noteIndex = 0;
      let lineCounter = 0;
      let verseCounter = 0;

      const scheduleNext = () => {
        if (!audioCtxRef.current) return;
        const currentNote = anthemNotes[noteIndex % anthemNotes.length];
        playTone(audioCtxRef.current, currentNote.freq, currentNote.dur / audioSpeed);

        noteIndex++;
        if (noteIndex % 6 === 0) {
          lineCounter = (lineCounter + 1) % 4;
          setActiveLineIndex(lineCounter);
          if (lineCounter === 0) {
            verseCounter = (verseCounter + 1) % SENA_HYMN_VERSES.length;
            setActiveVerseIndex(verseCounter);
          }
        }

        const nextDelay = (currentNote.dur / audioSpeed) * 1000;
        timerRef.current = window.setTimeout(scheduleNext, nextDelay);
      };

      scheduleNext();
    } catch {
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="bg-slate-900 text-white rounded-xl p-6 shadow-md border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
            Símbolo Sonoro Oficial
          </span>
          <h3 className="text-xl font-bold text-white mt-0.5">Himno Institucional del SENA</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Letra: Jesús Briceño S. y Luis A. Osorio · Música: Maestro Luis A. Osorio
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setAudioSpeed(0.85)}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                audioSpeed === 0.85 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              0.8x
            </button>
            <button
              onClick={() => setAudioSpeed(1)}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                audioSpeed === 1 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              1.0x
            </button>
            <button
              onClick={() => setAudioSpeed(1.2)}
              className={`px-2.5 py-1 text-xs font-medium rounded ${
                audioSpeed === 1.2 ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              1.2x
            </button>
          </div>

          <button
            onClick={isPlaying ? stopPlayback : startPlayback}
            className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-sm bg-slate-950" />
                <span>Pausar Melodía</span>
              </>
            ) : (
              <>
                <span className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-slate-950 ml-0.5" />
                <span>Escuchar Himno</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Karaoke / Lyric Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-5">
        {/* Active Verse Spotlight */}
        <div className="lg:col-span-2 bg-slate-950/70 rounded-lg p-4 border border-emerald-900/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-emerald-400 font-mono font-medium mb-2">
              <span>{SENA_HYMN_VERSES[activeVerseIndex].type}</span>
              <span>{isPlaying ? 'Sintetizando acordes...' : 'Listo para reproducir'}</span>
            </div>
            <div className="space-y-2 mt-3">
              {SENA_HYMN_VERSES[activeVerseIndex].lyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-sm transition-all duration-300 font-medium ${
                    isPlaying && idx === activeLineIndex
                      ? 'text-emerald-300 font-bold translate-x-1'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Estrofa {activeVerseIndex + 1} de {SENA_HYMN_VERSES.length}</span>
            <div className="flex gap-1">
              {SENA_HYMN_VERSES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveVerseIndex(i);
                    setActiveLineIndex(0);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeVerseIndex ? 'bg-emerald-400' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ir a estrofa ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Complete Lyrics Carousel List */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
          {SENA_HYMN_VERSES.map((verse, vIdx) => (
            <div
              key={vIdx}
              onClick={() => {
                setActiveVerseIndex(vIdx);
                setActiveLineIndex(0);
              }}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                vIdx === activeVerseIndex
                  ? 'border-emerald-500 bg-emerald-950/30'
                  : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <span className="text-xs font-mono font-semibold text-emerald-400 block mb-1">
                {verse.type}
              </span>
              <div className="space-y-0.5">
                {verse.lyrics.map((line, lIdx) => (
                  <p key={lIdx} className="text-xs text-slate-300 truncate">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
