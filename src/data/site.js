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
    title: "Registra lo importante",
    description:
      "Guarda ideas y preguntas que surjan entre sesiones.",
  },
  {
    icon: Shield,
    title: "Consulta tus recursos",
    description:
      "Revisa los materiales compartidos por tu psicólogo.",
  },
  {
    icon: Clock,
    title: "Avanza a tu ritmo",
    description:
      "Tu proceso puede incluir pausas y cambios.",
  },
  {
    icon: Star,
    title: "Lleva tu diario emocional",
    description:
      "Registra cómo te sientes y qué sucede en tu día a día.",
  },
];

export const psychologistBenefits = [
  {
    icon: Users,
    text: "Hacer visible tu práctica",
  },
  { icon: CalendarCheck, text: "Reunir las tareas del día a día" },
  { icon: Shield, text: "Llegar a cada sesión con el contexto a mano" },
  {
    icon: TrendingUp,
    text: "Estas herramientas forman parte de la propuesta en desarrollo y todavía no están disponibles.",
  },
];

export const faqs = [
  {
    "question": "¿Cómo me ayudará Lurems a encontrar un psicólogo?",
    "answer": "Lurems está pensado para conocer lo que buscas y tus preferencias, y recomendarte opciones de profesionales. Así podrás comparar con más información antes de elegir."
  },
  {
    "question": "¿Yo elijo con qué psicólogo atenderme?",
    "answer": "Sí. Las recomendaciones servirán como orientación; tú decidirás con qué profesional quieres iniciar tu proceso."
  },
  {
    "question": "¿La inteligencia artificial reemplaza al psicólogo?",
    "answer": "No. Su función será apoyar la orientación y la organización de información. La atención, el criterio clínico y las decisiones terapéuticas corresponden al profesional."
  },
  {
    "question": "¿Cuánto costarán las sesiones?",
    "answer": "Cada terapeuta tendrá su propia tarifa, por lo que el precio de las sesiones variará según el profesional que elijas."
  },
  {
    "question": "¿Apuntarme es gratis?",
    "answer": "Sí. Registrarte en la lista de acceso temprano es gratuito y no te compromete a contratar ningún servicio. Los precios de la plataforma se comunicarán antes de habilitarla."
  },
  {
    "question": "¿Qué información tengo que compartir al registrarme?",
    "answer": "Solo tu nombre, correo y si te interesa como paciente o psicólogo. Si eres psicólogo, también te pedimos tu perfil profesional. En este registro no solicitamos información clínica."
  },
  {
    "question": "¿Qué ocurre después de apuntarme?",
    "answer": "Te incorporamos a la lista para contactarte cuando abramos el acceso. El registro no crea una cuenta en la plataforma ni reserva una sesión."
  }
];
