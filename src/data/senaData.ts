import { LearnerProfile, InstructorProfile, QuizQuestion, CaseStudy, CohortLearner, Badge } from '../types';

export const DEFAULT_INSTRUCTOR: InstructorProfile = {
  id: 'INST-79402',
  nombre: 'Ing. Carlos Alberto Mendoza Villegas',
  cargo: 'Instructor Líder de Ficha y Gestor de Inducción',
  documento: '79.402.815',
  email: 'cmendozav@sena.edu.co',
  centro: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  regional: 'Regional Distrito Capital',
  fichaAsignada: '2834591',
  programa: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  telefono: '310 456 7890',
  jornada: 'Diurna (07:00 - 13:00)'
};

export const DEFAULT_LEARNER: LearnerProfile = {
  id: 'AP-2026-08492',
  nombre: 'Valentina Restrepo Morales',
  tipoDocumento: 'C.C.',
  documento: '1.020.849.201',
  ficha: '2834591',
  programa: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  regional: 'Regional Distrito Capital',
  centro: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  sede: 'Sede Fontibón - Calle 15',
  jornada: 'Diurna (07:00 - 13:00)',
  email: 'vrestrepo92@soy.sena.edu.co',
  telefono: '315 849 2011',
  fechaIngreso: '10 de Febrero de 2026'
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-identidad',
    title: 'Embajador de la Identidad',
    description: 'Exploraste los símbolos, historia e himno institucional del SENA.',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: '10 Feb 2026'
  },
  {
    id: 'badge-normativa',
    title: 'Guardián del Reglamento',
    description: 'Dominas los derechos, deberes, faltas y el debido proceso del aprendiz.',
    icon: 'Scale',
    unlocked: false
  },
  {
    id: 'badge-ecosistema',
    title: 'Navegante del Ecosistema',
    description: 'Conoces las plataformas Zajuna, Bienestar, APE y alternativas productivas.',
    icon: 'Compass',
    unlocked: false
  },
  {
    id: 'badge-casos',
    title: 'Juez del Comité Formativo',
    description: 'Resolviste con éxito los dilemas del simulador del Comité de Evaluación.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'badge-certificacion',
    title: 'Inducción Culminada',
    description: 'Aprobaste la evaluación final general y obtuviste tu certificación oficial.',
    icon: 'GraduationCap',
    unlocked: false
  }
];

export const SENA_HISTORY_TIMELINE = [
  {
    year: '1957',
    title: 'Nacimiento del SENA',
    description: 'El economista Rodolfo Martínez Tono funda el Servicio Nacional de Aprendizaje mediante el Decreto Ley 118 del 21 de junio de 1957, con apoyo conjunto del Gobierno, sindicatos de trabajadores y gremios de empresarios (ANDI).'
  },
  {
    year: '1960',
    title: 'Expansión de Centros de Formación',
    description: 'Se inauguran los primeros centros fijos de formación industrial, agropecuaria y comercial a lo largo de las principales regiones de Colombia, capacitando a miles de trabajadores técnicos.'
  },
  {
    year: '1970 - 1980',
    title: 'Innovación y Aulas Móviles',
    description: 'Lanzamiento de las Unidades Móviles Fluviales y Terrestres para llegar a comunidades rurales, ribereñas e indígenas apartadas del país.'
  },
  {
    year: '2000 - 2010',
    title: 'Era Digital y Fondo Emprender',
    description: 'Creación de Fondo Emprender mediante la Ley 789 de 2002 para financiar proyectos productivos, y consolidación de la formación virtual con plataformas tecnológicas.'
  },
  {
    year: '2020 - 2026',
    title: 'Zajuna, TecnoParques y Tecnologías 4.0',
    description: 'Transformación pedagógica hacia la Cuarta Revolución Industrial: inteligencia artificial, desarrollo de software, agroecología de precisión y el nuevo ecosistema digital Zajuna.'
  }
];

