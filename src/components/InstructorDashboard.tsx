import React, { useState } from 'react';
import { CohortLearner, InstructorProfile } from '../types';

interface InstructorDashboardProps {
  cohort: CohortLearner[];
  instructor?: InstructorProfile;
  onUpdateLearner: (updated: CohortLearner) => void;
  onReturnToLearnerView: () => void;
  onOpenLanding?: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  cohort,
  instructor,
  onUpdateLearner,
  onReturnToLearnerView,
  onOpenLanding,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Completado' | 'En Proceso' | 'Requiere Acompañamiento'>('Todos');
  const [editingLearner, setEditingLearner] = useState<CohortLearner | null>(null);

  // Filtered cohort
  const filteredLearners = cohort.filter((learner) => {
    const matchesSearch =
      learner.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      learner.documento.includes(searchTerm) ||
      learner.ficha.includes(searchTerm);
    const matchesStatus = statusFilter === 'Todos' || learner.estado === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics Metrics
  const totalEnrolled = cohort.length;
  const totalCompleted = cohort.filter((l) => l.estado === 'Completado').length;
  const totalInProgress = cohort.filter((l) => l.estado === 'En Proceso').length;
  const totalAtRisk = cohort.filter((l) => l.estado === 'Requiere Acompañamiento').length;
  const averageProgress = Math.round(
    cohort.reduce((acc, curr) => acc + curr.progreso, 0) / (totalEnrolled || 1)
  );
  const attendanceRate = Math.round(
    (cohort.filter((l) => l.asistenciaInduccion === 'Presente').length / (totalEnrolled || 1)) * 100
  );

  const handleExportCSV = () => {
    const headers = [
      'ID,Nombre,Documento,Ficha,Programa,Progreso(%),ModulosAprobados,Asistencia,Estado,PromedioQuizzes,UltimoAcceso,Observaciones',
    ];
    const rows = cohort.map((l) =>
      `"${l.id}","${l.nombre}","${l.documento}","${l.ficha}","${l.programa}",${l.progreso},${l.modulosCompletados},"${l.asistenciaInduccion}","${l.estado}",${l.promedioEvaluaciones},"${l.ultimoAcceso}","${l.observaciones.replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Reporte_Induccion_SENA_Ficha_${cohort[0]?.ficha || '2834591'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLearner) {
      onUpdateLearner(editingLearner);
      setEditingLearner(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Context */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <span>{instructor?.cargo || 'Instructor Líder de Ficha'}</span>
              <span aria-hidden="true">·</span>
              <span>Ficha {instructor?.fichaAsignada || '2834591'} ADSO</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">Único Docente Evaluador</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Panel de Seguimiento y Control de Inducción
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Supervisión a cargo del {instructor?.nombre || 'Ing. Carlos Alberto Mendoza Villegas'} ({instructor?.email || 'cmendozav@sena.edu.co'}). Monitorea en tiempo real el progreso de los {totalEnrolled} aprendices matriculados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
            >
              Exportar Reporte CSV
            </button>
            <button
              onClick={onReturnToLearnerView}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              Vista Aprendiz
            </button>
            {onOpenLanding && (
              <button
                onClick={onOpenLanding}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 transition-colors cursor-pointer"
              >
                Cambiar Rol
              </button>
            )}
          </div>
        </div>

        {/* KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Total Aprendices</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-1 tabular-nums">
              {totalEnrolled}
            </div>
            <span className="text-[11px] text-slate-400">100% matriculados en Sofia</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Inducción Culminada</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mt-1 tabular-nums">
              {totalCompleted} <span className="text-xs font-normal text-slate-400">({Math.round((totalCompleted / totalEnrolled) * 100)}%)</span>
            </div>
            <span className="text-[11px] text-emerald-500 font-medium">Certificación lista</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Progreso Promedio</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 mt-1 tabular-nums">
              {averageProgress}%
            </div>
            <span className="text-[11px] text-slate-400">{totalInProgress} en desarrollo</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Asistencia a Jornada</span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400 mt-1 tabular-nums">
              {attendanceRate}%
            </div>
            <span className="text-[11px] text-slate-400">
              {totalAtRisk > 0 ? `${totalAtRisk} requieren alerta` : 'Sin alertas'}
            </span>
          </div>
        </div>
      </section>

      {/* Table & Filtering */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          {/* Search bar */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Buscar por aprendiz, documento o ficha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-3 pr-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-emerald-600 focus:border-emerald-600"
            />
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start md:self-auto">
            {(['Todos', 'Completado', 'En Proceso', 'Requiere Acompañamiento'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  statusFilter === filter
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Aprendiz</th>
                <th className="pb-3">Asistencia</th>
                <th className="pb-3">Progreso Inducción</th>
                <th className="pb-3 text-center">Módulos</th>
                <th className="pb-3 text-center">Promedio Quizzes</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3 text-right pr-2">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLearners.map((learner) => (
                <tr key={learner.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 pl-2">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{learner.nombre}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                      C.C. {learner.documento} · {learner.ficha}
                    </div>
                  </td>

                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded ${
                        learner.asistenciaInduccion === 'Presente'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : learner.asistenciaInduccion === 'Parcial'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {learner.asistenciaInduccion}
                    </span>
                  </td>

                  <td className="py-3.5 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 dark:bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${learner.progreso}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 w-10 text-right tabular-nums">
                        {learner.progreso}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 text-center font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {learner.modulosCompletados} / 4
                  </td>

                  <td className="py-3.5 text-center font-mono font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                    {learner.promedioEvaluaciones > 0 ? `${learner.promedioEvaluaciones}%` : '—'}
                  </td>

                  <td className="py-3.5">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        learner.estado === 'Completado'
                          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                          : learner.estado === 'En Proceso'
                          ? 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300'
                          : 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {learner.estado}
                    </span>
                  </td>

                  <td className="py-3.5 text-right pr-2">
                    <button
                      onClick={() => setEditingLearner({ ...learner })}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      Seguimiento
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLearners.length === 0 && (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-xs">
              No se encontraron aprendices con los filtros seleccionados.
            </div>
          )}
        </div>
      </section>

      {/* Observation Modal */}
      {editingLearner && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                  Ficha de Seguimiento Individual
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">{editingLearner.nombre}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Documento: {editingLearner.documento}</p>
              </div>
              <button
                onClick={() => setEditingLearner(null)}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                Cerrar
              </button>
            </div>

            <form onSubmit={handleSaveObservation} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Registro de Asistencia a Inducción:
                </label>
                <select
                  value={editingLearner.asistenciaInduccion}
                  onChange={(e) =>
                    setEditingLearner({
                      ...editingLearner,
                      asistenciaInduccion: e.target.value as CohortLearner['asistenciaInduccion'],
                    })
                  }
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="Presente">Presente</option>
                  <option value="Parcial">Parcial</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Inasistente">Inasistente</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Estado Académico de Inducción:
                </label>
                <select
                  value={editingLearner.estado}
                  onChange={(e) =>
                    setEditingLearner({
                      ...editingLearner,
                      estado: e.target.value as CohortLearner['estado'],
                    })
                  }
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="Completado">Completado</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Requiere Acompañamiento">Requiere Acompañamiento</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Observaciones Pedagógicas y Compromisos:
                </label>
                <textarea
                  rows={3}
                  value={editingLearner.observaciones}
                  onChange={(e) =>
                    setEditingLearner({
                      ...editingLearner,
                      observaciones: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 dark:border-slate-700 rounded-lg text-xs leading-relaxed bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  placeholder="Escribir novedad de seguimiento..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLearner(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                >
                  Guardar Novedad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
