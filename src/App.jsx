import React, { useState, useEffect } from 'react';
import {
  Flame, Zap, Camera, Trophy, Share2, CheckCircle2, Lock,
  QrCode, Sparkles, Activity, ChevronRight, RefreshCw,
  Smartphone, Award, ArrowUpRight, Plus, Check, User, CreditCard, Bell
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [stravaConnected, setStravaConnected] = useState(true);
  const [points, setPoints] = useState(450);
  const [isPro, setIsPro] = useState(false);
  const [simulatePaywall, setSimulatePaywall] = useState(false);
  
  // Estado de Macros del Día
  const [macros, setMacros] = useState({
    calories: { current: 1420, target: 2350 },
    protein: { current: 95, target: 160 },
    carbs: { current: 140, target: 240 },
    fats: { current: 48, target: 70 }
  });

  // Estado del Coach IA
  const [selectedMeal, setSelectedMeal] = useState('desayuno');
  const [customMealText, setCustomMealText] = useState('');
  const [mealLogged, setMealLogged] = useState(false);

  // Estado del Modal QR
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [qrTimer, setQrTimer] = useState(180);

  // Estado de Stories
  const [storyStyle, setStoryStyle] = useState('dark');

  // Estado de Perfil / Suscripción
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [confirmCancel, setConfirmCancel] = useState(false);
  const nextCharge = (() => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d.toLocaleDateString('es-PA', { day: 'numeric', month: 'long' }); })();

  useEffect(() => {
    if (!activeCoupon) return;
    const interval = setInterval(() => {
      setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeCoupon]);

  const mealsCatalog = {
    desayuno: {
      name: '2 Huevos Revueltos, 1 Hojaldra y Café Negro',
      calories: 460,
      protein: 18,
      carbs: 42,
      fats: 24,
      feedback: 'Buen arranque de energía. La hojaldra subió las grasas del desayuno; en el almuerzo prioriza proteína limpia (pollo o pescado a la plancha) para cuadrar tu día.'
    },
    almuerzo: {
      name: 'Filete de Corvina a la Plancha, Arroz Blanco y Tajadas',
      calories: 640,
      protein: 44,
      carbs: 68,
      fats: 18,
      feedback: '¡Combo ganador post-entreno! Los 44g de proteína de la corvina y los carbos de las tajadas van directo a recuperar tus piernas de los 8 km de hoy.'
    },
    bowl: {
      name: 'Poke Bowl de Salmón, Edamame, Aguacate y Arroz de Sushi',
      calories: 580,
      protein: 36,
      carbs: 58,
      fats: 22,
      feedback: 'Perfil de macros impecable. Grasas saludables y proteína de alta absorción.'
    }
  };

  const currentMeal = mealsCatalog[selectedMeal];

  const handleLogMeal = () => {
    if (simulatePaywall && !isPro) return;
    setMacros((prev) => ({
      calories: { ...prev.calories, current: prev.calories.current + currentMeal.calories },
      protein: { ...prev.protein, current: prev.protein.current + currentMeal.protein },
      carbs: { ...prev.carbs, current: prev.carbs.current + currentMeal.carbs },
      fats: { ...prev.fats, current: prev.fats.current + currentMeal.fats }
    }));
    setPoints((p) => p + 50);
    setMealLogged(true);
    setTimeout(() => setMealLogged(false), 2500);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white font-sans flex flex-col items-center py-6 px-4">
      {/* Barra superior de control del prototipo */}
      <div className="w-full max-w-md mb-4 bg-[#14171F] border border-white/10 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <button 
          onClick={() => setActiveTab('onboarding')}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'onboarding' ? 'bg-[#CCFF00] text-black' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
        >
          1. Ver Onboarding
        </button>
        <button 
          onClick={() => setSimulatePaywall(!simulatePaywall)}
          className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 transition ${simulatePaywall ? 'bg-[#FF5A36] text-white' : 'bg-white/5 text-gray-300'}`}
        >
          <Lock className="w-3.5 h-3.5" />
          {simulatePaywall ? 'Paywall Activo' : 'Simular Límite Gratis'}
        </button>
        <button 
          onClick={() => setIsPro(!isPro)}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${isPro ? 'bg-[#CCFF00] text-black' : 'border border-[#CCFF00]/40 text-[#CCFF00]'}`}
        >
          {isPro ? '★ Miembro PRO' : 'Plan Gratis'}
        </button>
      </div>

      {/* Marco del Teléfono */}
      <div className="w-full max-w-md bg-[#0F1117] border border-white/10 rounded-[36px] overflow-hidden shadow-2xl flex flex-col min-h-[740px] relative">
        
        {/* Header de la App */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black font-black tracking-tighter">
              KP
            </div>
            <div>
              <span className="font-bold tracking-tight text-sm block leading-none">KINETIC PTY</span>
              <span className="text-[10px] text-gray-400">Performance & Club</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPro && (
              <span className="bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 text-[10px] font-bold px-2.5 py-1 rounded-full">
                PRO VIP
              </span>
            )}
            <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#CCFF00] fill-[#CCFF00]" />
              <span className="text-xs font-bold">{points} pts</span>
            </div>
          </div>
        </div>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-5">
          
          {/* PANTALLA 1: ONBOARDING EXPRESS */}
          {activeTab === 'onboarding' && (
            <div className="space-y-6 py-2">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>CONFIGURACIÓN EXPRESS</span>
                <span>Paso {onboardingStep} de 2</span>
              </div>

              {onboardingStep === 1 ? (
                <div className="space-y-5">
                  <h2 className="text-2xl font-extrabold leading-tight">
                    Tu sudor y tu nutrición, <span className="text-[#CCFF00]">recompensados.</span>
                  </h2>
                  <p className="text-sm text-gray-400">
                    Selecciona tu enfoque principal para calibrar tu Coach IA y tus retos semanales en Panamá.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Running / Fondo', 'Gym & Fuerza', 'Atleta Híbrido', 'Calistenia / Cross'].map((sport, i) => (
                      <button 
                        key={i}
                        onClick={() => setOnboardingStep(2)}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#CCFF00] text-left transition group"
                      >
                        <Activity className="w-5 h-5 text-[#CCFF00] mb-2 group-hover:scale-110 transition" />
                        <div className="font-bold text-sm">{sport}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">Sincronización activa</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FF5A36]/20 to-transparent border border-[#FF5A36]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF5A36]">Conexión Instantánea</span>
                      <CheckCircle2 className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <h3 className="text-lg font-bold">Strava conectado</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Detectamos tus <strong>8.0 km en Cinta Costera (46 min)</strong> de esta mañana. Acreditamos tus primeros <strong>+150 pts</strong> y subimos tu meta de carbohidratos de hoy en +45g.
                    </p>
                    <p className="text-[11px] text-gray-400">Apple Health: disponible cuando lancemos la app de iOS.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="w-full py-4 rounded-2xl bg-[#CCFF00] text-black font-extrabold text-sm hover:opacity-95 transition"
                  >
                    Entrar a mi Dashboard →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PANTALLA 2: HOME DASHBOARD */}
          {activeTab === 'home' && (
            <div className="space-y-5">
              {/* Tarjeta de Sincronización Deportiva */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181C26] to-[#12151C] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF5A36]/20 border border-[#FF5A36]/40 flex items-center justify-center text-[#FF5A36]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Entreno sincronizado hoy (Strava)</div>
                    <div className="font-bold text-sm">8.0 km Cinta Costera • 620 kcal</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 rounded-lg">
                  +45g Carbs
                </span>
              </div>

              {/* Bloque de Combustible / Macros del Día */}
              <div className="p-5 rounded-3xl bg-[#151821] border border-white/10 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Combustible Diario</span>
                    <div className="text-2xl font-black mt-0.5">
                      {macros.calories.current} <span className="text-sm font-normal text-gray-400">/ {macros.calories.target} kcal</span>
                    </div>
                    {macros.calories.current > macros.calories.target && (
                      <div className="text-xs font-bold text-red-400 mt-0.5">+{macros.calories.current - macros.calories.target} kcal sobre tu meta</div>
                    )}
                  </div>
                  <button 
                    onClick={() => setActiveTab('coach')}
                    className="text-xs font-bold text-[#CCFF00] flex items-center gap-1 hover:underline"
                  >
                    <Camera className="w-3.5 h-3.5" /> Escanear plato
                  </button>
                </div>

                {/* Barras de Macros */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[
                    { label: 'Proteína', val: macros.protein.current, max: macros.protein.target, color: 'bg-[#CCFF00]' },
                    { label: 'Carbos', val: macros.carbs.current, max: macros.carbs.target, color: 'bg-cyan-400' },
                    { label: 'Grasas', val: macros.fats.current, max: macros.fats.target, color: 'bg-[#FF5A36]' },
                  ].map((m, i) => (
                    <div key={i} className="bg-black/30 p-3 rounded-2xl border border-white/5">
                      <div className="text-[11px] text-gray-400">{m.label}</div>
                      <div className={`font-bold text-sm my-1 ${m.val > m.max ? 'text-red-400' : ''}`}>{m.val}g <span className="text-[10px] text-gray-500">/{m.max}g</span></div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${m.val > m.max ? 'bg-red-500' : m.color}`} style={{ width: `${Math.min(100, (m.val / m.max) * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reto Activo de la Semana */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1A1F2C] to-[#12151E] border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-gray-300">
                    Reto Semanal Activo
                  </span>
                  <span className="text-xs font-bold text-[#CCFF00]">14 / 20 km</span>
                </div>
                <h3 className="font-bold text-base">Fondo de Semana: Desbloquea tu Cold Brew</h3>
                <p className="text-xs text-gray-400">
                  Completa 6 km más antes del domingo para ganar un Cold Brew o Iced Matcha gratis en cafés aliados.
                </p>
                <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-[#CCFF00] w-[70%]" />
                </div>
              </div>
            </div>
          )}

          {/* PANTALLA 3: NUTRI-COACH IA */}
          {activeTab === 'coach' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-[#CCFF00]" /> Nutri-Coach IA Panamá
                  </h2>
                  <p className="text-xs text-gray-400">Entrenado con porciones y comida local real</p>
                </div>
              </div>

              {/* Selector de plato de prueba */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'desayuno', label: '🍳 Desayuno con Hojaldra' },
                  { id: 'almuerzo', label: '🐟 Corvina y Tajadas' },
                  { id: 'bowl', label: '🥗 Poke Bowl Salmón' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMeal(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      selectedMeal === item.id 
                        ? 'bg-[#CCFF00] text-black' 
                        : 'bg-white/5 text-gray-300 border border-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Tarjeta de Análisis de Comida */}
              <div className="relative rounded-3xl bg-[#151821] border border-white/10 p-5 space-y-4 overflow-hidden">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#CCFF00] tracking-wider">Plato Detectado</span>
                    <h3 className="font-bold text-base mt-0.5">{currentMeal.name}</h3>
                  </div>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap">
                    {currentMeal.calories} kcal
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-400">Proteína</div>
                    <div className="font-extrabold text-sm text-[#CCFF00]">{currentMeal.protein}g</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-400">Carbos</div>
                    <div className="font-extrabold text-sm text-cyan-400">{currentMeal.carbs}g</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-gray-400">Grasas</div>
                    <div className="font-extrabold text-sm text-[#FF5A36]">{currentMeal.fats}g</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#CCFF00]/10 border border-[#CCFF00]/25 text-xs text-gray-200 leading-relaxed">
                  <strong className="text-[#CCFF00] block mb-1">Veredicto del Coach:</strong>
                  {currentMeal.feedback}
                </div>

                <button
                  onClick={handleLogMeal}
                  className="w-full py-3.5 rounded-2xl bg-[#CCFF00] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition"
                >
                  {mealLogged ? (
                    <>
                      <Check className="w-4 h-4" /> ¡Comida sumada a tu día (+50 pts)!
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Agregar Comida a mi Registro de Hoy
                    </>
                  )}
                </button>

                {/* Muro de Conversión (Paywall con Yappy) */}
                {simulatePaywall && !isPro && (
                  <div className="absolute inset-0 bg-[#0A0B0E]/90 backdrop-blur-md p-6 flex flex-col justify-center items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#CCFF00]/20 border border-[#CCFF00] flex items-center justify-center text-[#CCFF00]">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-extrabold">Alcanzaste tus 10 escaneos gratis</h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Desbloquea escaneos ilimitados de comida local con IA + descuentos VIP directos en comercios sin gastar tus puntos.
                    </p>
                    <button
                      onClick={() => {
                        setPaymentMethod('yappy');
                        setIsPro(true);
                        setSimulatePaywall(false);
                      }}
                      className="w-full py-3.5 rounded-2xl bg-[#00A8E8] text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition"
                    >
                      Pagar $7.99/mes con Yappy →
                    </button>
                    <button
                      onClick={() => {
                        setPaymentMethod('card');
                        setIsPro(true);
                        setSimulatePaywall(false);
                      }}
                      className="w-full py-3 rounded-2xl bg-white/10 text-white font-bold text-xs hover:bg-white/15 transition"
                    >
                      Pagar con tarjeta (cobro automático)
                    </button>
                    <button onClick={() => setActiveTab('profile')} className="text-[11px] text-gray-400 underline">
                      Ver detalles del plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PANTALLA 4: CLUB & BENEFICIOS */}
          {activeTab === 'club' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-extrabold">Club & Beneficios Aliados</h2>
                <p className="text-xs text-gray-400">Canjea tus puntos o usa tu pase PRO VIP directo en caja</p>
                <p className="text-[11px] text-gray-500 mt-1">Comercios de demostración. Los beneficios reales se acuerdan con cada aliado.</p>
              </div>

              {[
                {
                  brand: 'Tostadero Bahía (demo)',
                  category: 'Specialty Coffee • Brunch',
                  freePerk: '10% OFF en tu cuenta (400 pts)',
                  proPerk: '15% OFF directo, sin gastar puntos',
                  pointsCost: 400
                },
                {
                  brand: 'Fisio Costa Lab (demo)',
                  category: 'Fisioterapia & Descarga Muscular',
                  freePerk: '$10 OFF en descarga de piernas (600 pts)',
                  proPerk: '15% OFF en una descarga muscular al mes, sin gastar puntos',
                  pointsCost: 600
                },
                {
                  brand: 'Bowl Verde PTY (demo)',
                  category: 'Bowls & Post-Workout',
                  freePerk: 'Upgrade de proteína gratis (350 pts)',
                  proPerk: 'Upgrade de proteína gratis, sin gastar puntos',
                  pointsCost: 350
                }
              ].map((ally, idx) => (
                <div key={idx} className="p-4 rounded-3xl bg-[#151821] border border-white/10 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-semibold">{ally.category}</span>
                      <h3 className="font-bold text-base">{ally.brand}</h3>
                    </div>
                    <button
                      onClick={() => {
                        setActiveCoupon(ally);
                        setQrTimer(180);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs hover:opacity-90 transition"
                    >
                      Canjear
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-gray-300">
                      <span className="font-bold text-gray-400">Plan Gratis:</span> {ally.freePerk}
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00]">
                      <span className="font-extrabold">★ Miembro PRO:</span> {ally.proPerk}
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal de Pase QR en Vivo */}
              {activeCoupon && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-[#14171F] border border-white/15 rounded-3xl p-6 max-w-xs w-full text-center space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#CCFF00] bg-[#CCFF00]/10 px-3 py-1 rounded-full">
                      Pase Activo en Caja
                    </span>
                    <h3 className="text-lg font-extrabold">{activeCoupon.brand}</h3>
                    <div className="bg-white p-4 rounded-2xl inline-block mx-auto">
                      <QrCode className="w-32 h-32 text-black" />
                    </div>
                    <p className="text-xs text-gray-300">
                      {isPro ? activeCoupon.proPerk : activeCoupon.freePerk}
                    </p>
                    <div className="text-xs font-mono text-[#FF5A36]">
                      Expira en {formatTime(qrTimer)}
                    </div>
                    <button
                      onClick={() => setActiveCoupon(null)}
                      className="w-full py-2.5 rounded-xl bg-white/10 text-xs font-bold hover:bg-white/15"
                    >
                      Cerrar Pase
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PANTALLA 6: PERFIL Y SUSCRIPCIÓN */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold leading-tight">Atleta Demo</h2>
                  <p className="text-xs text-gray-400">Running / Fondo • {points} pts</p>
                </div>
              </div>

              {/* Plan actual */}
              {isPro ? (
                <div className="p-5 rounded-3xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CCFF00]">Plan actual</span>
                    <span className="text-xs font-extrabold text-[#CCFF00]">★ PRO</span>
                  </div>
                  <div className="text-2xl font-black">$7.99 <span className="text-sm font-normal text-gray-400">/ mes</span></div>
                  <p className="text-xs text-gray-300">
                    {paymentMethod === 'card'
                      ? `Próximo cobro automático: ${nextCharge}.`
                      : `Te enviaremos el enlace de Yappy antes del ${nextCharge}.`}
                  </p>
                </div>
              ) : (
                <div className="p-5 rounded-3xl bg-[#151821] border border-white/10 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Plan actual</span>
                    <span className="text-xs font-bold text-gray-300">Gratis</span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Escaneos IA este mes</span>
                      <span className="font-bold">7 / 10</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#CCFF00] w-[70%]" />
                    </div>
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5">
                    <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" /> Escaneos ilimitados de comida panameña</li>
                    <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" /> Calorías ajustadas a tu entreno del día</li>
                    <li className="flex gap-2"><Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" /> Descuentos directos en aliados sin gastar puntos</li>
                  </ul>
                  <button
                    onClick={() => setIsPro(true)}
                    className="w-full py-3.5 rounded-2xl bg-[#CCFF00] text-black font-extrabold text-xs hover:opacity-95 transition"
                  >
                    Pasar a PRO por $7.99/mes
                  </button>
                </div>
              )}

              {/* Método de pago */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Método de pago</span>
                {[
                  { id: 'card', title: 'Tarjeta', desc: 'Cobro automático cada mes. Cancela cuando quieras.', icon: CreditCard },
                  { id: 'yappy', title: 'Yappy', desc: 'Pago mensual con recordatorio y enlace de Yappy.', icon: Smartphone }
                ].map((pm) => {
                  const Icon = pm.icon;
                  const on = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition ${on ? 'bg-[#CCFF00]/10 border-[#CCFF00]/50' : 'bg-white/5 border-white/10'}`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${on ? 'text-[#CCFF00]' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <div className="font-bold text-sm">{pm.title}</div>
                        <div className="text-[11px] text-gray-400">{pm.desc}</div>
                      </div>
                      {on && <CheckCircle2 className="w-5 h-5 text-[#CCFF00]" />}
                    </button>
                  );
                })}
              </div>

              {/* Conexiones */}
              <div className="p-4 rounded-2xl bg-[#151821] border border-white/10 space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Conexiones</span>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold">Strava</span>
                  <span className="text-xs font-bold text-[#CCFF00] flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Conectado</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-400">Apple Health</span>
                  <span className="text-xs text-gray-500">Próximamente (app iOS)</span>
                </div>
              </div>

              {/* Metas */}
              <div className="p-4 rounded-2xl bg-[#151821] border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Metas de hoy</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-black/30 p-2.5 rounded-xl">Calorías <b className="block text-sm">{macros.calories.target} kcal</b></div>
                  <div className="bg-black/30 p-2.5 rounded-xl">Proteína <b className="block text-sm">{macros.protein.target} g</b></div>
                </div>
                <p className="text-[11px] text-gray-500">Se recalculan con el entreno que sincronizas cada día.</p>
              </div>

              {/* Notificaciones */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-gray-300">
                <Bell className="w-4 h-4 text-gray-400" /> Recordatorio de registrar comidas: 12:30 y 19:30
              </div>

              {/* Cancelar */}
              {isPro && (
                confirmCancel ? (
                  <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 space-y-3 text-xs">
                    <p className="text-gray-200">Perderás los escaneos ilimitados y los descuentos directos al final del periodo pagado.</p>
                    <div className="flex gap-2">
                      <button onClick={() => { setIsPro(false); setConfirmCancel(false); }} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold">Sí, cancelar</button>
                      <button onClick={() => setConfirmCancel(false)} className="flex-1 py-2.5 rounded-xl bg-white/10 font-bold">Mantener PRO</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setConfirmCancel(true)} className="w-full text-xs text-gray-500 underline py-2">
                    Cancelar suscripción
                  </button>
                )
              )}
            </div>
          )}

          {/* PANTALLA 5: GENERADOR DE STORIES */}
          {activeTab === 'stories' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-extrabold">Share Card para Instagram</h2>
                <p className="text-xs text-gray-400">Comparte tu entreno + macros cumplidos con un toque</p>
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'dark', label: 'Editorial Dark' },
                  { id: 'volt', label: 'Volt Runner' },
                  { id: 'glass', label: 'Sticker Transparente' }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStoryStyle(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      storyStyle === st.id ? 'bg-[#CCFF00] text-black' : 'bg-white/5 text-gray-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Vista previa de la Story Card */}
              <div className={`p-6 rounded-3xl border aspect-[4/5] flex flex-col justify-between transition ${
                storyStyle === 'volt' 
                  ? 'bg-[#CCFF00] text-black border-black' 
                  : storyStyle === 'glass'
                  ? 'bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-white/30 text-white'
                  : 'bg-[#090A0D] border-white/15 text-white'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black tracking-tighter">KINETIC PTY</span>
                  <span className="text-[10px] font-bold uppercase opacity-75">Cinta Costera • Panamá</span>
                </div>

                <div className="space-y-4 my-auto">
                  <div>
                    <div className="text-xs uppercase opacity-70 font-semibold">Distancia de Hoy</div>
                    <div className="text-5xl font-black tracking-tight">8.02 KM</div>
                    <div className="text-xs font-medium opacity-80 mt-1">Ritmo: 5:45 /km • 620 kcal</div>
                  </div>

                  <div className="pt-4 border-t border-current/15 grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[10px] opacity-70">Proteína</div>
                      <div className="text-lg font-black">{macros.protein.current}g</div>
                    </div>
                    <div>
                      <div className="text-[10px] opacity-70">Carbos</div>
                      <div className="text-lg font-black">{macros.carbs.current}g</div>
                    </div>
                    <div>
                      <div className="text-[10px] opacity-70">Racha</div>
                      <div className="text-lg font-black">12 Días</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold opacity-75">
                  <span>ENTRENAMIENTO + NUTRICIÓN IA</span>
                  <span>@kinetic.pty</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Barra de Navegación Inferior */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0F1117]/95 backdrop-blur-md border-t border-white/10 px-6 py-3 flex justify-between items-center">
          {[
            { id: 'home', label: 'Hoy', icon: Activity },
            { id: 'coach', label: 'Coach IA', icon: Camera },
            { id: 'club', label: 'Club VIP', icon: Trophy },
            { id: 'stories', label: 'Stories', icon: Share2 },
            { id: 'profile', label: 'Perfil', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition ${
                  active ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold">{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