export const SENA_SYMBOLS = [
  {
    id: 'escudo',
    name: 'El Escudo Institucional',
    tagline: 'Tres sectores económicos que forjan el progreso nacional',
    description: 'El escudo del SENA representa en su arquitectura gráfica los tres sectores de la economía colombiana en los que el SENA forma con excelencia profesional:',
    elements: [
      {
        part: 'Rueda dentada (Engranaje)',
        meaning: 'Simboliza el sector secundario: la fuerza industrial, la manufactura, la mecatrónica y la construcción.',
        color: 'emerald'
      },
      {
        part: 'Caduceo de Mercurio',
        meaning: 'Representa el sector terciario: el comercio, las finanzas, el turismo, la logística y las tecnologías de la información.',
        color: 'blue'
      },
      {
        part: 'Espiga de Café / Trigo',
        meaning: 'Simboliza el sector primario: la agricultura, la agroindustria, la ganadería y los recursos naturales colombianos.',
        color: 'amber'
      }
    ]
  },
  {
    id: 'logosimbolo',
    name: 'El Logosímbolo SENA',
    tagline: 'El aprendiz caminando hacia el horizonte del progreso',
    description: 'Diseñado para encarnar la esencia transformadora de la formación profesional integral.',
    elements: [
      {
        part: 'La figura humana erguida',
        meaning: 'Representa al aprendiz SENA como centro del proceso formativo, sujeto ético, creativo y transformador de su comunidad.',
        color: 'emerald'
      },
      {
        part: 'Los caminos abiertos divergentes',
        meaning: 'Simbolizan las múltiples sendas de crecimiento que se abren para el aprendiz: empleo calificado, emprendimiento e innovación.',
        color: 'green'
      },
      {
        part: 'La horizontal superior',
        meaning: 'Representa la base sólida de conocimientos, destrezas técnicas y competencias ciudadanas adquiridas en el proceso.',
        color: 'teal'
      }
    ]
  },
  {
    id: 'bandera',
    name: 'La Bandera del SENA',
    tagline: 'Paz, tranquilidad y compromiso institucional',
    description: 'De fondo totalmente blanco, simboliza la pureza, la transparencia y la paz que promueve la formación integral, con el escudo institucional grabado en el centro.',
    elements: [
      {
        part: 'Fondo Blanco',
        meaning: 'Paz, convivencia pacífica, libre pensamiento e inclusión social sin distingo de raza, género o condición económica.',
        color: 'slate'
      },
      {
        part: 'Escudo Centrado',
        meaning: 'La unión indestructible entre los trabajadores, los formadores y el desarrollo productivo de Colombia.',
        color: 'emerald'
      }
    ]
  }
];

export const SENA_HYMN_VERSES = [
  {
    type: 'CORO',
    lyrics: [
      'Estudiantes del SENA adelante,',
      'por Colombia luchad con amor,',
      'con el ánimo noble y radiante,',
      'transformémosle el mundo en mejor.'
    ]
  },
  {
    type: 'ESTROFA I',
    lyrics: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que a la inmensa grandeza nos da.'
    ]
  },
  {
    type: 'ESTROFA II',
    lyrics: [
      'En la forja del SENA se forman,',
      'hombres libres que saben triunfar,',
      'adelante con fe y optimismo,',
      'el trabajo es honra y cantar.'
    ]
  },
  {
    type: 'ESTROFA III',
    lyrics: [
      'Hoy la patria nos llama a la lucha,',
      'con el brazo, la mente y el ser,',
      'escuchad el clarín que retumba,',
      'por el nuevo y glorioso saber.'
    ]
  },
  {
    type: 'ESTROFA IV',
    lyrics: [
      'Juventud que ennoblece la vida,',
      'con la antorcha del noble saber,',
      'adelante que el triunfo convida,',
      'a luchar y por siempre vencer.'
    ]
  }
];

