import {
  Brain,
  CalendarCheck,
  CheckCircle,
  Clock,
  HeartHandshake,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-vue-next";

export const navLinks = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/pacientes", label: "Para pacientes" },
  { href: "/psicologos", label: "Para psicólogos" },
  { href: "/blog", label: "Recursos" },
  { href: "/faq", label: "Preguntas" },
];

export const steps = [
  {
    number: "01",
    title: "Cuéntanos sobre ti",
    description: "Responde una breve evaluación sobre tus necesidades, preferencias y objetivos terapéuticos.",
  },
  {
    number: "02",
    title: "Recibe orientación",
    description: "Lurems organiza tus necesidades y te ayuda a identificar opciones adecuadas.",
  },
  {
    number: "03",
    title: "Conecta y continúa",
    description: "Elige un profesional, agenda tu sesión y mantén claridad durante tu recorrido.",
  },
];

export const benefits = [
  {
    icon: Brain,
    title: "Orientación clara",
    description: "Te ayudamos a comprender lo que estás buscando antes de elegir un psicólogo.",
  },
  {
    icon: Shield,
    title: "Profesionales verificados",
    description: "Los perfiles publicados pasan por un proceso de validación antes de estar disponibles.",
  },
  {
    icon: Clock,
    title: "Proceso organizado",
    description: "Agenda, sesiones y próximos pasos en una experiencia simple y fácil de seguir.",
  },
  {
    icon: Star,
    title: "Continuidad",
    description: "Mantén claridad antes y después de cada sesión para no sentirte a la deriva.",
  },
];

export const psychologistBenefits = [
  { icon: TrendingUp, text: "Aumenta tus ingresos hasta un 40% más al mes" },
  { icon: Users, text: "Recibe pacientes pre-compatibilizados con tu perfil" },
  { icon: CalendarCheck, text: "Gestiona tu agenda desde un solo lugar" },
  { icon: Shield, text: "Plataforma segura y profesional" },
];

export const testimonials = [
  {
    name: "Usuario en validación",
    location: "Latinoamérica",
    role: "Paciente",
    text: "Me ayudó a ordenar lo que estaba buscando antes de contactar a un profesional.",
  },
  {
    name: "Usuario en validación",
    location: "Latinoamérica",
    role: "Paciente",
    text: "La experiencia se sintió clara, tranquila y menos abrumadora que buscar por mi cuenta.",
  },
  {
    name: "Profesional en validación",
    location: "Latinoamérica",
    role: "Psicóloga",
    text: "La propuesta cuida el inicio del vínculo terapéutico y ayuda a que la persona llegue con más contexto.",
  },
  {
    name: "Usuario en validación",
    location: "Latinoamérica",
    role: "Paciente",
    text: "Sentí que había un siguiente paso concreto, no solo una lista interminable de perfiles.",
  },
];

export const faqs = [
  {
    question: "¿Lurems reemplaza a un psicólogo?",
    answer: "No. Lurems ofrece orientación y organización para tu proceso, pero no realiza diagnósticos ni sustituye la atención profesional.",
  },
  {
    question: "¿Los psicólogos están verificados?",
    answer: "Sí. Cada psicólogo pasa por verificación de título universitario, cédula profesional, experiencia clínica y referencias.",
  },
  {
    question: "¿Cuánto cuesta el servicio?",
    answer: "Actualmente estamos en fase de acceso temprano. Al lanzar, cada profesional mostrará sus condiciones de forma transparente.",
  },
  {
    question: "¿Cómo usan mi información?",
    answer: "Tu información se utiliza para ofrecer una experiencia más relevante y segura, siempre con foco en privacidad y claridad.",
  },
];

