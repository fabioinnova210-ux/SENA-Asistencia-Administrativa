export type UserRole = 'learner' | 'instructor';

export interface LearnerProfile {
  id: string;
  nombre: string;
  tipoDocumento: string;
  documento: string;
  ficha: string;
  programa: string;
  regional: string;
  centro: string;
  sede: string;
  jornada: string;
  email: string;
  telefono: string;
  fotoUrl?: string;
  fechaIngreso: string;
}

export interface InstructorProfile {
  id: string;
  nombre: string;
  cargo: string;
  documento: string;
  email: string;
  centro: string;
  regional: string;
  fichaAsignada: string;
  programa: string;
  telefono: string;
  jornada: string;
}

export interface InductionStep {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  category: 'identidad' | 'normativa' | 'ecosistema' | 'evaluacion';
  completed: boolean;
  score?: number;
  maxScore?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  normReference: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  actor: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    faultType: 'Leve' | 'Grave' | 'Gravísima' | 'No constituye falta';
    measure: string;
    feedback: string;
  }[];
}

export interface CohortLearner {
  id: string;
  nombre: string;
  documento: string;
  ficha: string;
  programa: string;
  progreso: number; // 0-100
  modulosCompletados: number; // 0-4
  asistenciaInduccion: 'Presente' | 'Parcial' | 'Pendiente' | 'Inasistente';
  estado: 'Completado' | 'En Proceso' | 'Requiere Acompañamiento';
  promedioEvaluaciones: number; // 0-100
  ultimoAcceso: string;
  observaciones: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
