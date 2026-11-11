import React from 'react';
import { UserRole } from '../types';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  role: UserRole;
  onToggleRole: () => void;
  isCertified: boolean;
  onOpenCertificate: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenLanding: () => void;
  onOpenVideoManual: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  role,
  onToggleRole,
  isCertified,
  onOpenCertificate,
  isDarkMode,
  onToggleDarkMode,
  onOpenLanding,
  onOpenVideoManual,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark with Official SENA Logo */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-left font-bold tracking-tight text-slate-900 dark:text-slate-100 text-lg whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-2.5 cursor-pointer"
        >
          <SenaLogo className="w-[50px] h-[50px] shrink-0 transition-transform" color="#39a900" />
          <span className="hidden sm:inline">Inducción Institucional</span>
          <span className="sm:hidden font-extrabold text-emerald-600 dark:text-emerald-400">SENA</span>
        </button>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('overview')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
              currentTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Ruta de Inducción
          </button>
          <button
            onClick={() => onSelectTab('identity')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
              currentTab === 'identity'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Identidad y Símbolos
          </button>
          <button
            onClick={() => onSelectTab('normative')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
              currentTab === 'normative'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Reglamento y Casos
          </button>
          <button
            onClick={() => onSelectTab('ecosystem')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 cursor-pointer ${
              currentTab === 'ecosystem'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            Ecosistema y Servicios
          </button>
        </nav>

        {/* Zone 3: Actions + Role Switch + Dark Mode */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {isCertified && (
            <button
              onClick={onOpenCertificate}
              className="hidden xl:inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-md text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ver Certificado
            </button>
          )}

          {/* Quick Role Toggle */}
          <button
            onClick={onToggleRole}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              role === 'instructor'
                ? 'bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
            }`}
          >
            {role === 'instructor' ? 'Vista Aprendiz' : 'Seguimiento Ficha'}
          </button>

          {/* Return to Landing Page Button */}
          <button
            onClick={onOpenLanding}
            title="Ir a la portada y seleccionar rol o aprendiz"
            className="px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
          >
            <span>Cambiar Rol</span>
          </button>

          {/* Video Manual Button */}
          <button
            onClick={onOpenVideoManual}
            title="Ver video manual de la plataforma"
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 shadow-xs"
          >
            <span>▶️ Video Manual</span>
          </button>

          {/* Dark Mode Activation Button */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Desactivar modo oscuro (volver a modo claro)' : 'Activar modo oscuro'}
            aria-label={isDarkMode ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}
            className="p-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs active:scale-95"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