export const REGULATION_RIGHTS = [
  {
    num: '01',
    title: 'Formación Profesional Integral',
    summary: 'Recibir formación de calidad acorde con el programa formativo y los más altos estándares técnicos y pedagógicos.',
    detail: 'Acceso a instructores calificados, guías de aprendizaje, ambientes equipados y retroalimentación pedagógica continua.'
  },
  {
    num: '02',
    title: 'Recursos e Infraestructura',
    summary: 'Disponer y utilizar los ambientes de aprendizaje, laboratorios, talleres, biblioteca física y digital y salas de cómputo.',
    detail: 'Uso oportuno de materiales de formación, software con licencias educativas y dotación para prácticas seguras.'
  },
  {
    num: '03',
    title: 'Servicios de Bienestar al Aprendiz',
    summary: 'Participar activamente en los programas de salud integral, cultura, deportes, apoyos de sostenimiento y monitorías.',
    detail: 'Acompañamiento psicosocial, actividades recreativas y convocatorias de apoyos socioeconómicos y de transporte.'
  },
  {
    num: '04',
    title: 'Debido Proceso y Defensa',
    summary: 'Garantía absoluta del debido proceso en todas las actuaciones académicas o disciplinarias ante el Comité de Evaluación.',
    detail: 'Derecho a ser escuchado, presentar descargos, aportar pruebas y controvertir determinaciones mediante recursos de ley.'
  },
  {
    num: '05',
    title: 'Representación y Liderazgo',
    summary: 'Elegir y ser elegido democráticamente como vocero de ficha o representante de aprendices ante el Centro de Formación.',
    detail: 'Participación en mesas de concertación, comités de centro y escenarios de toma de decisiones estudiantiles.'
  },
  {
    num: '06',
    title: 'Revisión y Retroalimentación Justa',
    summary: 'Solicitar respetuosamente la revisión oportuna de evaluaciones, juicios evaluativos y retroalimentaciones de evidencias.',
    detail: 'Plazo legal dentro de los dos (2) días hábiles siguientes a la publicación del resultado en Sofia Plus / Zajuna.'
  }
];

export const REGULATION_DUTIES = [
  {
    num: '01',
    title: 'Porte Visible del Carné Institucional',
    summary: 'Portar el carné del SENA en un lugar visible en todo momento dentro de las instalaciones y eventos institucionales.',
    consequence: 'Falta disciplinaria leve si se olvida; falta grave si se presta o suplanta a otro aprendiz.'
  },
  {
    num: '02',
    title: 'Puntualidad, Asistencia y Justificación',
    summary: 'Cumplir estrictamente con los horarios establecidos y radicar oportunamente los soportes de inasistencia.',
    consequence: 'Tres (3) días consecutivos de inasistencia no justificada pueden tipificarse como deserción del programa.'
  },
  {
    num: '03',
    title: 'Cuidado y Custodia de Bienes e Instalaciones',
    summary: 'Hacer uso responsable de equipos, mobiliario, herramientas y tecnologías de información asignadas.',
    consequence: 'El deterioro negligente o daño intencional acarrea reposición del bien y sanción disciplinaria.'
  },
  {
    num: '04',
    title: 'Seguridad y Salud en el Trabajo (SST)',
    summary: 'Utilizar los Elementos de Protección Personal (EPP) obligatorios y cumplir protocolos de prevención de riesgos.',
    consequence: 'El desacato a normas de seguridad laboral pone en riesgo vidas y genera suspensión inmediata de actividades de taller.'
  },
  {
    num: '05',
    title: 'Integridad Académica y Veracidad',
    summary: 'Presentar evidencias originales respetando los derechos de autor, normas APA y citación rigurosa sin plagio.',
    consequence: 'El plagio en evidencias y la alteración de juicios evaluativos constituyen falta académica y disciplinaria grave.'
  },
  {
    num: '06',
    title: 'Convivencia Pacífica y Respeto Mutuo',
    summary: 'Mantener un trato cortés, incluyente y libre de discriminación con compañeros, instructores y personal administrativo.',
    consequence: 'Los actos de agresión física, acoso verbal o ciberacoso son clasificados como faltas disciplinarias gravísimas.'
  }
];

