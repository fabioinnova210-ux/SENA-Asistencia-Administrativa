import React, { useState } from 'react';
import { LearnerProfile, Badge } from '../types';
import { SenaEscudo } from './SenaEscudo';

interface LearnerOverviewProps {
  learner: LearnerProfile;
  onUpdateLearner: (updated: LearnerProfile) => void;
  progressPercent: number;
  completedModules: {
    identity: boolean;
    normative: boolean;
    ecosystem: boolean;
    finalQuiz: boolean;
  };
  moduleScores: {
    identity?: number;
    normative?: number;
    ecosystem?: number;
    finalQuiz?: number;
  };
  badges: Badge[];
  onNavigateTab: (tab: string) => void;
  onOpenCertificate: () => void;
  onStartFinalQuiz: () => void;
}

export const LearnerOverview: React.FC<LearnerOverviewProps> = ({
  learner,
  onUpdateLearner,
  progressPercent,
  completedModules,
  moduleScores,
  badges,
  onNavigateTab,
  onOpenCertificate,
  onStartFinalQuiz,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState<LearnerProfile>({ ...learner });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLearner(formData);
    setIsEditingProfile(false);
  };

  const isEligibleForFinalExam =
    completedModules.identity && completedModules.normative && completedModules.ecosystem;

  const isInductionComplete =
    completedModules.identity &&
    completedModules.normative &&
    completedModules.ecosystem &&
    completedModules.finalQuiz;

  return (
    <div className="space-y-10">
      {/* Welcome Hero Strip */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Text & Stats */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                <span>Centro de Formación SENA</span>
                <span aria-hidden="true">·</span>
                <span>Proceso de Inducción Inicial 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-balance">
                ¡Bienvenido(a) al SENA, {learner.nombre.split(' ')[0]}!
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Has iniciado tu camino hacia la excelencia técnica y humana. Esta herramienta interactiva te guiará paso a paso en el conocimiento de la imagen institucional, los símbolos patrios, tus derechos y deberes, y el ecosistema de servicios que transformará tu futuro.
              </p>
            </div>

            {/* Learner Info Details */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Ficha de Formación:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{learner.ficha}</span>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <span className="text-slate-400 dark:text-slate-500 block text-[11px]">Programa:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{learner.programa}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 flex items-center justify-between pt-2">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {learner.regional} · {learner.centro}
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold underline shrink-0 ml-2"
                >
                  Editar Datos
                </button>
              </div>
            </div>
          </div>

          {/* Campus Photo & Progress Gauge */}
          <div className="lg:col-span-5 relative bg-slate-900 flex flex-col justify-between p-6 text-white min-h-[220px]">
            <img
              src="/src/assets/images/sena_campus_modern_1794325217011.jpg"
              alt="Campus de Formación SENA"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Progreso General de Inducción
              </span>
              <span className="text-xs font-mono bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white">
                Ficha {learner.ficha}
              </span>
            </div>

            <div className="relative z-10 my-4 text-center">
              <div className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                {progressPercent}%
              </div>
              <p className="text-xs text-slate-200 mt-1">
                {isInductionComplete
                  ? '¡Inducción 100% aprobada con certificación lista!'
                  : 'Avanza en los módulos interactivos para desbloquear tu certificado.'}
              </p>
            </div>

            <div className="relative z-10 w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Edit Profile Drawer */}
      {isEditingProfile && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-colors">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Personalizar Ficha del Aprendiz</h3>
            <button
              onClick={() => setIsEditingProfile(false)}
              className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Cancelar
            </button>
          </div>
          <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Nombre Completo:</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Documento de Identidad:</label>
              <input
                type="text"
                value={formData.documento}
                onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Número de Ficha:</label>
              <input
                type="text"
                value={formData.ficha}
                onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Programa de Formación:</label>
              <input
                type="text"
                value={formData.programa}
                onChange={(e) => setFormData({ ...formData, programa: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Regional:</label>
              <input
                type="text"
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Centro de Formación:</label>
              <input
                type="text"
                value={formData.centro}
                onChange={(e) => setFormData({ ...formData, centro: e.target.value })}
                className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>
            <div className="sm:col-span-2 pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Descartar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
              >
                Guardar Información
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Induction Learning Roadmap (4 Steps) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Ruta Formativa de Inducción
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Completa cada estación interactiva y su evaluación formativa para certificar tu ingreso.
            </p>
          </div>

          {isInductionComplete && (
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors self-start sm:self-auto"
            >
              Descargar Certificado Oficial (PDF)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1: Identidad */}
          <div className={`p-5 rounded-xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all ${
            completedModules.identity
              ? 'border-emerald-300 dark:border-emerald-800/80 shadow-xs'
              : 'border-slate-200 dark:border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-semibold text-slate-400 dark:text-slate-500">01. Identidad</span>
                {completedModules.identity ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Aprobado {moduleScores.identity && `(${moduleScores.identity}%)`}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">Pendiente</span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Símbolos e Historia</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Escudo desglosado, logosímbolo, bandera blanca, himno interactivo y valores éticos.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('identity')}
                className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 text-slate-800 dark:text-slate-200 transition-colors"
              >
                {completedModules.identity ? 'Repasar Contenido' : 'Iniciar Estación 01'}
              </button>
            </div>
          </div>

          {/* Step 2: Normativa */}
          <div className={`p-5 rounded-xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all ${
            completedModules.normative
              ? 'border-emerald-300 dark:border-emerald-800/80 shadow-xs'
              : 'border-slate-200 dark:border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-semibold text-slate-400 dark:text-slate-500">02. Reglamento</span>
                {completedModules.normative ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Aprobado {moduleScores.normative && `(${moduleScores.normative}%)`}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">Pendiente</span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Normativa y Convivencia</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Derechos, deberes, tipología de faltas (Acuerdo 0009 de 2024) y simulador del Comité.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('normative')}
                className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 text-slate-800 dark:text-slate-200 transition-colors"
              >
                {completedModules.normative ? 'Repasar Contenido' : 'Iniciar Estación 02'}
              </button>
            </div>
          </div>

          {/* Step 3: Ecosistema */}
          <div className={`p-5 rounded-xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all ${
            completedModules.ecosystem
              ? 'border-emerald-300 dark:border-emerald-800/80 shadow-xs'
              : 'border-slate-200 dark:border-slate-800'
          }`}>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-semibold text-slate-400 dark:text-slate-500">03. Ecosistema</span>
                {completedModules.ecosystem ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    ✓ Aprobado {moduleScores.ecosystem && `(${moduleScores.ecosystem}%)`}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">Pendiente</span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Servicios y Etapa Productiva</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Zajuna LMS, Bienestar al Aprendiz, Biblioteca, APE y opciones de práctica laboral.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onNavigateTab('ecosystem')}
                className="w-full py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-800 dark:hover:text-emerald-300 text-slate-800 dark:text-slate-200 transition-colors"
              >
                {completedModules.ecosystem ? 'Repasar Contenido' : 'Iniciar Estación 03'}
              </button>
            </div>
          </div>

          {/* Step 4: Certificación Final */}
          <div className={`p-5 rounded-xl border bg-white dark:bg-slate-900 flex flex-col justify-between transition-all ${
            completedModules.finalQuiz
              ? 'border-emerald-400 dark:border-emerald-700 bg-emerald-50/20 dark:bg-emerald-950/20'
              : isEligibleForFinalExam
              ? 'border-emerald-300 dark:border-emerald-800'
              : 'border-slate-200 dark:border-slate-800 opacity-80'
          }`}>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-semibold text-slate-400 dark:text-slate-500">04. Evaluación Final</span>
                {completedModules.finalQuiz ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Certificado</span>
                ) : isEligibleForFinalExam ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Listo para rendir</span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500">Bloqueado</span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Certificación Oficial</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Examen integral de verificación de conocimientos de inducción y generación de diploma.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              {completedModules.finalQuiz ? (
                <button
                  onClick={onOpenCertificate}
                  className="w-full py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  Ver Certificado
                </button>
              ) : isEligibleForFinalExam ? (
                <button
                  onClick={onStartFinalQuiz}
                  className="w-full py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs"
                >
                  Rendir Examen Final
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                >
                  Completa los 3 Módulos
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Gamification / Insignias */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Reconocimientos al Mérito Formativo
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Insignias y Logros de Inducción
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Desbloquea insignias que acreditan tu apropiación institucional conforme avanzas en los módulos y cuestionarios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all text-center flex flex-col items-center justify-between ${
                b.unlocked
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-slate-100'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 opacity-60 text-slate-500 dark:text-slate-400'
              }`}
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-lg mb-2 ${
                    b.unlocked
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {b.id === 'badge-identidad' && (
                    <div className="w-8 h-8 flex items-center justify-center">
                      <SenaEscudo className="w-full h-full object-contain" />
                    </div>
                  )}
                  {b.id === 'badge-normativa' && '⚖️'}
                  {b.id === 'badge-ecosistema' && '🧭'}
                  {b.id === 'badge-casos' && '🏆'}
                  {b.id === 'badge-certificacion' && '🎓'}
                </div>
                <h4 className="text-xs font-bold">{b.title}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">{b.description}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 w-full text-[10px] font-mono">
                {b.unlocked ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Desbloqueado</span>
                ) : (
                  <span>Por desbloquear</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
