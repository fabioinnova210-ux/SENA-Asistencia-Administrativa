import React from 'react';
import { SenaLogo } from './SenaLogo';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
}) => {
  if (!isOpen) return null;

  // Transform Google Drive play/sharing link to embed preview if needed, or use direct link
  const embedUrl = videoUrl.includes('/play')
    ? videoUrl.replace('/play', '/preview')
    : videoUrl;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 p-1">
              <SenaLogo className="w-6 h-6" color="#39a900" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Video Manual de la Plataforma SENA Inducción
              </h3>
              <p className="text-[11px] text-slate-400">
                Guía audiovisual interactiva para aprendices e instructores
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Cerrar video"
          >
            ✕
          </button>
        </div>

        {/* Video Player Container with controls */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <iframe
            src={embedUrl}
            title="Video Manual SENA"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Servicio Nacional de Aprendizaje SENA · Inducción Digital</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Cerrar Reproductor
          </button>
        </div>
      </div>
    </div>
  );
};