export const pages = {
  "/como-funciona": {
    eyebrow: "Proceso",
    title: "Cómo funciona Lurems",
    description: "Un flujo claro para pasar de búsqueda confusa a una primera sesión con sentido.",
    sections: [
      {
        title: "Evaluación inicial",
        body: "Recogemos tus necesidades, preferencias, horarios y objetivos para entender qué tipo de acompañamiento necesitas.",
        icon: Sparkles,
      },
      {
        title: "Compatibilidad inteligente",
        body: "La plataforma cruza tu perfil con especialidades, experiencia, disponibilidad y estilo terapéutico.",
        icon: Brain,
      },
      {
        title: "Conexión y seguimiento",
        body: "Agendas una primera sesión y mantienes un camino más organizado antes y después de cada encuentro.",
        icon: HeartHandshake,
      },
    ],
  },
  "/pacientes": {
    eyebrow: "Para pacientes",
    title: "Encuentra apoyo sin perder semanas buscando",
    description: "Lurems está pensado para personas que quieren empezar terapia con confianza, claridad y menos fricción.",
    sections: [
      { title: "Menos incertidumbre", body: "Te mostramos profesionales compatibles con tus objetivos y preferencias.", icon: Shield },
      { title: "Atención más rápida", body: "Priorizamos disponibilidad real para que puedas iniciar pronto.", icon: Zap },
      { title: "Mejor primer encuentro", body: "Llegas a sesión con más claridad sobre lo que necesitas compartir.", icon: CheckCircle },
    ],
  },
  "/psicologos": {
    eyebrow: "Para psicólogos",
    title: "Conecta con pacientes que sí encajan con tu práctica",
    description: "Una forma más eficiente de crecer tu agenda sin depender solo de publicidad o referidos.",
    sections: [
      { title: "Pacientes compatibles", body: "Recibe solicitudes alineadas con tu especialidad y estilo terapéutico.", icon: Users },
      { title: "Agenda más estable", body: "Optimiza disponibilidad y reduce sesiones exploratorias que no prosperan.", icon: CalendarCheck },
      { title: "Presencia profesional", body: "Muestra credenciales, enfoque y experiencia en una plataforma verificada.", icon: Star },
    ],
  },
  "/faq": {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes",
    description: "Las dudas clave antes de comenzar tu camino con Lurems.",
    faqs,
  },
  "/blog": {
    eyebrow: "Blog",
    title: "Ideas sobre salud mental, terapia y continuidad",
    description: "Pronto publicaremos guías para pacientes y psicólogos en Latinoamérica.",
    sections: [
      { title: "Cómo elegir psicólogo", body: "Señales útiles para tomar una decisión informada.", icon: Brain },
      { title: "Primera sesión", body: "Qué esperar y cómo prepararte para aprovecharla mejor.", icon: HeartHandshake },
      { title: "Tecnología responsable", body: "Cómo usamos tecnología como apoyo, no como reemplazo clínico.", icon: Shield },
    ],
  },
  "/sobre-nosotros": {
    eyebrow: "Nosotros",
    title: "Construimos tecnología para mejorar el acceso a terapia",
    description: "Lurems nace para reducir la incertidumbre entre necesitar ayuda, encontrar orientación y sostener el proceso.",
    sections: [
      { title: "Misión", body: "Hacer que encontrar acompañamiento psicológico sea más humano, claro y accesible.", icon: HeartHandshake },
      { title: "Enfoque", body: "Combinamos criterio clínico, datos y diseño cuidadoso.", icon: Brain },
      { title: "Región", body: "Pensado para las necesidades reales de Latinoamérica.", icon: Users },
    ],
  },
  "/contacto": {
    eyebrow: "Contacto",
    title: "Hablemos",
    description: "Para alianzas, prensa o soporte, escríbenos a hola@lurems.com.",
    sections: [
      { title: "Pacientes", body: "Registra tu interés y recibe novedades del acceso temprano.", icon: Users },
      { title: "Psicólogos", body: "Cuéntanos sobre tu práctica para sumarte al directorio verificado.", icon: Shield },
      { title: "Aliados", body: "Buscamos organizaciones que compartan nuestra visión.", icon: Sparkles },
    ],
  },
  "/privacidad": {
    eyebrow: "Legal",
    title: "Política de privacidad",
    description: "Tratamos los datos con cuidado y solo usamos la información necesaria para ofrecer orientación, seguridad y continuidad.",
    sections: [
      { title: "Datos", body: "Recolectamos datos básicos de contacto y preferencias de usuario.", icon: Shield },
      { title: "Uso", body: "Usamos la información para comunicar novedades, validar perfiles y mejorar el servicio.", icon: CheckCircle },
      { title: "Control", body: "Puedes solicitar actualización o eliminación de tus datos escribiendo a contacto.", icon: Users },
    ],
  },
  "/terminos": {
    eyebrow: "Legal",
    title: "Términos y condiciones",
    description: "Lurems está en fase de acceso temprano. La plataforma no reemplaza atención de emergencia ni diagnóstico clínico.",
    sections: [
      { title: "Uso", body: "El servicio ayuda a conectar usuarios con profesionales verificados.", icon: CheckCircle },
      { title: "Limitaciones", body: "La tecnología apoya la orientación, pero no ofrece diagnóstico ni tratamiento.", icon: Brain },
      { title: "Emergencias", body: "En crisis o riesgo inmediato, contacta servicios de emergencia de tu país.", icon: Shield },
    ],
  },
};
