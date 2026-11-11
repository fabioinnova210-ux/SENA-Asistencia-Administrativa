import React, { useState } from 'react';
import { QUIZ_ECOSYSTEM } from '../data/senaData';
import { ModuleQuiz } from './ModuleQuiz';

interface ModuleEcosystemProps {
  onModuleCompleted: (score: number) => void;
  isCompleted: boolean;
}

export const ModuleEcosystem: React.FC<ModuleEcosystemProps> = ({
  onModuleCompleted,
  isCompleted,
}) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('zajuna');

  const services = [
    {
      id: 'zajuna',
      name: 'Plataforma Zajuna (LMS)',
      category: 'Ambiente Virtual de Aprendizaje',
      summary: 'El nuevo entorno virtual institucional donde gestionas tu proceso pedagógico.',
      details: 'En Zajuna radicas evidencias, participas en foros temáticos, consultas las guías de aprendizaje y recibes la retroalimentación cualitativa y cuantitativa de tus instructores en tiempo real.',
      linkText: 'Aprender sobre navegación y entrega de evidencias'
    },
    {
      id: 'bienestar',
      name: 'Bienestar al Aprendiz',
      category: 'Desarrollo Humano y Calidad de Vida',
      summary: 'Acompañamiento integral durante tu permanencia en la formación.',
      details: 'Ofrece programas en salud mental y física, apoyo de sostenimiento socioeconómico, torneos deportivos, talleres artísticos, liderazgo estudiantil y servicios de orientación psicosocial.',
      linkText: 'Ver convocatorias de apoyos de sostenimiento'
    },
    {
      id: 'biblioteca',
      name: 'Sistema de Bibliotecas (SBS)',
      category: 'Investigación y Recursos Académicos',
      summary: 'Acceso a millones de recursos bibliográficos físicos y digitales.',
      details: 'Catálogo de libros especializados, bases de datos científicas internacionales (Scopus, IEEE, ProQuest), revistas indexadas, normas técnicas Icontec y asesorías en normas APA.',
      linkText: 'Explorar catálogo digital de investigación'
    },
    {
      id: 'ape',
      name: 'Agencia Pública de Empleo (APE)',
      category: 'Intermediación Laboral y Empleabilidad',
      summary: 'Conexión directa entre el talento SENA y el sector empresarial.',
      details: 'Servicio público gratuito e indiscriminado que gestiona vacantes laborales, ferias de empleo, orientación ocupacional y vinculación de aprendices egresados en empresas de primer nivel.',
      linkText: 'Conocer rutas de intermediación ocupacional'
    },
    {
      id: 'emprender',
      name: 'Fondo Emprender & TecnoParques',
      category: 'Emprendimiento e Innovación Tecnológica',
      summary: 'Capital semilla e incubación de ideas de negocio innovadoras.',
      details: 'Fondo Emprender financia planes de negocio con capital semilla no reembolsable. Los TecnoParques y TecnoAcademias brindan laboratorios de biotecnología, nanotecnología y software para prototipado.',
      linkText: 'Ver ruta de asesoría para formulación de proyectos'
    }
  ];

  const productiveModalities = [
    {
      title: 'Contrato de Aprendizaje',
      badge: 'Modalidad más frecuente',
      desc: 'Acuerdo especial entre el aprendiz y una empresa patrocinadora. Recibes apoyo de sostenimiento mensual, afiliación a EPS y ARL sin generar relación laboral tradicional.'
    },
    {
      title: 'Proyecto Productivo',
      badge: 'Emprendimiento e I+D',
      desc: 'Formulación y ejecución de un plan de negocio o solución tecnológica que responda a una necesidad real del sector productivo, avalado por el Centro y TecnoParque.'
    },
    {
      title: 'Pasantía Empresarial o Institucional',
      badge: 'Concertación formativa',
      desc: 'Convenio formal entre el SENA, la empresa u organización sin ánimo de lucro y el aprendiz, enfocado en el desarrollo de actividades formativas prácticas concertadas.'
    },
    {
      title: 'Monitoría Institucional',
      badge: 'Apoyo en Centro',
      desc: 'Apoyo a actividades académicas, técnicas o administrativas en talleres y laboratorios del SENA, remunerado mediante resolución oficial de estímulos.'
    },
    {
      title: 'Vínculo Laboral o Contractual',
      badge: 'Trabajo formal previo',
      desc: 'Si el aprendiz ya labora en una empresa en funciones directamente afines a las competencias del programa, puede solicitar la convalidación de su contrato laboral.'
    }
  ];

  const currentServiceObj = services.find((s) => s.id === selectedService) || services[0];

  return (
    <div className="space-y-12">
      {/* Banner */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Módulo 03</span>
              <span aria-hidden="true">·</span>
              <span>Ecosistema Institucional</span>
              {isCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Módulo Aprobado</span>
                </>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-balance">
              Herramientas, Servicios y Etapas de Formación SENA
            </h2>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Durante tu ciclo de formación cuentas con un ecosistema integral que incluye plataformas de aprendizaje virtual, bienestar, biblioteca, centros de intermediación laboral y múltiples alternativas para tu etapa práctica.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
              >
                {isCompleted ? 'Repetir Cuestionario del Ecosistema' : 'Presentar Cuestionario del Módulo (3 Preguntas)'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
              <img
                src="/src/assets/images/sena_workshop_learning_1794325235284.jpg"
                alt="Aprendices SENA en Taller Tecnológico"
                className="w-full h-48 sm:h-56 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Ambientes de Formación y Tecnologías 4.0</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Talleres prácticos y desarrollo de competencias reales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Modal if open */}
      {showQuiz && (
        <section className="scroll-mt-6">
          <ModuleQuiz
            title="Cuestionario: Ecosistema y Servicios SENA"
            subtitle="Demuestra tu comprensión sobre plataformas virtuales, apoyos de bienestar y modalidades de etapa productiva."
            questions={QUIZ_ECOSYSTEM}
            onCompleteQuiz={(score) => {
              onModuleCompleted(score);
            }}
            onClose={() => setShowQuiz(false)}
          />
        </section>
      )}

      {/* Services Explorer */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Portafolio de Oportunidades
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Servicios Clave a Tu Disposición
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Haz clic en cualquiera de las áreas para conocer sus características operativas y beneficios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Service Buttons */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  selectedService === srv.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-bold shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-850'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                  {srv.category}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">{srv.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{srv.summary}</div>
              </button>
            ))}
          </div>

          {/* Service Details Card */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                <span>{currentServiceObj.category}</span>
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{currentServiceObj.name}</h4>
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mt-1">« {currentServiceObj.summary} »</p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                {currentServiceObj.details}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-emerald-700 dark:text-emerald-400">Acceso gratuito e irrestricto para aprendices</span>
              <span className="font-mono text-slate-400 dark:text-slate-500">Canal Institucional</span>
            </div>
          </div>
        </div>
      </section>

      {/* Etapa Lectiva vs Productiva */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-2xl mb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Formación Profesional Integral
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            Modalidades para Desarrollar tu Etapa Productiva
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Al finalizar tu etapa lectiva, debes aplicar tus competencias en un entorno laboral real mediante una de las siguientes opciones avaladas por la institución:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productiveModalities.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">0{idx + 1}.</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">{item.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
