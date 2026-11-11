import { useState, useEffect } from 'react';
import { UserRole, LearnerProfile, Badge, CohortLearner } from './types';
import {
  DEFAULT_LEARNER,
  DEFAULT_INSTRUCTOR,
  INITIAL_BADGES,
  INITIAL_COHORT,
  QUIZ_FINAL_CERTIFICATION,
} from './data/senaData';
import { Header } from './components/Header';
import { LearnerOverview } from './components/LearnerOverview';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleNormative } from './components/ModuleNormative';
import { ModuleEcosystem } from './components/ModuleEcosystem';
import { InstructorDashboard } from './components/InstructorDashboard';
import { CertificateModal } from './components/CertificateModal';
import { ModuleQuiz } from './components/ModuleQuiz';
import { SenaLogo } from './components/SenaLogo';
import { RoleLandingPage } from './components/RoleLandingPage';
import { VideoModal } from './components/VideoModal';

export default function App() {
  // Navigation view: 'landing' (Role Gateway) vs 'app' (Interactive induction portal)
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [role, setRole] = useState<UserRole>('learner');
  const [currentTab, setCurrentTab] = useState<string>('overview');

  // Dark Mode State & Blur Transition State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('sena_dark_mode') === 'true';
  });
  const [isBlurringTheme, setIsBlurringTheme] = useState<boolean>(false);
  const [blurTransitionText, setBlurTransitionText] = useState<string>('');

  // Learner profile state
  const [learner, setLearner] = useState<LearnerProfile>(() => {
    const saved = localStorage.getItem('sena_learner_profile');
    return saved ? JSON.parse(saved) : DEFAULT_LEARNER;
  });

  // Completed modules
  const [completedModules, setCompletedModules] = useState<{
    identity: boolean;
    normative: boolean;
    ecosystem: boolean;
    finalQuiz: boolean;
  }>(() => {
    const saved = localStorage.getItem('sena_completed_modules');
    return saved
      ? JSON.parse(saved)
      : { identity: true, normative: false, ecosystem: false, finalQuiz: false };
  });

  // Scores
  const [moduleScores, setModuleScores] = useState<{
    identity?: number;
    normative?: number;
    ecosystem?: number;
    finalQuiz?: number;
  }>(() => {
    const saved = localStorage.getItem('sena_module_scores');
    return saved ? JSON.parse(saved) : { identity: 100 };
  });

  // Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('sena_badges');
    return saved ? JSON.parse(saved) : INITIAL_BADGES;
  });

  // Cohort for Instructor
  const [cohort, setCohort] = useState<CohortLearner[]>(() => {
    const saved = localStorage.getItem('sena_cohort');
    return saved ? JSON.parse(saved) : INITIAL_COHORT;
  });

  // Modals
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isFinalQuizOpen, setIsFinalQuizOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sena_learner_profile', JSON.stringify(learner));
  }, [learner]);

  useEffect(() => {
    localStorage.setItem('sena_completed_modules', JSON.stringify(completedModules));
  }, [completedModules]);

  useEffect(() => {
    localStorage.setItem('sena_module_scores', JSON.stringify(moduleScores));
  }, [moduleScores]);

  useEffect(() => {
    localStorage.setItem('sena_badges', JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem('sena_cohort', JSON.stringify(cohort));
  }, [cohort]);

  // Overall progress calculation
  const progressPercent = Math.round(
    (Number(completedModules.identity) * 25) +
    (Number(completedModules.normative) * 25) +
    (Number(completedModules.ecosystem) * 25) +
    (Number(completedModules.finalQuiz) * 25)
  );

  const showNotificationBanner = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  /**
   * Smooth Theme Toggle with dynamic optical screen blur effect
   */
  const handleToggleDarkMode = () => {
    if (isBlurringTheme) return;

    const willBeDark = !isDarkMode;
    setBlurTransitionText(willBeDark ? 'Activando Modo Oscuro...' : 'Activando Modo Claro...');
    setIsBlurringTheme(true);

    setTimeout(() => {
      setIsDarkMode(willBeDark);
      if (willBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('sena_dark_mode', String(willBeDark));
    }, 220);

    setTimeout(() => {
      setIsBlurringTheme(false);
      showNotificationBanner(
        willBeDark ? 'Modo Oscuro Institucional Activado' : 'Modo Claro Institucional Activado'
      );
    }, 520);
  };

  const handleSelectLearnerFromLanding = (chosenLearner: LearnerProfile) => {
    // 1. Save learner profile into active state and localStorage
    setLearner(chosenLearner);
    localStorage.setItem('sena_learner_profile', JSON.stringify(chosenLearner));

    // 2. Identify learner in the cohort to track their progress
    const existingIndex = cohort.findIndex(
      (c) => c.documento.trim() === chosenLearner.documento.trim()
    );

    if (existingIndex >= 0) {
      const existing = cohort[existingIndex];
      // Update existing record with the latest profile details
      setCohort((prev) =>
        prev.map((c, i) =>
          i === existingIndex
            ? {
                ...c,
                nombre: chosenLearner.nombre,
                ficha: chosenLearner.ficha,
                programa: chosenLearner.programa,
                ultimoAcceso: 'Hoy (En Línea)',
              }
            : c
        )
      );

      // Restore module progress according to this apprentice's historical record
      const numCompleted = existing.modulosCompletados || 0;
      setCompletedModules({
        identity: numCompleted >= 1,
        normative: numCompleted >= 2,
        ecosystem: numCompleted >= 3,
        finalQuiz: numCompleted >= 4,
      });

      // Unlock relevant badges
      if (numCompleted >= 1) unlockBadge('badge-identidad');
      if (numCompleted >= 2) {
        unlockBadge('badge-normativa');
        unlockBadge('badge-casos');
      }
      if (numCompleted >= 3) unlockBadge('badge-ecosistema');
      if (numCompleted >= 4) unlockBadge('badge-certificacion');
    } else {
      // 3. New learner: register them in the cohort so the Lead Instructor tracks them
      const newCohortLearner: CohortLearner = {
        id: `cohort-${Date.now()}`,
        nombre: chosenLearner.nombre,
        documento: chosenLearner.documento,
        ficha: chosenLearner.ficha,
        programa: chosenLearner.programa,
        progreso: 0,
        modulosCompletados: 0,
        asistenciaInduccion: 'Presente',
        estado: 'En Proceso',
        promedioEvaluaciones: 100,
        ultimoAcceso: 'Hoy (En Línea)',
        observaciones: 'Perfil de aprendiz guardado y registrado para seguimiento de inducción.',
      };
      setCohort((prev) => [newCohortLearner, ...prev]);

      // Fresh progress for new learner
      setCompletedModules({
        identity: false,
        normative: false,
        ecosystem: false,
        finalQuiz: false,
      });
      setModuleScores({});
    }

    // 4. Continue into the interactive prototype as learner
    setRole('learner');
    setCurrentView('app');
    showNotificationBanner(`¡Perfil guardado con éxito! Bienvenido(a) al prototipo de inducción: ${chosenLearner.nombre}`);
  };

  const handleSelectInstructorFromLanding = () => {
    setRole('instructor');
    setCurrentView('app');
    showNotificationBanner(`Sesión iniciada como Instructor Líder: ${DEFAULT_INSTRUCTOR.nombre}`);
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId && !b.unlocked
          ? { ...b, unlocked: true, unlockedAt: new Date().toLocaleDateString('es-CO') }
          : b
      )
    );
  };

  const handleModuleCompleted = (
    moduleKey: 'identity' | 'normative' | 'ecosystem',
    score: number
  ) => {
    setCompletedModules((prev) => ({ ...prev, [moduleKey]: true }));
    setModuleScores((prev) => ({ ...prev, [moduleKey]: score }));

    if (moduleKey === 'identity') {
      unlockBadge('badge-identidad');
      showNotificationBanner('¡Insignia Desbloqueada: Embajador de la Identidad SENA!');
    } else if (moduleKey === 'normative') {
      unlockBadge('badge-normativa');
      unlockBadge('badge-casos');
      showNotificationBanner('¡Insignia Desbloqueada: Guardián del Reglamento del Aprendiz!');
    } else if (moduleKey === 'ecosystem') {
      unlockBadge('badge-ecosistema');
      showNotificationBanner('¡Insignia Desbloqueada: Navegante del Ecosistema Institucional!');
    }

    setCohort((prev) =>
      prev.map((item) =>
        item.documento === learner.documento
          ? {
              ...item,
              progreso: Math.min(100, item.progreso + 25),
              modulosCompletados: Math.min(4, item.modulosCompletados + 1),
            }
          : item
      )
    );
  };

  const handleFinalQuizCompleted = (score: number) => {
    setCompletedModules((prev) => ({ ...prev, finalQuiz: true }));
    setModuleScores((prev) => ({ ...prev, finalQuiz: score }));
    unlockBadge('badge-certificacion');
    showNotificationBanner('¡Felicitaciones! Has culminado tu inducción SENA. Certificado generado.');

    setCohort((prev) =>
      prev.map((item) =>
        item.documento === learner.documento
          ? {
              ...item,
              progreso: 100,
              modulosCompletados: 4,
              estado: 'Completado',
              promedioEvaluaciones: Math.round(
                ((moduleScores.identity || 90) +
                  (moduleScores.normative || 90) +
                  (moduleScores.ecosystem || 90) +
                  score) /
                  4
              ),
            }
          : item
      )
    );

    setIsFinalQuizOpen(false);
    setIsCertificateOpen(true);
  };

  const handleUpdateLearner = (updated: LearnerProfile) => {
    setLearner(updated);
    showNotificationBanner('Datos del aprendiz actualizados con éxito.');
  };

  const handleUpdateCohortLearner = (updated: CohortLearner) => {
    setCohort((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showNotificationBanner(`Seguimiento actualizado para ${updated.nombre}.`);
  };

  // If in Landing Page mode, render the Institutional Role Gateway
  if (currentView === 'landing') {
    return (
      <>
        <RoleLandingPage
          instructor={DEFAULT_INSTRUCTOR}
          cohort={cohort}
          currentLearner={learner}
          onSelectLearnerRole={handleSelectLearnerFromLanding}
          onSelectInstructorRole={handleSelectInstructorFromLanding}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenVideoManual={() => setIsVideoModalOpen(true)}
        />
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoUrl="https://docs.google.com/videos/d/1y-awrf1ogXGwnynaeh3RIgWydp8mPhOUgT_0Poev0y4/play?usp=sharing"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300 relative">
      {/* Dynamic Screen Blur Overlay during theme transformation */}
      {isBlurringTheme && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-xl bg-slate-900/20 dark:bg-black/30 flex items-center justify-center transition-all duration-300 animate-fadeIn"
        >
          <div className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold tracking-wide">{blurTransitionText}</span>
          </div>
        </div>
      )}

      {/* Main App Container */}
      <div className={`flex flex-col flex-1 ${isBlurringTheme ? 'theme-blur-active' : 'theme-blur-idle'}`}>
        {/* Top Bar Contract (3 zones with Dark Mode Button in Zone 3 / Top Right) */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            if (role === 'instructor') setRole('learner');
          }}
          role={role}
          onToggleRole={() => {
            setRole((prev) => (prev === 'learner' ? 'instructor' : 'learner'));
          }}
          isCertified={completedModules.finalQuiz}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenLanding={() => setCurrentView('landing')}
          onOpenVideoManual={() => setIsVideoModalOpen(true)}
        />

        {/* Ephemeral Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-40 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 dark:border-slate-700 flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-slate-100">{notification}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {role === 'instructor' ? (
            <InstructorDashboard
              cohort={cohort}
              instructor={DEFAULT_INSTRUCTOR}
              onUpdateLearner={handleUpdateCohortLearner}
              onReturnToLearnerView={() => setRole('learner')}
              onOpenLanding={() => setCurrentView('landing')}
            />
          ) : (
            <>
              {currentTab === 'overview' && (
                <LearnerOverview
                  learner={learner}
                  onUpdateLearner={handleUpdateLearner}
                  progressPercent={progressPercent}
                  completedModules={completedModules}
                  moduleScores={moduleScores}
                  badges={badges}
                  onNavigateTab={(tab) => setCurrentTab(tab)}
                  onOpenCertificate={() => setIsCertificateOpen(true)}
                  onStartFinalQuiz={() => setIsFinalQuizOpen(true)}
                />
              )}

              {currentTab === 'identity' && (
                <ModuleIdentity
                  onModuleCompleted={(score) => handleModuleCompleted('identity', score)}
                  isCompleted={completedModules.identity}
                />
              )}

              {currentTab === 'normative' && (
                <ModuleNormative
                  onModuleCompleted={(score) => handleModuleCompleted('normative', score)}
                  isCompleted={completedModules.normative}
                />
              )}

              {currentTab === 'ecosystem' && (
                <ModuleEcosystem
                  onModuleCompleted={(score) => handleModuleCompleted('ecosystem', score)}
                  isCompleted={completedModules.ecosystem}
                />
              )}
            </>
          )}

          {/* Final Quiz Modal */}
          {isFinalQuizOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="my-8 w-full max-w-3xl">
                <ModuleQuiz
                  title="Evaluación General de Certificación de Inducción"
                  subtitle="Examen integral de verificación sobre Identidad, Reglamento del Aprendiz y Ecosistema SENA."
                  questions={QUIZ_FINAL_CERTIFICATION}
                  onCompleteQuiz={handleFinalQuizCompleted}
                  onClose={() => setIsFinalQuizOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Official Certificate Modal */}
          <CertificateModal
            learner={learner}
            isOpen={isCertificateOpen}
            onClose={() => setIsCertificateOpen(false)}
          />

          {/* Video Manual Modal */}
          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl="https://docs.google.com/videos/d/1y-awrf1ogXGwnynaeh3RIgWydp8mPhOUgT_0Poev0y4/play?usp=sharing"
          />
        </main>

        {/* Institutional Quiet Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <SenaLogo className="w-5 h-5 shrink-0" color="#39a900" />
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400">SENA</span>
              <span aria-hidden="true">·</span>
              <span>Servicio Nacional de Aprendizaje</span>
              <span aria-hidden="true">·</span>
              <span>Ministerio del Trabajo de Colombia</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <span>Dirección General: Calle 57 No. 8 - 69, Bogotá D.C.</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">Vigencia 2026</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
