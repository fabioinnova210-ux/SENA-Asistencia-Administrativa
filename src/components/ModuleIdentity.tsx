import React, { useState } from 'react';
import { SENA_SYMBOLS, SENA_HISTORY_TIMELINE, QUIZ_IDENTITY } from '../data/senaData';
import { HymnAudioPlayer } from './HymnAudioPlayer';
import { ModuleQuiz } from './ModuleQuiz';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';

interface ModuleIdentityProps {
  onModuleCompleted: (score: number) => void;
  isCompleted: boolean;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  onModuleCompleted,
  isCompleted,
}) => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<'escudo' | 'logosimbolo' | 'bandera'>('escudo');
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0);

  const selectedSymbol = SENA_SYMBOLS.find((s) => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  const coreValues = [
    {
      title: 'Integridad',
      desc: 'Obrar con rectitud, coherencia, verdad y apego a los principios éticos en cada acto académico y laboral.'
    },
    {
      title: 'Respeto',
      desc: 'Reconocer y valorar la dignidad individual, la diversidad cultural, las ideas y los derechos de cada persona.'
    },
    {
      title: 'Compromiso',
      desc: 'Asumir con responsabilidad y pasión el rol de aprendiz como motor de cambio para la familia y el país.'
    },
    {
      title: 'Solidaridad',
      desc: 'Trabajo colaborativo, empatía con los compañeros de ficha y vocación de servicio hacia la comunidad.'
    },
    {
      title: 'Transparencia',
      desc: 'Claridad en las evidencias formativas, honestidad académica y uso pulcro de los recursos institucionales.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Module Title & Hero Area */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <SenaLogo className="w-5 h-5 shrink-0" color="#39a900" />
              <span>Módulo 01</span>
              <span aria-hidden="true">·</span>
              <span>Identidad e Imagen Institucional</span>
              {isCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Módulo Aprobado</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-balance">
              El Sentido de Pertenecer a la Entidad Más Querida de Colombia
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              El Servicio Nacional de Aprendizaje (SENA) nació en 1957 para dotar a la fuerza trabajadora del país de competencias técnicas de excelencia con sentido social y humanístico. Como aprendiz, tu identidad representa la innovación, el esfuerzo y los caminos de progreso que forjan nuestra patria.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
              >
                {isCompleted ? 'Repetir Cuestionario de Identidad' : 'Presentar Cuestionario del Módulo (4 Preguntas)'}
              </button>
              <a
                href="#himno-sena"
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Escuchar Himno
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-800 p-6 max-w-sm w-full flex flex-col items-center justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-24 h-28 flex items-center justify-center p-2 bg-emerald-50/60 dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-slate-700">
                  <SenaEscudo className="w-full h-full object-contain drop-shadow-xs" />
                </div>
                <div className="w-24 h-28 flex items-center justify-center p-2 bg-emerald-50/60 dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-slate-700">
                  <SenaLogo className="w-16 h-16" color="#39a900" />
                </div>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Símbolos e Identidad Oficial SENA
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Escudo Institucional y Logosímbolo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section if open */}
      {showQuiz && (
        <section className="scroll-mt-6">
          <ModuleQuiz
            title="Cuestionario: Identidad e Imagen SENA"
            subtitle="Pon a prueba tus conocimientos sobre la fundación, símbolos y valores institucionales."
            questions={QUIZ_IDENTITY}
            onCompleteQuiz={(score) => {
              onModuleCompleted(score);
            }}
            onClose={() => setShowQuiz(false)}
          />
        </section>
      )}

      {/* Interactive Símbolos Institucionales */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Apropiación Visual y Semiótica
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Explorador Interactivo de los Símbolos SENA
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Selecciona un símbolo para descubrir su arquitectura gráfica y significado institucional profundo.
          </p>
        </div>

        {/* Segmented Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-md mb-6">
          <button
            onClick={() => setSelectedSymbolId('logosimbolo')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedSymbolId === 'logosimbolo'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Logosímbolo
          </button>
          <button
            onClick={() => setSelectedSymbolId('escudo')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedSymbolId === 'escudo'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Escudo
          </button>
          <button
            onClick={() => setSelectedSymbolId('bandera')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedSymbolId === 'bandera'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bandera
          </button>
        </div>

        {/* Selected Symbol Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-slate-50/70 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
            {selectedSymbolId === 'logosimbolo' && (
              <div className="w-40 h-40 rounded-2xl bg-emerald-50 dark:bg-slate-900 border-2 border-emerald-500/40 flex flex-col items-center justify-center shadow-inner p-4">
                <SenaLogo className="w-28 h-28" color="#39a900" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 dark:text-emerald-400 mt-2">
                  Logosímbolo Oficial
                </span>
              </div>
            )}
            {selectedSymbolId === 'escudo' && (
              <div className="w-44 h-48 rounded-2xl bg-emerald-50/60 dark:bg-slate-900 border-2 border-emerald-500/40 flex flex-col items-center justify-center shadow-inner p-3">
                <SenaEscudo className="w-28 h-32 object-contain drop-shadow-md" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 dark:text-emerald-400 mt-2">
                  Escudo Oficial SENA
                </span>
              </div>
            )}
            {selectedSymbolId === 'bandera' && (
              <div className="w-56 h-36 bg-white border-2 border-slate-300 dark:border-slate-600 rounded shadow-md flex items-center justify-center relative overflow-hidden">
                <div className="w-20 h-24 flex items-center justify-center p-1">
                  <SenaEscudo className="w-full h-full object-contain" />
                </div>
                <div className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-mono">Proporción 2:3</div>
              </div>
            )}

            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-4">{selectedSymbol.name}</h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">{selectedSymbol.tagline}</p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{selectedSymbol.description}</p>

            <div className="space-y-3">
              {selectedSymbol.elements.map((el, idx) => (
                <div key={idx} className="p-3.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{el.part}</h5>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pl-4">{el.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hymn Section with Web Audio Player */}
      <section id="himno-sena" className="scroll-mt-20">
        <HymnAudioPlayer />
      </section>

      {/* Timeline Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Memoria Histórica
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Línea de Tiempo: De 1957 a la Era de Tecnologías 4.0
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Conoce los grandes hitos de transformación institucional a lo largo de casi siete décadas de formación profesional integral.
          </p>
        </div>

        {/* Timeline Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {SENA_HISTORY_TIMELINE.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTimelineIdx(idx)}
              className={`p-3 rounded-lg border text-left transition-all ${
                idx === activeTimelineIdx
                  ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 shadow-xs font-bold'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              <span className="text-xs font-mono font-semibold block">{item.year}</span>
              <span className="text-xs truncate block mt-0.5">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Timeline Card */}
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
            <span>Hito Histórico</span>
            <span aria-hidden="true">·</span>
            <span>{SENA_HISTORY_TIMELINE[activeTimelineIdx].year}</span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {SENA_HISTORY_TIMELINE[activeTimelineIdx].title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            {SENA_HISTORY_TIMELINE[activeTimelineIdx].description}
          </p>
        </div>
      </section>

      {/* Institutional Core Values */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Ética y Convivencia
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Principios y Valores del Aprendiz SENA
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pilares fundamentales que orientan el comportamiento, la excelencia académica y la formación del ser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all">
              <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">0{idx + 1}.</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{val.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