export const REGULATION_FAULTS = [
  {
    type: 'Leves',
    badgeColor: 'border-blue-200 bg-blue-50/60 text-blue-900',
    definition: 'Conductas u omisiones que vulneran la sana convivencia o el orden sin causar daños graves ni perjuicios a terceros.',
    examples: [
      'No portar el carné institucional en lugar visible.',
      'Uso indebido de dispositivos móviles durante sesiones de formación sin autorización pedagógica.',
      'Llegadas tardías reiteradas a clase sin justificación formal.'
    ],
    measure: 'Llamado de atención verbal o llamado de atención escrito con copia a la hoja de vida.'
  },
  {
    type: 'Graves',
    badgeColor: 'border-amber-200 bg-amber-50/60 text-amber-900',
    definition: 'Infracciones que entorpecen de manera sustancial el proceso formativo, afectan bienes del SENA o vulneran derechos ajenos.',
    examples: [
      'Plagio comprobado en proyectos, evaluaciones o evidencias de aprendizaje.',
      'Prestar el carné institucional a terceros para suplantación en el ingreso.',
      'Daño culposo o negligente a maquinaria, equipos de cómputo o herramientas de laboratorio.',
      'Tres o más llamados de atención escritos en el trimestre.'
    ],
    measure: 'Plan de Mejoramiento Disciplinario o Académico, o Condicionamiento de Matrícula (aprobado por Subdirección de Centro).'
  },
  {
    type: 'Gravísimas',
    badgeColor: 'border-rose-200 bg-rose-50/60 text-rose-900',
    definition: 'Acciones que atentan severamente contra la vida, integridad física, legalidad o patrimonio moral e institucional del SENA.',
    examples: [
      'Consumo, porte o distribución de sustancias psicoactivas o bebidas embriagantes dentro del SENA.',
      'Porte de armas de fuego o armas blancas en predios de la entidad.',
      'Agresión física o verbal directa a cualquier miembro de la comunidad educativa.',
      'Alteración de calificaciones en el sistema Sofia Plus o Zajuna de forma ilícita.'
    ],
    measure: 'Cancelación de Matrícula e inhabilidad de hasta por tres (3) años para ingresar a cualquier programa del SENA.'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Caso: Código fuente copiado de internet sin citar',
    actor: 'Camilo, aprendiz de la ficha de ADSO',
    description: 'En la entrega final de la evidencia "Módulo de Facturación Electrónica", el instructor detectó que el 90% del repositorio fue descargado textualmente de un proyecto de GitHub de un tercero, haciéndolo pasar como propio.',
    situation: 'Camilo alega que "en programación todo se reutiliza" y que no sabía que debía referenciar al autor ni aplicar código propio.',
    options: [
      {
        text: 'No es falta, porque en software se comparte código libremente bajo licencias permisivas.',
        isCorrect: false,
        faultType: 'No constituye falta',
        measure: 'Ninguna',
        feedback: 'Incorrecto. Presentar como propio el trabajo intelectual de un tercero sin citación es plagio académico y vulnera el principio de integridad formativa.'
      },
      {
        text: 'Es una falta académica Grave. Aplica citación a Comité de Evaluación y formulación de Plan de Mejoramiento con posible llamado escrito.',
        isCorrect: true,
        faultType: 'Grave',
        measure: 'Plan de Mejoramiento Académico concertado',
        feedback: '¡Correcto! El plagio en evidencias formativas se tipifica como falta Grave. El aprendiz tiene derecho a ser escuchado en descargos y, si no tiene antecedentes, se suscribe un plan de mejoramiento con entrega de evidencia original.'
      },
      {
        text: 'Es falta Gravísima que causa expulsión inmediata sin necesidad de citación previa al Comité.',
        isCorrect: false,
        faultType: 'Gravísima',
        measure: 'Expulsión directa',
        feedback: 'Incorrecto. Toda sanción en el SENA requiere cumplir estrictamente el Debido Proceso (citación, descargos y recomendación del Comité). Nadie puede ser expulsado de forma automática.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Caso: Inasistencia prolongada por motivos médicos',
    actor: 'Mariana, aprendiz de Gestión Logística',
    description: 'Mariana no asistió durante cinco días hábiles consecutivos a su formación debido a una hospitalización de urgencia. Al regresar al sexto día, el instructor le informa que el sistema la reportará en deserción.',
    situation: 'Mariana cuenta con incapacidad médica oficial emitida por su EPS pero no pudo radicarla por encontrarse convaleciente.',
    options: [
      {
        text: 'La deserción es irrevocable porque pasaron más de tres días consecutivos de ausencia.',
        isCorrect: false,
        faultType: 'Leve',
        measure: 'Cancelación definitiva',
        feedback: 'Incorrecto. El aprendiz tiene derecho a justificar su inasistencia por caso fortuito o fuerza mayor presentando soportes médicos válidos ante la coordinación.'
      },
      {
        text: 'Debe radicar oportunamente su incapacidad EPS ante la Coordinación Académica para validar la justificación y acordar un plan pedagógico de nivelación.',
        isCorrect: true,
        faultType: 'No constituye falta',
        measure: 'Validación de excusa y plan de nivelación',
        feedback: '¡Excelente! La fuerza mayor o enfermedad demostrada con incapacidad EPS suspende el cómputo de deserción y ampara el derecho a la formación y a la salud de la aprendiz.'
      },
      {
        text: 'Se le debe sancionar con condicionamiento de matrícula por no enviar un mensaje de WhatsApp el primer día.',
        isCorrect: false,
        faultType: 'Leve',
        measure: 'Condicionamiento',
        feedback: 'Incorrecto. La situación está plenamente justificada médicamente; no existe culpabilidad ni mérito para sanción disciplinaria.'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Caso: Alteración del carné institucional para ingresar a otra persona',
    actor: 'Felipe, aprendiz de Mantenimiento Mecatrónico',
    description: 'Felipe le prestó su carné institucional a un amigo ajeno a la institución para que este pudiera ingresar al gimnasio y a las canchas del Centro de Formación en horario nocturno.',
    situation: 'El personal de vigilancia y bienestar detectó la inconsistencia al verificar la foto y el número de documento.',
    options: [
      {
        text: 'Es solo una falta leve; basta con pedirle disculpas al vigilante.',
        isCorrect: false,
        faultType: 'Leve',
        measure: 'Disculpa verbal',
        feedback: 'Incorrecto. El carné del SENA es un documento personal e intransferible. Facilitar el ingreso de terceros no autorizados vulnera la seguridad del Centro.'
      },
      {
        text: 'Constituye una falta disciplinaria Grave por suplantación y vulneración de la seguridad institucional, sujeta a Comité de Evaluación y posible Condicionamiento.',
        isCorrect: true,
        faultType: 'Grave',
        measure: 'Comité de Evaluación y Condicionamiento de Matrícula',
        feedback: '¡Exacto! El mal uso del carné o permitir la suplantación de identidad para acceder a instalaciones del SENA es una falta Grave que amerita audiencia disciplinaria.'
      },
      {
        text: 'No es falta si el amigo no dañó ninguna máquina del gimnasio.',
        isCorrect: false,
        faultType: 'No constituye falta',
        measure: 'Ninguna',
        feedback: 'Incorrecto. La infracción se configura con el hecho mismo de transferir la identificación y vulnerar los filtros de acceso al campus.'
      }
    ]
  }
];

export const QUIZ_IDENTITY: QuizQuestion[] = [
  {
    id: 'qid-1',
    question: '¿Quién fundó el Servicio Nacional de Aprendizaje (SENA) y en qué año se expidió su decreto fundacional?',
    options: [
      'Alfonso López Pumarejo en 1936',
      'Rodolfo Martínez Tono en 1957',
      'Alberto Lleras Camargo en 1968',
      'Carlos Lleras Restrepo en 1974'
    ],
    correctIndex: 1,
    explanation: 'El SENA fue fundado por el economista cartagenero Rodolfo Martínez Tono mediante el Decreto Ley 118 del 21 de junio de 1957.',
    normReference: 'Decreto Ley 118 de 1957'
  },
  {
    id: 'qid-2',
    question: 'En el escudo institucional del SENA, ¿qué sector económico representa la rueda dentada (engranaje)?',
    options: [
      'Sector agropecuario y recursos naturales',
      'Sector comercio y servicios financieros',
      'Sector secundario: industria, manufactura y construcción',
      'Sector educativo y cultural'
    ],
    correctIndex: 2,
    explanation: 'La rueda dentada representa al sector industrial y de la construcción, fundamentales para el desarrollo tecnológico del país.',
    normReference: 'Manual de Imagen Corporativa SENA'
  },
  {
    id: 'qid-3',
    question: '¿Qué simbolizan los caminos divergentes que parten de la figura humana en el logosímbolo del SENA?',
    options: [
      'Los tres poderes públicos del Estado',
      'Las múltiples opciones de formación, empleo, emprendimiento y autorrealización que se abren para el aprendiz',
      'Las carreteras y vías de transporte de Colombia',
      'Las divisiones administrativas de los centros de formación'
    ],
    correctIndex: 1,
    explanation: 'El logosímbolo muestra al hombre caminando hacia adelante por caminos que se abren, simbolizando cómo la formación técnica y tecnológica abre senderos de futuro.',
    normReference: 'Identidad Visual SENA'
  },
  {
    id: 'qid-4',
    question: '¿Cuál es el valor que fundamenta el fondo blanco de la bandera institucional del SENA?',
    options: [
      'La riqueza mineral de Colombia',
      'La paz, la tranquilidad, la pureza y la convivencia armónica de la comunidad educativa',
      'La neutralidad política exclusiva',
      'La modernidad de la infraestructura virtual'
    ],
    correctIndex: 1,
    explanation: 'El fondo blanco representa la paz y la concordia nacional promovida a través de la formación laboral y social.',
    normReference: 'Símbolos Institucionales SENA'
  }
];

export const QUIZ_NORMATIVE: QuizQuestion[] = [
  {
    id: 'qno-1',
    question: 'Según el Reglamento del Aprendiz SENA, ¿cuál es el plazo máximo para solicitar la revisión de una evaluación o calificación tras su publicación?',
    options: [
      'Veinticuatro (24) horas hábiles',
      'Dos (2) días hábiles siguientes a la publicación',
      'Quince (15) días calendario',
      'Un (1) mes antes de finalizar el trimestre'
    ],
    correctIndex: 1,
    explanation: 'El aprendiz tiene derecho a solicitar al instructor la revisión de sus evaluaciones dentro de los dos (2) días hábiles siguientes a la publicación del juicio evaluativo.',
    normReference: 'Reglamento del Aprendiz - Artículo de Derechos'
  },
  {
    id: 'qno-2',
    question: '¿Cuál de las siguientes acciones constituye una FALTA GRAVÍSIMA tipificada en el Reglamento del Aprendiz?',
    options: [
      'Olvidar portar el carné en el pecho durante una clase',
      'Consumir, portar o distribuir sustancias psicoactivas o bebidas embriagantes dentro de las instalaciones del SENA',
      'Llegar quince minutos tarde a una sesión formativa',
      'No asistir a una jornada deportiva voluntaria'
    ],
    correctIndex: 1,
    explanation: 'El consumo, porte o comercialización de drogas o alcohol en predios institucionales es una falta gravísima que acarrea cancelación de matrícula.',
    normReference: 'Reglamento del Aprendiz - Régimen Disciplinario'
  },
  {
    id: 'qno-3',
    question: '¿Qué instancia institucional analiza las faltas graves y gravísimas y emite recomendaciones de sanción al Subdirector de Centro?',
    options: [
      'El representante de aprendices de manera individual',
      'El Comité de Evaluación y Seguimiento del Centro',
      'El área de seguridad y vigilancia privada',
      'El Ministerio del Trabajo directamente'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento es el órgano colegiado que garantiza el debido proceso, escucha descargos y formula recomendaciones motivadas.',
    normReference: 'Acuerdo 0009 de 2024'
  },
  {
    id: 'qno-4',
    question: 'Si un aprendiz acumula tres (3) días consecutivos de inasistencia no justificada a su etapa lectiva, ¿qué figura reglamentaria se configura?',
    options: [
      'Aplazamiento voluntario del programa',
      'Deserción del proceso de formación',
      'Pérdida automática del carné únicamente',
      'Graduación anticipada'
    ],
    correctIndex: 1,
    explanation: 'La inasistencia injustificada durante tres días consecutivos da inicio al trámite de deserción, salvo prueba de fuerza mayor o caso fortuito.',
    normReference: 'Reglamento del Aprendiz - Deserción'
  }
];

export const QUIZ_ECOSYSTEM: QuizQuestion[] = [
  {
    id: 'qec-1',
    question: '¿Cuál es el nuevo Entorno Virtual de Aprendizaje (LMS) oficial del SENA donde se gestionan las evidencias, foros y contenidos curriculares?',
    options: [
      'Blackboard Learn Legacy',
      'Plataforma Zajuna',
      'Moodle Comunitario',
      'Google Classroom Externo'
    ],
    correctIndex: 1,
    explanation: 'Zajuna es la plataforma LMS institucional del SENA diseñada para soportar los ambientes virtuales y presenciales con tecnologías modernas.',
    normReference: 'Ecosistema Digital SENA'
  },
  {
    id: 'qec-2',
    question: '¿Cuál de las siguientes es una modalidad válida para desarrollar la Etapa Productiva en el SENA?',
    options: [
      'Contrato de aprendizaje en empresa patrocinadora',
      'Proyecto productivo institucional o en TecnoParque',
      'Monitoría en el centro de formación o pasantía en PYME',
      'Todas las anteriores son modalidades legalmente reconocidas'
    ],
    correctIndex: 3,
    explanation: 'El SENA reconoce múltiples alternativas para cumplir la etapa productiva: contrato de aprendizaje, vínculo laboral, proyecto productivo, pasantías y monitorías.',
    normReference: 'Etapas de Formación Profesional Integral'
  },
  {
    id: 'qec-3',
    question: '¿Qué servicio institucional del SENA financia con capital semilla no reembolsable ideas de negocio innovadoras creadas por aprendices y egresados?',
    options: [
      'Fondo Emprender',
      'Agencia de Crédito Bancario',
      'Caja de Compensación Familiar',
      'Club de Inversionistas Privados'
    ],
    correctIndex: 0,
    explanation: 'Fondo Emprender es el fondo de capital semilla más grande de Colombia para impulsar iniciativas empresariales viables creadas por la comunidad SENA.',
    normReference: 'Ley 789 de 2002 - Fondo Emprender'
  }
];

export const QUIZ_FINAL_CERTIFICATION: QuizQuestion[] = [
  {
    id: 'qfn-1',
    question: '¿En qué año se fundó el SENA mediante el Decreto Ley 118 y quién fue su principal gestor?',
    options: [
      '1957, impulsado por Rodolfo Martínez Tono',
      '1965, por Carlos Lleras Restrepo',
      '1972, por Alfonso López Michelsen',
      '1948, por Jorge Eliécer Gaitán'
    ],
    correctIndex: 0,
    explanation: 'El SENA fue fundado el 21 de junio de 1957 por Rodolfo Martínez Tono con el Decreto Ley 118.',
    normReference: 'Historia Institucional SENA'
  },
  {
    id: 'qfn-2',
    question: 'En el escudo institucional, ¿qué elemento representa el sector terciario (comercio y servicios)?',
    options: [
      'La rueda dentada (engranaje)',
      'El caduceo de Mercurio con sus alas y serpientes',
      'La espiga de café y trigo',
      'La bandera blanca tricolor'
    ],
    correctIndex: 1,
    explanation: 'El caduceo es el símbolo heráldico tradicional del comercio, la logística, las finanzas y los servicios.',
    normReference: 'Manual de Imagen SENA'
  },
  {
    id: 'qfn-3',
    question: '¿Cuál es el deber esencial del aprendiz respecto a su identificación dentro de las instalaciones del SENA?',
    options: [
      'Guardar el carné en la billetera y mostrarlo únicamente al salir',
      'Portar el carné en un lugar visible en el pecho en todo momento',
      'Dejar el carné en portería antes de ingresar al ambiente',
      'Usar únicamente la cédula de ciudadanía personal'
    ],
    correctIndex: 1,
    explanation: 'El Reglamento exige portar el carné institucional de manera visible para garantizar la seguridad del campus.',
    normReference: 'Reglamento del Aprendiz - Deberes'
  },
  {
    id: 'qfn-4',
    question: '¿Qué tipo de falta constituye el porte o consumo de sustancias psicoactivas o alcohol en predios del SENA?',
    options: [
      'Falta Leve sancionable con amonestación verbal',
      'Falta Grave con plan de mejoramiento',
      'Falta Gravísima que amerita Cancelación de Matrícula',
      'No constituye falta si se hace fuera del aula'
    ],
    correctIndex: 2,
    explanation: 'El porte o consumo de estupefacientes o alcohol en el SENA es una falta gravísima sujeta a cancelación de matrícula.',
    normReference: 'Acuerdo 0009 de 2024 - Faltas Gravísimas'
  },
  {
    id: 'qfn-5',
    question: '¿Cuál es la instancia colegiada encargada de escuchar descargos y recomendar medidas disciplinarias garantizando el debido proceso?',
    options: [
      'El Consejo Directivo Nacional exclusivamente',
      'El Comité de Evaluación y Seguimiento del Centro',
      'La Agencia Pública de Empleo',
      'El monitor de ambiente'
    ],
    correctIndex: 1,
    explanation: 'El Comité de Evaluación y Seguimiento garantiza la defensa del aprendiz y evalúa las faltas conforme a derecho.',
    normReference: 'Debido Proceso SENA'
  },
  {
    id: 'qfn-6',
    question: '¿En qué plataforma institucional se entregan evidencias académicas y se interactúa con instructores en ambientes virtuales?',
    options: [
      'Plataforma Zajuna',
      'Sistema de Pagos Electrónicos',
      'Portal Transaccional Bancario',
      'Red Social Abierta'
    ],
    correctIndex: 0,
    explanation: 'Zajuna es el ambiente virtual de aprendizaje (LMS) donde se desarrolla la formación técnica y pedagógica.',
    normReference: 'Ecosistema Tecnológico SENA'
  }
];

export const INITIAL_COHORT: CohortLearner[] = [
  {
    id: 'apr-01',
    nombre: 'Valentina Restrepo Morales',
    documento: '1.020.849.201',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 85,
    modulosCompletados: 3,
    asistenciaInduccion: 'Presente',
    estado: 'En Proceso',
    promedioEvaluaciones: 92,
    ultimoAcceso: 'Hoy, 09:15 AM',
    observaciones: 'Excelente participación en el taller de símbolos y reglamento. Pendiente simulación final.'
  },
  {
    id: 'apr-02',
    nombre: 'Juan Camilo Gómez Ospina',
    documento: '1.034.912.443',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 100,
    modulosCompletados: 4,
    asistenciaInduccion: 'Presente',
    estado: 'Completado',
    promedioEvaluaciones: 96,
    ultimoAcceso: 'Ayer, 04:30 PM',
    observaciones: 'Inducción finalizada exitosamente. Certificado generado y verificado.'
  },
  {
    id: 'apr-03',
    nombre: 'Sofía Daniela Cardona Silva',
    documento: '1.018.756.329',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 100,
    modulosCompletados: 4,
    asistenciaInduccion: 'Presente',
    estado: 'Completado',
    promedioEvaluaciones: 94,
    ultimoAcceso: 'Hoy, 08:00 AM',
    observaciones: 'Certificada. Destacada en análisis de casos de debido proceso.'
  },
  {
    id: 'apr-04',
    nombre: 'Andrés Felipe Caicedo Rivas',
    documento: '1.025.641.870',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 45,
    modulosCompletados: 1,
    asistenciaInduccion: 'Parcial',
    estado: 'En Proceso',
    promedioEvaluaciones: 78,
    ultimoAcceso: 'Hace 2 días',
    observaciones: 'Completó Identidad Institucional. Falta presentar cuestionario de normativa.'
  },
  {
    id: 'apr-05',
    nombre: 'Mateo Alejandro Torres Peña',
    documento: '1.019.453.210',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 20,
    modulosCompletados: 0,
    asistenciaInduccion: 'Inasistente',
    estado: 'Requiere Acompañamiento',
    promedioEvaluaciones: 0,
    ultimoAcceso: 'Hace 4 días',
    observaciones: 'Alerta de inasistencia a la jornada presencial. Se contactó por correo institucional.'
  },
  {
    id: 'apr-06',
    nombre: 'Gabriela Lucía Muñoz Zapata',
    documento: '1.032.887.119',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 70,
    modulosCompletados: 2,
    asistenciaInduccion: 'Presente',
    estado: 'En Proceso',
    promedioEvaluaciones: 88,
    ultimoAcceso: 'Hoy, 10:20 AM',
    observaciones: 'Avanzando en módulo de Ecosistema SENA.'
  },
  {
    id: 'apr-07',
    nombre: 'Sebastián David Martínez Cruz',
    documento: '1.028.910.334',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 95,
    modulosCompletados: 3,
    asistenciaInduccion: 'Presente',
    estado: 'En Proceso',
    promedioEvaluaciones: 91,
    ultimoAcceso: 'Ayer, 06:10 PM',
    observaciones: 'Completó cuestionarios modulares. Listo para presentar certificación.'
  },
  {
    id: 'apr-08',
    nombre: 'Laura Camila Benítez Rojas',
    documento: '1.015.448.902',
    ficha: '2834591',
    programa: 'Tecnología en Análisis y Desarrollo de Software',
    progreso: 15,
    modulosCompletados: 0,
    asistenciaInduccion: 'Pendiente',
    estado: 'Requiere Acompañamiento',
    promedioEvaluaciones: 0,
    ultimoAcceso: 'Hace 5 días',
    observaciones: 'Presenta inconvenientes técnicos de acceso a Sofia Plus. Reportado a mesa de ayuda.'
  }
];
