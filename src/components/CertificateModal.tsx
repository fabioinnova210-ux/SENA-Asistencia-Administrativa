import React, { useRef } from 'react';
import { LearnerProfile } from '../types';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';

interface CertificateModalProps {
  learner: LearnerProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  learner,
  isOpen,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const verificationCode = `SENA-IND-${learner.ficha}-2026-V8K3`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 transition-colors">
        {/* Action Toolbar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-5 h-5" color="#39a900" />
            <span className="text-xs font-semibold text-slate-200">
              Certificación Oficial de Inducción Institucional
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            >
              Imprimir o Guardar PDF
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas (Always pristine white paper for real document printing) */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-12 bg-white text-slate-900 relative border-8 border-double border-emerald-900/20 m-4 rounded-xl"
        >
          {/* Subtle Watermark Escudo in center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
            <SenaEscudo className="w-96 h-96 object-contain" />
          </div>

          {/* Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-700/40 pointer-events-none" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-700/40 pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-700/40 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-700/40 pointer-events-none" />

          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-200">
            <div className="inline-flex items-center justify-center gap-4 mb-3">
              <SenaEscudo className="w-14 h-16 object-contain drop-shadow-xs" />
              <div className="text-left border-l border-slate-300 pl-4">
                <span className="text-emerald-700 text-xl font-extrabold tracking-tight block leading-none">SENA</span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-600 block mt-0.5">
                  República de Colombia · Ministerio del Trabajo
                </span>
              </div>
              <SenaLogo className="w-12 h-12" color="#39a900" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-wide text-slate-900 uppercase">
              Servicio Nacional de Aprendizaje - SENA
            </h2>
            <p className="text-xs uppercase tracking-wider text-emerald-800 font-semibold mt-0.5">
              Dirección de Formación Profesional Integral
            </p>
          </div>

          {/* Body */}
          <div className="py-8 text-center space-y-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
              Hace constar que el (la) aprendiz:
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {learner.nombre}
            </h3>

            <p className="text-xs text-slate-600">
              Identificado(a) con {learner.tipoDocumento} No.{' '}
              <span className="font-semibold text-slate-900 font-mono">{learner.documento}</span>
            </p>

            <div className="max-w-xl mx-auto py-2">
              <p className="text-xs text-slate-500">
                Cumplió y aprobó a satisfacción la totalidad de los módulos y talleres correspondientes al:
              </p>
              <h4 className="text-base sm:text-lg font-bold text-emerald-900 mt-1 uppercase">
                Programa de Inducción a la Formación Profesional Integral
              </h4>
              <p className="text-xs text-slate-700 font-medium mt-1">
                Ficha de Caracterización: <span className="font-mono font-bold text-slate-900">{learner.ficha}</span> · {learner.programa}
              </p>
            </div>

            <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
              Competencias acreditadas: Identidad e Imagen Corporativa, Apropiación del Reglamento del Aprendiz SENA (Acuerdo 0009 de 2024 y Acuerdo 2 de 2026), y Dominio del Ecosistema Institucional (Zajuna LMS, Bienestar y Empleo).
            </p>
          </div>

          {/* Footer & Signatures */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center sm:text-left">
            <div>
              <p className="text-xs text-slate-500">Regional & Centro:</p>
              <p className="text-xs font-semibold text-slate-800">{learner.regional}</p>
              <p className="text-[11px] text-slate-500 truncate">{learner.centro}</p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                Expedición: {new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div className="text-center">
              <div className="w-40 border-b border-slate-400 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-slate-800">Subdirección de Centro</p>
              <p className="text-[10px] text-slate-500">Servicio Nacional de Aprendizaje</p>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Código de Verificación:</p>
              <p className="text-xs font-mono font-semibold text-emerald-800">{verificationCode}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-mono border border-emerald-200">
                <SenaLogo className="w-3 h-3" color="#39a900" />
                <span>Validez Digital Certificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
