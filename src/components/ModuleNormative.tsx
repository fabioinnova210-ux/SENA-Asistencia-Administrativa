import React, { useState } from 'react';
import {
  REGULATION_RIGHTS,
  REGULATION_DUTIES,
  REGULATION_FAULTS,
  CASE_STUDIES,
  QUIZ_NORMATIVE,
} from '../data/senaData';
import { ModuleQuiz } from './ModuleQuiz';

interface ModuleNormativeProps {
  onModuleCompleted: (score: number) => void;
  isCompleted: boolean;
}

export const ModuleNormative: React.FC<ModuleNormativeProps> = ({
  onModuleCompleted,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'derechos' | 'deberes' | 'faltas' | 'debidoProceso'>('derechos');
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState<Record<string, number>>({});
  const [feedbackRevealed, setFeedbackRevealed] = useState<Record<string, boolean>>({});

  const currentCase = CASE_STUDIES[selectedCaseIdx];

  const handleSelectCaseOption = (caseId: string, optIdx: number) => {
    setCaseAnswers((prev) => ({ ...prev, [caseId]: optIdx }));
    setFeedbackRevealed((prev) => ({ ...prev, [caseId]: true }));
  };

  const dueProcessSteps = [
    {
      step: '01',
      title: 'Informe o Queja Motivada',
      desc: 'El instructor, compañero o funcionario radica por escrito la presunta falta con evidencias ante la Coordinación Académica.'
    },
    {
      step: '02',
      title: 'Comunicación y Citación Oficial',
      desc: 'Se notifica al aprendiz formalmente con mínimo tres (3) días hábiles de anticipación, indicando las faltas imputadas y pruebas.'
    },
    {
      step: '03',
      title: 'Sesión de Descargos y Pruebas',
      desc: 'En sesión del Comité de Evaluación, el aprendiz es escuchado en descargos, puede presentar testigos o aportar pruebas en su defensa.'
    },
    {
      step: '04',
      title: 'Dictamen y Recomendación',
      desc: 'El Comité delibera y emite un acta motivada recomendando la exoneración, un plan de mejoramiento o una sanción al Subdirector.'
    },
    {
      step: '05',
      title: 'Resolución y Recurso de Reposición',
      desc: 'El Subdirector de Centro expide el acto administrativo. El aprendiz tiene derecho a interponer Recurso de Reposición dentro de los cinco (5) días siguientes.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Módulo 02</span>
              <span aria-hidden="true">·</span>
              <span>Reglamento del Aprendiz SENA</span>
              {isCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Módulo Aprobado</span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Normativa, Convivencia y Garantía del Debido Proceso
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              El Reglamento del Aprendiz vigente, regulado por el <strong className="text-emerald-700 dark:text-emerald-400">Acuerdo 0009 de 2024</strong> y su actualización <strong className="text-emerald-700 dark:text-emerald-400">Acuerdo 2 de 2026</strong>, establece los derechos, deberes y garantías del debido proceso con enfoque diferencial, de género y formativo en el SENA.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setShowQuiz(true)}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              {isCompleted ? 'Repetir Cuestionario de Normativa' : 'Presentar Cuestionario del Módulo (4 Preguntas)'}
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal if open */}
      {showQuiz && (
        <section className="scroll-mt-6">
          <ModuleQuiz
            title="Cuestionario: Reglamento del Aprendiz SENA"
            subtitle="Evalúa tu comprensión sobre derechos, deberes, tipología de faltas y medidas disciplinarias."
            questions={QUIZ_NORMATIVE}
            onCompleteQuiz={(score) => {
              onModuleCompleted(score);
            }}
            onClose={() => setShowQuiz(false)}
          />
        </section>
      )}

      {/* Interactive Tabs for Regulation Core Chapters */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('derechos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'derechos'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Derechos del Aprendiz
          </button>
          <button
            onClick={() => setActiveTab('deberes')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'deberes'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Deberes Fundamentales
          </button>
          <button
            onClick={() => setActiveTab('faltas')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'faltas'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Clasificación de Faltas y Sanciones
          </button>
          <button
            onClick={() => setActiveTab('debidoProceso')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'debidoProceso'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Debido Proceso y Comité de Evaluación
          </button>
        </div>

        {/* Tab 1: Derechos */}
        {activeTab === 'derechos' && (
          <div className="space-y-4">
            <div className="max-w-xl mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Garantías y Derechos Constituidos</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Los aprendices gozan de prerrogativas fundamentales para asegurar una experiencia académica digna, enriquecedora y segura.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGULATION_RIGHTS.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">{item.num}.</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 font-medium">{item.summary}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Deberes */}
        {activeTab === 'deberes' && (
          <div className="space-y-4">
            <div className="max-w-xl mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Deberes y Responsabilidades del Aprendiz</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                El compromiso institucional demanda probidad, respeto a las normas de seguridad y convivencia pacífica dentro y fuera de los ambientes de aprendizaje.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REGULATION_DUTIES.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">{item.num}.</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 font-medium">{item.summary}</p>
                  <div className="text-[11px] text-amber-900 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-950/40 p-2 rounded-md mt-2 border border-amber-200 dark:border-amber-800">
                    <span className="font-semibold">Implicación:</span> {item.consequence}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Faltas */}
        {activeTab === 'faltas' && (
          <div className="space-y-6">
            <div className="max-w-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Tipología de Faltas según Criterios Legales</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Las faltas se clasifican en razón del grado de culpabilidad (dolo o culpa), daño causado, reiteración y afectación al interés institucional.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {REGULATION_FAULTS.map((fault, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between shadow-xs transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400 dark:text-slate-500">Nivel 0{idx + 1}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        fault.type === 'Leves'
                          ? 'border-blue-200 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/50 text-blue-900 dark:text-blue-300'
                          : fault.type === 'Graves'
                          ? 'border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300'
                          : 'border-rose-200 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/50 text-rose-900 dark:text-rose-300'
                      }`}>
                        Faltas {fault.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{fault.definition}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                        Ejemplos concretos:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {fault.examples.map((ex, eIdx) => (
                          <li key={eIdx} className="flex items-start gap-1.5">
                            <span className="text-slate-400 dark:text-slate-600 shrink-0 mt-0.5">▪</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 -mx-5 -mb-5 p-4 rounded-b-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      Medida Formativa o Sanción:
                    </span>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{fault.measure}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Debido Proceso */}
        {activeTab === 'debidoProceso' && (
          <div className="space-y-6">
            <div className="max-w-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Ruta del Debido Proceso Disciplinario</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ninguna sanción es arbitraria. El SENA tutela el derecho a la presunción de inocencia y a la legítima defensa conforme al Artículo 29 de la Constitución Política.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {dueProcessSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{step.step}.</span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-1">{step.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Case Study Simulator */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Simulador Práctico Interactivo
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Simulador de Casos: ¿Cómo fallaría el Comité de Evaluación?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analiza situaciones reales que ocurren en los centros formativos y pon a prueba tu criterio jurídico aplicando el Reglamento del Aprendiz.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex items-center gap-2 mb-6">
          {CASE_STUDIES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseIdx(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCaseIdx === idx
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Caso 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Active Case Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>{currentCase.actor}</span>
              <span aria-hidden="true">·</span>
              <span>Dilema Ético y Reglamentario</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">{currentCase.title}</h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">{currentCase.description}</p>
            <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 italic">
              « {currentCase.situation} »
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5 pt-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              Selecciona la determinación correcta conforme al Reglamento:
            </span>
            {currentCase.options.map((option, optIdx) => {
              const isSelected = caseAnswers[currentCase.id] === optIdx;
              const isRevealed = feedbackRevealed[currentCase.id] === true;

              let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 text-slate-800 dark:text-slate-200';

              if (isRevealed) {
                if (option.isCorrect) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-medium';
                } else if (isSelected && !option.isCorrect) {
                  style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200';
                } else {
                  style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60 text-slate-500 dark:text-slate-400';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectCaseOption(currentCase.id, optIdx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${style}`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {optIdx + 1}
                  </span>
                  <div className="flex-1">
                    <p>{option.text}</p>
                    {isRevealed && isSelected && (
                      <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-xs">
                        <span className="font-bold block mb-0.5">
                          {option.isCorrect ? '✓ Calificación acertada' : '✗ Análisis inexacto'}
                        </span>
                        <p>{option.feedback}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
