import React, { useState } from 'react';
import { LearnerProfile, InstructorProfile, CohortLearner } from '../types';
import { SenaLogo } from './SenaLogo';
import { SenaEscudo } from './SenaEscudo';

interface RoleLandingPageProps {
  instructor: InstructorProfile;
  cohort: CohortLearner[];
  currentLearner: LearnerProfile;
  onSelectLearnerRole: (learner: LearnerProfile) => void;
  onSelectInstructorRole: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenVideoManual: () => void;
}

export const RoleLandingPage: React.FC<RoleLandingPageProps> = ({
  instructor,
  cohort,
  currentLearner,
  onSelectLearnerRole,
  onSelectInstructorRole,
  isDarkMode,
  onToggleDarkMode,
  onOpenVideoManual,
}) => {
  // Step in the apprentice access flow: 'select_role' -> 'fill_data'
  const [learnerStep, setLearnerStep] = useState<'select_role' | 'fill_data'>('select_role');
  // Starts directly in clean form mode ('new') as requested: "inicia el formulario con los campos limpios"
  const [dataEntryMode, setDataEntryMode] = useState<'new' | 'existing'>('new');

  // Form fields initialized COMPLETELY CLEAN as requested: "inicia el formulario con los campos limpios"
  const [selectedLearnerDoc, setSelectedLearnerDoc] = useState<string>('');
  const [tipoDocumento, setTipoDocumento] = useState<string>('C.C.');
  const [nombre, setNombre] = useState<string>('');
  const [documento, setDocumento] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [ficha, setFicha] = useState<string>('');
  const [programa, setPrograma] = useState<string>('');
  const [regional, setRegional] = useState<string>('');
  const [centro, setCentro] = useState<string>('');
  const [sede, setSede] = useState<string>('');
  const [jornada, setJornada] = useState<string>('Diurna (07:00 - 13:00)');
  const [identifiedProgress, setIdentifiedProgress] = useState<number>(0);

  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Generic Instructor Authentication Credentials
  const GENERIC_INSTRUCTOR_USER = 'instructor';
  const GENERIC_INSTRUCTOR_PASS = 'Sena2026*';

  // Instructor login form state
  const [instructorUser, setInstructorUser] = useState<string>('');
  const [instructorPass, setInstructorPass] = useState<string>('');
  const [showInstructorPass, setShowInstructorPass] = useState<boolean>(false);
  const [instructorLoginError, setInstructorLoginError] = useState<string | null>(null);
  const [isVerifyingInstructor, setIsVerifyingInstructor] = useState<boolean>(false);

  // Quick autofill generic credentials for demo and evaluation
  const handleAutofillInstructorCredentials = () => {
    setInstructorUser(GENERIC_INSTRUCTOR_USER);
    setInstructorPass(GENERIC_INSTRUCTOR_PASS);
    setInstructorLoginError(null);
  };

  // Instructor Login Form Submission
  const handleInstructorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructorLoginError(null);

    const cleanUser = instructorUser.trim().toLowerCase();
    const cleanPass = instructorPass.trim();

    if (!cleanUser || !cleanPass) {
      setInstructorLoginError('Por favor ingresa tanto el usuario como la contraseña institucional.');
      return;
    }

    setIsVerifyingInstructor(true);

    setTimeout(() => {
      setIsVerifyingInstructor(false);
      // Valid usernames
      const isUserValid =
        cleanUser === 'instructor' ||
        cleanUser === 'instructor@sena.edu.co' ||
        cleanUser === 'cmendoza' ||
        cleanUser === 'admin';

      // Valid passwords
      const isPassValid =
        cleanPass === 'Sena2026*' ||
        cleanPass.toLowerCase() === 'sena2026' ||
        cleanPass === 'Sena1234';

      if (isUserValid && isPassValid) {
        onSelectInstructorRole();
      } else {
        setInstructorLoginError(
          'Credenciales incorrectas. Por favor verifica tu usuario institucional y contraseña.'
        );
      }
    }, 350);
  };

  // When selecting an existing learner from the cohort list, populate their data and identified progress
  const handleSelectExistingLearner = (doc: string) => {
    setSelectedLearnerDoc(doc);
    const found = cohort.find((c) => c.documento === doc);
    if (found) {
      setNombre(found.nombre);
      setDocumento(found.documento);
      setFicha(found.ficha);
      setPrograma(found.programa);
      setEmail(`${found.nombre.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`);
      setRegional(instructor.regional);
      setCentro(instructor.centro);
      setSede('Sede Principal de Formación');
      setIdentifiedProgress(found.progreso);
    }
  };

  // Switch to new apprentice mode with clean form
  const handleSwitchToNew = () => {
    setDataEntryMode('new');
    setNombre('');
    setDocumento('');
    setEmail('');
    setTelefono('');
    setFicha('');
    setPrograma('');
    setRegional('');
    setCentro('');
    setSede('');
    setIdentifiedProgress(0);
    setFormError(null);
  };

  // Switch to existing cohort mode
  const handleSwitchToExisting = () => {
    setDataEntryMode('existing');
    const defaultDoc = selectedLearnerDoc || cohort[0]?.documento || '';
    handleSelectExistingLearner(defaultDoc);
    setFormError(null);
  };

  // Choose apprentice role and transition to data completion step with clean fields
  const handleChooseLearnerRole = () => {
    setLearnerStep('fill_data');
    setDataEntryMode('new');
    // Ensure fields remain clean on initial entrance
    setNombre('');
    setDocumento('');
    setEmail('');
    setTelefono('');
    setFicha('');
    setPrograma('');
    setRegional('');
    setCentro('');
    setSede('');
    setIdentifiedProgress(0);
    setFormError(null);
  };

  // Optional quick-fill with sample ADSO data for testing
  const handleFillSampleData = () => {
    setNombre('Laura Victoria Gómez Morales');
    setTipoDocumento('C.C.');
    setDocumento('1024592118');
    setEmail('lvgomez@soy.sena.edu.co');
    setTelefono('312 458 9201');
    setFicha(instructor.fichaAsignada);
    setPrograma(instructor.programa);
    setRegional(instructor.regional);
    setCentro(instructor.centro);
    setSede('Sede Principal Fontibón');
    setJornada('Diurna (07:00 - 13:00)');
    setFormError(null);
  };

  // Save profile and continue to prototype
  const handleSaveLearnerProfileAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!nombre.trim()) {
      setFormError('Por favor ingresa tus Nombres y Apellidos completos (mira la pista debajo de la casilla).');
      return;
    }

    if (!documento.trim()) {
      setFormError('Por favor ingresa tu Número de Documento de Identidad (mira la pista debajo de la casilla).');
      return;
    }

    if (!ficha.trim() || !programa.trim()) {
      setFormError('Por favor verifica el número de ficha y el programa de formación.');
      return;
    }

    setIsSaving(true);

    const savedProfile: LearnerProfile = {
      id: `AP-${documento.replace(/\D/g, '') || Date.now()}`,
      nombre: nombre.trim(),
      tipoDocumento: tipoDocumento,
      documento: documento.trim(),
      ficha: ficha.trim(),
      programa: programa.trim(),
      regional: regional.trim() || instructor.regional,
      centro: centro.trim() || instructor.centro,
      sede: sede.trim() || 'Sede Principal',
      jornada: jornada || instructor.jornada,
      email: email.trim() || `${nombre.toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
      telefono: telefono.trim() || '310 000 0000',
      fechaIngreso: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }),
    };

    setTimeout(() => {
      setIsSaving(false);
      onSelectLearnerRole(savedProfile);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors">
      {/* Top Bar for Landing */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SenaLogo className="w-10 h-10 shrink-0" color="#39a900" />
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight block leading-none">
                SENA <span className="text-emerald-600 dark:text-emerald-400 font-semibold">· Inducción Digital</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Portal de Acceso y Selección de Rol
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-4">
              <span>Ficha Activa:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {instructor.fichaAsignada}
              </span>
            </div>

            {/* Video Manual Button */}
            <button
              type="button"
              onClick={onOpenVideoManual}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>▶️ Video Manual</span>
            </button>

            {/* Dark Mode Button */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              className="p-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            >
              {isDarkMode ? (
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header Strip */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <SenaEscudo className="w-4 h-4 object-contain" />
              <span>Servicio Nacional de Aprendizaje · Vigencia 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
              Plataforma Institucional de Inducción y Seguimiento
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
              Bienvenido al ecosistema interactivo de formación profesional integral. Selecciona tu rol para ingresar a la ruta de inducción del aprendiz o al panel central de supervisión docente.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span>{instructor.regional}</span>
              <span aria-hidden="true">·</span>
              <span>{instructor.centro}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Ficha {instructor.fichaAsignada}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Role Selection Cards */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: ROL APRENDIZ (Múltiples Aprendices - Flujo de 3 Pasos) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all relative overflow-hidden">
            {/* Soft decorative background highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              {/* Header with Title and Badges */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-2 text-emerald-700 dark:text-emerald-300 shadow-xs">
                    <SenaLogo className="w-8 h-8" color="#39a900" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                      Múltiples Aprendices Matriculados
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      Soy Aprendiz SENA
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  {cohort.length} en ficha
                </span>
              </div>

              {/* Step indicator pipeline */}
              <div className="grid grid-cols-3 gap-1.5 py-1 text-[11px] font-semibold text-center">
                <div
                  className={`p-2 rounded-lg border transition-all ${
                    learnerStep === 'select_role'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'bg-emerald-100/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  <span className="block text-[10px] font-mono">Paso 1</span>
                  <span>{learnerStep === 'fill_data' ? '✓ Rol Elegido' : 'Escoger Rol'}</span>
                </div>
                <div
                  className={`p-2 rounded-lg border transition-all ${
                    learnerStep === 'fill_data'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold ring-1 ring-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <span className="block text-[10px] font-mono">Paso 2</span>
                  <span>Datos y Progreso</span>
                </div>
                <div className="p-2 rounded-lg border bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <span className="block text-[10px] font-mono">Paso 3</span>
                  <span>Guardar y Acceso</span>
                </div>
              </div>

              {/* STAGE 1: Escoger rol de aprendiz */}
              {learnerStep === 'select_role' && (
                <div className="space-y-4 pt-1 animate-fadeIn">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Al seleccionar el rol de aprendiz, ingresarás tus datos de interés institucional para registrar tu perfil, vincular tu avance académico y habilitar tu acceso al prototipo interactivo de inducción.
                  </p>

                  <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                      ¿Qué harás al acceder como aprendiz?
                    </span>
                    <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
                      <li>Apropiar los símbolos oficiales: Escudo, Logosímbolo e Himno interactivo.</li>
                      <li>Consultar tus Derechos, Deberes y el Debido Proceso (Acuerdo 0009 de 2024).</li>
                      <li>Resolver casos reales en el Simulador del Comité de Evaluación.</li>
                      <li>Obtener tu Certificado Oficial de Inducción con tu código de verificación.</li>
                    </ul>
                  </div>

                  {/* Button 1: Escoger Rol de Aprendiz */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleChooseLearnerRole}
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>1. Escoger Rol de Aprendiz</span>
                      <span className="text-base font-bold">→</span>
                    </button>
                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                      Continúa al formulario de datos para identificar tu ficha y guardar tu perfil
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 2: Diligenciar datos de interés requeridos y guardar perfil */}
              {learnerStep === 'fill_data' && (
                <form onSubmit={handleSaveLearnerProfileAndContinue} className="space-y-4 pt-1 animate-fadeIn">
                  {/* Sub-header with Back Button and Quick Hint Banner */}
                  <div className="space-y-2 pb-1 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block">
                          Paso 2: Datos de Identificación y Progreso
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Formulario limpio: completa tus datos siguiendo las pistas de cada casilla.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLearnerStep('select_role')}
                        className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white underline cursor-pointer"
                      >
                        ← Cambiar rol
                      </button>
                    </div>

                    {/* Guía general de pistas */}
                    <div className="p-2.5 bg-emerald-50/90 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="text-sm shrink-0 mt-0.5">💡</span>
                        <div className="text-[11px] leading-relaxed">
                          <strong className="block font-semibold">Pista general de inducción:</strong>
                          <span>Los campos inician limpios. Puedes escribir tus datos reales o usar el botón de ejemplo rápido para probar el prototipo.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleFillSampleData}
                        className="shrink-0 text-[10px] font-bold px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
                        title="Rellena automáticamente con datos de prueba de la ficha ADSO"
                      >
                        ⚡ Llenar con Ejemplo
                      </button>
                    </div>
                  </div>

                  {/* Mode Selector: Nuevo aprendiz (por defecto limpio) vs Cargar de la ficha */}
                  <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
                    <button
                      type="button"
                      onClick={handleSwitchToNew}
                      className={`flex-1 py-2 font-semibold rounded-lg transition-colors cursor-pointer ${
                        dataEntryMode === 'new'
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Formulario Limpio (Nuevo Aprendiz)
                    </button>
                    <button
                      type="button"
                      onClick={handleSwitchToExisting}
                      className={`flex-1 py-2 font-semibold rounded-lg transition-colors cursor-pointer ${
                        dataEntryMode === 'existing'
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Cargar de la Ficha ({cohort.length})
                    </button>
                  </div>

                  {/* Dropdown if learner selects existing cohort member */}
                  {dataEntryMode === 'existing' && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-1.5 animate-fadeIn">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Seleccionar aprendiz registrado en la ficha:
                      </label>
                      <select
                        value={selectedLearnerDoc}
                        onChange={(e) => handleSelectExistingLearner(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-emerald-600"
                      >
                        <option value="">-- Elige un aprendiz de la lista --</option>
                        {cohort.map((item) => (
                          <option key={item.id} value={item.documento}>
                            {item.nombre} — {item.documento} ({item.progreso}% completado)
                          </option>
                        ))}
                      </select>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                        <span>💡 <strong>Pista:</strong> Al seleccionar un aprendiz se cargarán sus notas y avance.</span>
                        <span className="font-bold">{identifiedProgress}% completado</span>
                      </p>
                    </div>
                  )}

                  {/* Input Form Fields with dedicated hints */}
                  <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-1">
                    {/* Nombres y Apellidos */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Nombres y Apellidos Completos: <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400">Requerido</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Ej. Laura Victoria Gómez Morales"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        required
                      />
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                        <span className="text-emerald-600 dark:text-emerald-400">💡</span>
                        <span><strong>Pista:</strong> Escribe tus dos nombres y dos apellidos tal como están en tu documento legal (se imprimirán en tu certificado oficial).</span>
                      </p>
                    </div>

                    {/* Tipo y Documento */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Tipo Doc.:
                        </label>
                        <select
                          value={tipoDocumento}
                          onChange={(e) => setTipoDocumento(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        >
                          <option value="C.C.">C.C. - Cédula</option>
                          <option value="T.I.">T.I. - Tarjeta Identidad</option>
                          <option value="C.E.">C.E. - Extranjería</option>
                          <option value="PPT">PPT - Permiso Protección</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Número de Documento: <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400">Solo números</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Ej. 1024592118"
                          value={documento}
                          onChange={(e) => setDocumento(e.target.value.replace(/[^\d.-]/g, ''))}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
                          required
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-3">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1">
                          <span className="text-emerald-600 dark:text-emerald-400">💡</span>
                          <span><strong>Pista:</strong> Ingresa el número sin puntos ni comas (ej: 1024592118). Con este documento el instructor identificará tu entrega de actividades.</span>
                        </p>
                      </div>
                    </div>

                    {/* Ficha y Programa */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Número de Ficha:
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. 2834591"
                          value={ficha}
                          onChange={(e) => setFicha(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Programa de Formación:
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Tecnología en Análisis y Desarrollo de Software"
                          value={programa}
                          onChange={(e) => setPrograma(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-3">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1">
                          <span className="text-emerald-600 dark:text-emerald-400">💡</span>
                          <span><strong>Pista:</strong> La ficha es el código de 7 u 8 dígitos de tu grupo (ej: 2834591). Si lo dejas vacío, se usará la ficha asignada por el instructor.</span>
                        </p>
                      </div>
                    </div>

                    {/* Email y Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Correo Electrónico:
                        </label>
                        <input
                          type="email"
                          placeholder="Ej. micorreo@soy.sena.edu.co"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          💡 <strong>Pista:</strong> Tu correo institucional @soy.sena.edu.co o tu correo personal.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Teléfono / Celular:
                        </label>
                        <input
                          type="tel"
                          placeholder="Ej. 312 458 9201"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          💡 <strong>Pista:</strong> Celular activo para contacto con Bienestar al Aprendiz.
                        </p>
                      </div>
                    </div>

                    {/* Regional y Centro */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Regional SENA:
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Regional Distrito Capital"
                          value={regional}
                          onChange={(e) => setRegional(e.target.value)}
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          💡 <strong>Pista:</strong> Departamento o regional geográfica de tu centro.
                        </p>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Centro de Formación:
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Centro de Gestión de Mercados, Logística y TIC"
                          value={centro}
                          onChange={(e) => setCentro(e.target.value)}
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs"
                        />
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                          💡 <strong>Pista:</strong> Centro donde te encuentras matriculado.
                        </p>
                      </div>
                    </div>

                    {/* Sede y Jornada */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Sede de Formación:
                        </label>
                        <input
                          type="text"
                          placeholder="Ej. Sede Principal Fontibón"
                          value={sede}
                          onChange={(e) => setSede(e.target.value)}
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Jornada de Estudio:
                        </label>
                        <select
                          value={jornada}
                          onChange={(e) => setJornada(e.target.value)}
                          className="w-full p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                        >
                          <option value="Diurna (07:00 - 13:00)">Diurna (07:00 - 13:00)</option>
                          <option value="Nocturna (18:00 - 22:00)">Nocturna (18:00 - 22:00)</option>
                          <option value="Mixta / Fines de Semana">Mixta / Fines de Semana</option>
                          <option value="Virtual (100% en Línea)">Virtual (100% en Línea)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Form Error feedback if any */}
                  {formError && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
                      {formError}
                    </div>
                  )}

                  {/* Paso 3: Guardar perfil del aprendiz y continuar */}
                  <div className="pt-2 space-y-1.5">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {isSaving ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Guardando Perfil del Aprendiz...</span>
                        </>
                      ) : (
                        <>
                          <span>💾 Guardar Perfil y Continuar al Prototipo</span>
                          <span className="text-base">→</span>
                        </>
                      )}
                    </button>
                    <span className="block text-[11px] text-center text-slate-500 dark:text-slate-400">
                      Tus datos y progreso se almacenarán para el seguimiento de la ficha
                    </span>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-slate-500 dark:text-slate-400 relative z-10">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold block text-slate-800 dark:text-slate-200">Símbolos</span>
                <span>Escudo e Himno</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold block text-slate-800 dark:text-slate-200">Reglamento</span>
                <span>Derechos y Deberes</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold block text-slate-800 dark:text-slate-200">Simulador</span>
                <span>Casos del Comité</span>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-lg">
                <span className="font-semibold block text-slate-800 dark:text-slate-200">Diploma</span>
                <span>Certificado PDF</span>
              </div>
            </div>
          </div>

          {/* Card 2: ROL INSTRUCTOR (Un Solo Instructor Encargado) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl border-2 border-slate-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center p-2 text-emerald-400 shadow-xs">
                    <SenaEscudo className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                      Instructor Líder Asignado
                    </span>
                    <h2 className="text-2xl font-extrabold text-white">
                      Soy el Instructor
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-950/90 text-emerald-300 border border-emerald-800/80 shrink-0">
                  Docente Encargado
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Panel central para el docente responsable de la ficha. Monitorea en tiempo real el progreso de cada aprendiz, revisa cuestionarios, califica casos del comité y descarga reportes.
              </p>

              {/* Dedicated Instructor Profile Box */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3 backdrop-blur-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-emerald-700/40 border border-emerald-500/50 flex items-center justify-center text-sm font-extrabold text-white">
                    CM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{instructor.nombre}</h3>
                    <p className="text-xs text-emerald-300">{instructor.cargo}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Identificación:</span>
                    <span className="font-mono text-slate-200">C.C. {instructor.documento}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Ficha a Cargo:</span>
                    <span className="font-mono font-bold text-emerald-400">{instructor.fichaAsignada}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-700/60">
                    <span className="text-slate-400 block text-[11px]">Programa y Centro:</span>
                    <span className="text-slate-200 truncate block text-[11px]">{instructor.programa}</span>
                    <span className="text-slate-400 truncate block text-[10px]">{instructor.centro}</span>
                  </div>
                </div>
              </div>

              {/* Formulario de Autenticación con Usuario y Contraseña */}
              <form onSubmit={handleInstructorLogin} className="space-y-4 pt-1">
                {/* Campos de Entrada de Credenciales */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Usuario Institucional:
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa tu usuario institucional"
                      value={instructorUser}
                      onChange={(e) => {
                        setInstructorUser(e.target.value);
                        setInstructorLoginError(null);
                      }}
                      className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-200">
                        Contraseña de Acceso:
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowInstructorPass(!showInstructorPass)}
                        className="text-[11px] text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {showInstructorPass ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showInstructorPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={instructorPass}
                        onChange={(e) => {
                          setInstructorPass(e.target.value);
                          setInstructorLoginError(null);
                        }}
                        className="w-full p-3 rounded-xl border border-slate-700 bg-slate-900/90 text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden placeholder:text-slate-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Mensaje de Error en caso de credenciales inválidas */}
                {instructorLoginError && (
                  <div className="p-2.5 bg-red-950/70 border border-red-800 rounded-xl text-xs text-red-300 animate-fadeIn flex items-start gap-1.5">
                    <span>⚠️</span>
                    <span>{instructorLoginError}</span>
                  </div>
                )}

                {/* Botón de Validación e Ingreso */}
                <button
                  type="submit"
                  disabled={isVerifyingInstructor}
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-700 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  {isVerifyingInstructor ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>Validando Credenciales Docentes...</span>
                    </>
                  ) : (
                    <>
                      <span>Ingresar al Panel de Supervisión Ficha</span>
                      <span className="text-base">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[11px] text-slate-400 relative z-10">
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <span className="font-semibold block text-slate-200">{cohort.length} Aprendices</span>
                <span>En seguimiento</span>
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <span className="font-semibold block text-slate-200">Asistencia</span>
                <span>Presencial/Virtual</span>
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <span className="font-semibold block text-slate-200">Comité</span>
                <span>Revisión de Casos</span>
              </div>
              <div className="p-2 bg-slate-800/50 rounded-lg">
                <span className="font-semibold block text-slate-200">Exportar</span>
                <span>Reportes en CSV</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Cards Grid below */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Ecosistema Integral de Formación
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              ¿Qué incluye el proceso de inducción SENA?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-3 font-bold text-lg">
                01
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Identidad e Imagen Corporativa</h4>
              <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-xs">
                Escudo desglosado, logosímbolo oficial con senderos divergentes, bandera blanca y reproductor del himno institucional con acordes sintetizados.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-3 font-bold text-lg">
                02
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Reglamento del Aprendiz (Acuerdo 0009)</h4>
              <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-xs">
                Derechos, deberes, tipología de faltas (leves, graves, gravísimas), debido proceso y simulador de casos reales del Comité de Evaluación.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 mb-3 font-bold text-lg">
                03
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Ecosistema y Servicios 4.0</h4>
              <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-xs">
                Plataforma Zajuna LMS, Bienestar al Aprendiz, Sistema de Bibliotecas, APE, Fondo Emprender y las 5 modalidades legales de etapa productiva.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
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
  );
};
