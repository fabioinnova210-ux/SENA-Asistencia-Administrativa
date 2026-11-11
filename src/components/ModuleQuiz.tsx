import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface ModuleQuizProps {
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  onCompleteQuiz: (scorePercent: number) => void;
  onClose?: () => void;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  title,
  subtitle,
  questions,
  onCompleteQuiz,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const hasSelected = selectedAnswers[currentIndex] !== undefined;
  const isAnswerSubmitted = submittedAnswers[currentIndex] === true;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: index }));
  };

  const handleConfirmAnswer = () => {
    if (!hasSelected) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / questions.length) * 100);
    setIsFinished(true);
    onCompleteQuiz(percentage);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const correctAnswersCount = questions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctIndex
  ).length;
  const finalPercentage = Math.round((correctAnswersCount / questions.length) * 100);
  const passed = finalPercentage >= 75;

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-2xl mx-auto transition-colors">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
          passed
            ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
            : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
        }`}>
          <span className="text-2xl font-bold font-mono">{finalPercentage}%</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {passed ? '¡Felicitaciones! Módulo Aprobado' : 'Cuestionario Completado - Requiere Refuerzo'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
          {passed
            ? `Has demostrado un alto dominio de los contenidos institucionales (${correctAnswersCount} de ${questions.length} respuestas correctas). Tu avance ha sido registrado en tu hoja de ruta de inducción.`
            : `Obtuviste ${correctAnswersCount} de ${questions.length} respuestas correctas. El SENA exige un puntaje mínimo del 75% para la aprobación de la competencia. Puedes repasar y reintentar.`}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Reintentar Cuestionario
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Continuar a la Ruta de Inducción
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto transition-colors">
      {/* Quiz Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Evaluación Formativa Interactiva
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block">Pregunta</span>
          <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
            {currentIndex + 1} <span className="text-slate-400 dark:text-slate-500 font-normal">/ {questions.length}</span>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
        <div
          className="bg-emerald-600 dark:bg-emerald-500 h-1.5 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Text */}
      <div className="my-6">
        <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
          {currentQuestion.question}
        </h4>
        <span className="inline-block mt-2 text-xs text-slate-400 dark:text-slate-500 font-medium">
          Referencia: {currentQuestion.normReference}
        </span>
      </div>

      {/* Options List */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswers[currentIndex] === idx;
          const isCorrect = idx === currentQuestion.correctIndex;

          let optionStyle =
            'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 text-slate-800 dark:text-slate-200';

          if (isAnswerSubmitted) {
            if (isCorrect) {
              optionStyle =
                'border-emerald-500 dark:border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-medium';
            } else if (isSelected && !isCorrect) {
              optionStyle =
                'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-200';
            } else {
              optionStyle = 'border-slate-200 dark:border-slate-700 opacity-60 text-slate-500 dark:text-slate-400';
            }
          } else if (isSelected) {
            optionStyle =
              'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-medium shadow-xs';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-3.5 sm:p-4 rounded-lg border text-sm transition-all flex items-start gap-3 ${optionStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${
                  isSelected
                    ? isAnswerSubmitted
                      ? isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500 text-white'
                      : 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Panel */}
      {isAnswerSubmitted && (
        <div
          className={`mt-5 p-4 rounded-lg text-xs leading-relaxed border ${
            selectedAnswers[currentIndex] === currentQuestion.correctIndex
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}
        >
          <div className="font-bold mb-1 flex items-center gap-1.5">
            {selectedAnswers[currentIndex] === currentQuestion.correctIndex ? (
              <span>✓ Respuesta Correcta</span>
            ) : (
              <span>ℹ Retroalimentación Pedagógica</span>
            )}
          </div>
          <p>{currentQuestion.explanation}</p>
        </div>
      )}

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium disabled:opacity-30 hover:text-slate-900 dark:hover:text-white"
        >
          Anterior
        </button>

        {!isAnswerSubmitted ? (
          <button
            onClick={handleConfirmAnswer}
            disabled={!hasSelected}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 transition-colors"
          >
            Confirmar Respuesta
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
          >
            {currentIndex === questions.length - 1 ? 'Finalizar Cuestionario' : 'Siguiente Pregunta'}
          </button>
        )}
      </div>
    </div>
  );
};
