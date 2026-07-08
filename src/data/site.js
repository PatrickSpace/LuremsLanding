import {
  Brain,
  CalendarCheck,
  Clock,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-vue-next";

export const navLinks = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#para-psicologos", label: "Para psicólogos" },
  { href: "/#preguntas", label: "Preguntas" },
];

export const steps = [
  {
    number: "01",
    title: "Comparte tu situación",
    description:
      "Responde una guía breve sobre tus necesidades, preferencias y objetivos terapéuticos.",
  },
  {
    number: "02",
    title: "Ordena tu búsqueda",
    description:
      "Lurems organiza tus respuestas y te ayuda a identificar opciones adecuadas.",
  },
  {
    number: "03",
    title: "Conecta y continúa",
    description:
      "Elige un profesional, agenda tu sesión y conserva contexto durante tu recorrido.",
  },
];

export const benefits = [
  {
    icon: Brain,
    title: "Orientación clara",
    description:
      "Te ayudamos a comprender lo que estás buscando antes de elegir un psicólogo.",
  },
  {
    icon: Shield,
    title: "Profesionales verificados",
    description:
      "Los perfiles publicados pasan por un proceso de validación antes de estar disponibles.",
  },
  {
    icon: Clock,
    title: "Proceso organizado",
    description:
      "Agenda, sesiones y próximos pasos en una experiencia simple y fácil de seguir.",
  },
  {
    icon: Star,
    title: "Continuidad",
    description:
      "Mantén claridad antes y después de cada sesión para no sentirte a la deriva.",
  },
];

export const psychologistBenefits = [
  {
    icon: Users,
    text: "Conecta con nuevos pacientes alineadas a tu perfil clínico",
  },
  { icon: CalendarCheck, text: "Gestiona tu agenda desde un solo lugar" },
  { icon: Shield, text: "Construye presencia en una plataforma verificada" },
  {
    icon: TrendingUp,
    text: "Accede a herramientas potenciadas con IA para analizar tus casos",
  },
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
    answer:
      "No. Lurems ofrece orientación y organización para tu proceso, pero no realiza diagnósticos ni sustituye la atención profesional.",
  },
  {
    question: "¿Los psicólogos están verificados?",
    answer:
      "Sí. Cada psicólogo pasa por verificación de título universitario, cédula profesional, experiencia clínica y referencias.",
  },
  {
    question: "¿Cuánto cuesta el servicio?",
    answer:
      "Actualmente estamos en fase de acceso temprano. Al lanzar, cada profesional mostrará sus condiciones de forma transparente.",
  },
  {
    question: "¿Cómo usan mi información?",
    answer:
      "Tu información se utiliza para ofrecer una experiencia más relevante y segura, siempre con foco en privacidad y claridad.",
  },
];
