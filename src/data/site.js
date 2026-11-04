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
      "La propuesta contempla validar los perfiles profesionales antes de publicarlos.",
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
    text: "Conecta con nuevos pacientes alineados a tu perfil clínico",
  },
  { icon: CalendarCheck, text: "Gestiona tu agenda desde un solo lugar" },
  { icon: Shield, text: "Construye presencia en una plataforma verificada" },
  {
    icon: TrendingUp,
    text: "Accede a herramientas potenciadas con IA para analizar tus casos",
  },
];

export const validationGoals = [
  {
    audience: "Para pacientes",
    title: "Una búsqueda más clara",
    description: "Entender qué información ayuda a elegir un profesional de acuerdo con las necesidades, preferencias y posibilidades de cada persona.",
  },
  {
    audience: "Para pacientes",
    title: "Continuidad entre sesiones",
    description: "Explorar cómo los registros emocionales y los recursos terapéuticos pueden ayudar a conservar lo trabajado en terapia.",
  },
  {
    audience: "Para psicólogos",
    title: "Menos carga administrativa",
    description: "Identificar qué tareas de agenda, recordatorios y cobranza conviene simplificar para dedicar más tiempo a la atención.",
  },
  {
    audience: "Para psicólogos",
    title: "Más contexto para cada encuentro",
    description: "Comprender cómo organizar la información relevante de cada paciente para preparar las sesiones y dar seguimiento al proceso.",
  },
];

export const faqs = [
  {
    question: "¿Ya puedo usar Lurems?",
    answer: "Todavía estamos desarrollando la plataforma. Hoy puedes unirte a la lista de acceso temprano para recibir un aviso cuando abramos cupos. La agenda, las cobranzas y las herramientas de seguimiento aún no están disponibles.",
  },
  {
    question: "¿Lurems reemplaza a un psicólogo?",
    answer:
      "No. Lurems ofrece orientación y organización para tu proceso, pero no realiza diagnósticos ni sustituye la atención profesional.",
  },
  {
    question: "¿Los psicólogos están verificados?",
    answer:
      "La plataforma está en desarrollo y aún no ofrece un directorio disponible. Antes de publicar perfiles, contemplamos verificar la formación y la habilitación profesional correspondiente a cada país.",
  },
  {
    question: "¿Cuánto cuesta el servicio?",
    answer:
      "Unirte a la lista de acceso temprano es gratuito. La plataforma aún está en desarrollo; comunicaremos las condiciones y los precios antes de habilitar los servicios.",
  },
  {
    question: "¿Cómo usan mi información?",
    answer:
      "El formulario solicita tu nombre, correo y tipo de usuario; si eliges psicólogo, también tu perfil profesional. Usaremos estos datos para contactarte sobre el acceso temprano y conocer los perfiles interesados.",
  },
];
