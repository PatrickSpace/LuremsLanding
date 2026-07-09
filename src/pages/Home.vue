<script setup>
import { ref } from "vue";
import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Heart,
  HeartHandshake,
  LibraryBig,
  Lightbulb,
  Search,
  Shield,
  UserRoundPlus,
  UserRound,
  Users,
} from "lucide-vue-next";
import WaitlistForm from "../components/WaitlistForm.vue";
import {
  benefits,
  faqs,
  psychologistBenefits,
  testimonials,
} from "../data/site.js";

const emit = defineEmits(["open-waitlist"]);
const openFaq = ref(null);

function scrollToWaitlist() {
  document
    .getElementById("waitlist-section")
    ?.scrollIntoView({ behavior: "smooth" });
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const heroPaths = [
  {
    icon: UserRound,
    title: "Para pacientes",
    description:
      "Encuentra al mejor profesional para tí, organiza tus citas, registra tus emociones y conserva lo aprendido para dar continuidad a tu terapia.",
    href: "/#waitlist-section",
    tone: "patient",
  },
  {
    icon: Users,
    title: "Para psicólogos",
    description:
      "Recibe pacientes acorde a tu especialidad, gestiona tu agenda, despreocupate de la cobranza y accede a herramientas que reducen tareas administrativas.",
    href: "/#para-psicologos",
    tone: "psychologist",
  },
];

const heroSignals = [
  { icon: Shield, text: "Mantenemos la privacidad de tus datos" },
  { icon: Users, text: "Profesionales verificados" },
  { icon: HeartHandshake, text: "    Acompañamiento entre sesiones" },
];

const solutionCards = [
  {
    icon: Search,
    eyebrow: "El momento",
    title: "Sabes que necesitas ayuda, pero no por dónde empezar",
    description:
      "Especialidades, enfoques, precios y horarios aparecen dispersos justo cuando más necesitas claridad.",
  },
  {
    icon: ClipboardList,
    eyebrow: "El puente",
    title: "Lurems convierte la búsqueda en una ruta guiada",
    description:
      "Preguntas simples ayudan a ordenar tu necesidad, tus preferencias y el tipo de acompañamiento que puede tener sentido.",
  },
  {
    icon: HeartHandshake,
    eyebrow: "El resultado",
    title: "Llegas al primer contacto con más contexto",
    description:
      "Conecta con profesionales adecuados y conserva información relevante para avanzar sin repetir todo desde cero.",
  },
];

const flowSteps = [
  {
    icon: ClipboardList,
    title: "Comparte tu situación",
    description:
      "Cuéntanos qué estás viviendo, qué buscas y qué límites necesitas cuidar.",
  },
  {
    icon: Search,
    title: "Entiende tu mejor ruta",
    description:
      "Organizamos tus respuestas para que la elección no dependa solo de intuición.",
  },
  {
    icon: CalendarDays,
    title: "Conecta con opciones compatibles",
    description:
      "Revisa profesionales verificados, disponibilidad y señales relevantes para decidir.",
  },
  {
    icon: HeartHandshake,
    title: "Sostén el proceso",
    description:
      "Conserva claridad antes y después de cada encuentro para no volver al punto cero.",
  },
];

const reassuranceItems = [
  "Registro gratuito para recibir acceso temprano",
  "Lurems no reemplaza atención psicológica ni servicios de emergencia",
  "Usaremos tus datos para contactarte y mejorar la experiencia inicial",
];

const platformFeatureCards = [
  {
    icon: UserRoundPlus,
    title: "Nuevos pacientes ",
    description:
      "No dependas del boca a boca, registraté en Lurems y recibe nuevos pacientes alineadas con tu práctica.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda y próximos pasos",
    description:
      "Centraliza citas, recordatorios y acciones para organizar tus sesiones de tereapia",
  },
  {
    icon: LibraryBig,
    title: "Herramientas psicologicas",
    description:
      "Convierte las herramientas que le brindas a tus pacientes en un recurso al que pueden acceder cuando lo necesiten.",
  },
  {
    icon: CreditCard,
    title: "Cobranzas automáticas",
    description:
      "Olvidate de las cobranzas, deja que Lurems lo haga. Accede a resumen de ingresos y reportes financieros",
  },
  {
    icon: BrainCircuit,
    title: "Historia clinica inteligente",
    description:
      "Accede a resumenes, detecta patrones conductuales y organiza la información de tus pacientes para dar continuidad a tu trabajo.",
  },
  {
    icon: ClipboardCheck,
    title: "Contexto previo a la sesión",
    description:
      "Antes de cada sesión, recibe información organizada, resumida antes del encuentro.",
  },
];
</script>

<template>
  <div class="overflow-x-hidden">
    <section
      class="relative z-10 hero-gradient pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden"
    >
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute left-[8%] top-[18%] h-56 w-56 rounded-full bg-hope/12 blur-3xl"
        />
        <div
          class="absolute right-[10%] top-[8%] h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:min-h-[640px]"
        >
          <div class="max-w-xl text-center lg:text-left animate-reveal-up">
            <div
              class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-primary/15 text-primary text-sm font-semibold mb-7 shadow-sm"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"
                />
                <span
                  class="relative inline-flex h-2 w-2 rounded-full bg-primary"
                />
              </span>
              Lurems: La plataforma que te acompaña cuando necesitas ayuda
            </div>

            <h1
              class="text-4xl sm:text-5xl xl:text-[3.45rem] font-bold text-foreground leading-[1.06] tracking-tight mb-6 [overflow-wrap:break-word]"
            >
              Tu proceso terapéutico,
              <span class="gradient-text">más claro y conectado</span>
            </h1>

            <p
              class="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-9 max-w-xl mx-auto lg:mx-0"
            >
              Lurems te ayuda a organizar tu terapia psicológica, registrar lo
              que sientes, conservar tus aprendizajes y mantener continuidad con
              tu psicólogo dentro y fuera de cada sesión.
            </p>

            <div
              class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
            >
              <button
                class="group inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-4 rounded-full transition-all duration-300 text-base shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5"
                @click="scrollToWaitlist"
              >
                Solicitar acceso temprano
                <ArrowRight
                  :size="18"
                  class="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <RouterLink
                to="/#como-funciona"
                class="group inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap bg-white/75 hover:bg-white backdrop-blur-sm text-foreground font-semibold px-7 py-4 rounded-full border border-border hover:border-primary/30 transition-all duration-300 text-base hover:-translate-y-0.5"
              >
                Ver cómo funciona
              </RouterLink>
            </div>

            <div class="grid gap-2.5 sm:grid-cols-3 lg:max-w-2xl">
              <div
                v-for="signal in heroSignals"
                :key="signal.text"
                class="flex items-center justify-center lg:justify-start gap-2 rounded-full border border-border/70 bg-white/65 px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm"
              >
                <component
                  :is="signal.icon"
                  :size="24"
                  class="h-[18px] w-[18px] text-primary sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px]"
                />
                <span>{{ signal.text }}</span>
              </div>
            </div>
          </div>

          <div class="relative animate-reveal-up animate-reveal-delay">
            <div
              class="relative overflow-hidden rounded-[8px] border border-white/80 bg-white shadow-2xl shadow-primary/10"
            >
              <img
                src="/brand/lurems-hero-illustration.png"
                alt="Camino terapéutico guiado por un faro"
                class="h-[280px] w-full object-cover object-center sm:h-[360px] lg:h-[510px]"
                loading="eager"
              />
            </div>
            <div
              class="absolute -right-5 -top-5 hidden rounded-[8px] border border-secondary/15 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-lg lg:flex lg:items-center lg:gap-2"
            >
              <Lightbulb :size="17" class="text-secondary" />
              Claridad en tu camino terapéutico
            </div>
          </div>
        </div>

        <div class="relative z-30 mt-10">
          <div
            class="grid grid-cols-1 md:grid-cols-2 bg-white/92 backdrop-blur-xl rounded-[8px] border border-border shadow-lg overflow-hidden"
          >
            <RouterLink
              v-for="path in heroPaths"
              :key="path.title"
              :to="path.href"
              class="group flex items-center gap-4 p-5 sm:p-6 md:p-7 hover:bg-primary/5 transition-colors"
            >
              <div
                class="h-14 w-16 rounded-[8px] flex flex-shrink-0 items-center justify-center border sm:h-16 sm:w-20"
                :class="
                  path.tone === 'patient'
                    ? 'bg-primary/8 border-primary/12 text-primary'
                    : 'bg-secondary/10 border-secondary/15 text-secondary'
                "
              >
                <component
                  :is="path.icon"
                  :size="32"
                  class="h-7 w-7 sm:h-8 sm:w-8"
                />
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-foreground mb-1">
                  {{ path.title }}
                </h3>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  {{ path.description }}
                </p>
              </div>
              <span
                class="ml-auto hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:flex"
              >
                <ArrowRight :size="16" />
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-0 py-20 lg:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 mx-auto max-w-5xl text-center">
          <div class="mb-6">
            <span
              class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
              >Problema / solución</span
            >
            <h2
              class="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
            >
              Cuando pedir ayuda ya cuesta, elegir no debería sentirse imposible
            </h2>
          </div>
          <p
            class="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed"
          >
            Lurems acompaña el tramo más frágil del proceso: entender qué
            necesitas, reconocer buenas señales y dar un primer paso con más
            confianza.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="card in solutionCards"
            :key="card.title"
            class="group rounded-[8px] border border-card-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg"
          >
            <div
              class="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-primary/10 bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white"
            >
              <component :is="card.icon" :size="21" />
            </div>
            <p
              class="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary"
            >
              {{ card.eyebrow }}
            </p>
            <h3 class="mb-3 text-lg font-semibold text-foreground">
              {{ card.title }}
            </h3>
            <p class="text-sm leading-relaxed text-muted-foreground">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="como-funciona"
      class="relative z-0 scroll-mt-24 py-24 bg-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span
            class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
            >Cómo funciona</span
          >
          <h2
            class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            Del ruido al primer paso concreto
          </h2>
          <p
            class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Un recorrido simple para transformar una búsqueda incierta en una
            decisión más informada.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div
            class="hidden md:block absolute top-14 left-[12%] right-[12%] border-t border-dashed border-primary/25"
          />
          <div
            v-for="(step, index) in flowSteps"
            :key="step.title"
            class="relative text-center group"
          >
            <div
              class="relative z-10 w-24 h-24 rounded-[8px] bg-background border border-border flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1"
              :class="
                index < 2
                  ? 'group-hover:border-primary/30'
                  : 'group-hover:border-secondary/30'
              "
            >
              <component
                :is="step.icon"
                :size="38"
                :class="index < 2 ? 'text-primary' : 'text-secondary'"
              />
            </div>
            <span
              class="inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold text-white mb-3"
              :class="index < 2 ? 'bg-primary' : 'bg-secondary'"
            >
              {{ index + 1 }}
            </span>
            <h3 class="text-base font-semibold text-foreground mb-3">
              {{ step.title }}
            </h3>
            <p
              class="text-muted-foreground text-sm leading-relaxed max-w-[15rem] mx-auto"
            >
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-muted/30 section-glow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 lg:mb-20">
          <span
            class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
            >Por qué Lurems</span
          >
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            No es otro directorio de Psicólogos
          </h2>
          <p
            class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Lurems está pensado para que la persona llegue mejor preparada y el
            profesional reciba más contexto desde el primer contacto.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="group relative bg-card rounded-[8px] p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div
              class="w-12 h-12 rounded-[8px] bg-primary/8 border border-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-500"
            >
              <component :is="benefit.icon" :size="22" class="text-primary" />
            </div>
            <h3 class="font-semibold text-foreground text-lg mb-2">
              {{ benefit.title }}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="para-psicologos"
      class="scroll-mt-24 py-24 lg:py-28 bg-background"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span
              class="inline-block text-secondary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
              >Para psicólogos</span
            >
            <h2
              class="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-2 mb-7 leading-tight tracking-tight"
            >
              La herramienta clave para los psicologos independientes
            </h2>
            <p
              class="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg"
            >
              Lurems ayuda a los psicólogos a captar pacientes, gestionar su
              agenda y organizar el seguimiento, reduciendo tareas operativas
              con IA para que puedan centrarse en lo importante: Sus pacientes.
            </p>
            <ul class="space-y-5 mb-10">
              <li
                v-for="item in psychologistBenefits"
                :key="item.text"
                class="flex items-start gap-4"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-secondary/8 border border-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <component
                    :is="item.icon"
                    :size="14"
                    class="text-secondary"
                  />
                </div>
                <span class="text-foreground text-[0.95rem] leading-snug">{{
                  item.text
                }}</span>
              </li>
            </ul>
            <button
              class="group inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/90 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm"
              @click="emit('open-waitlist', 'Psicólogo')"
            >
              Quiero sumarme como psicólogo
              <ArrowRight
                :size="16"
                class="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>

          <div class="relative">
            <div
              class="rounded-[8px] bg-gradient-to-br from-secondary/10 via-primary/5 to-background border border-card-border p-5 sm:p-7 shadow-2xl shadow-black/5"
            >
              <div class="mb-6">
                <p
                  class="text-xs font-semibold uppercase tracking-[0.16em] text-secondary"
                >
                  Funcionalidades clave
                </p>
                <h3 class="mt-2 text-2xl font-bold text-foreground">
                  Una app para orientar, conectar y sostener el proceso
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Lurems reúne herramientas pensadas para que pacientes y
                  psicólogos avancen con más claridad desde el primer paso.
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <article
                  v-for="feature in platformFeatureCards"
                  :key="feature.title"
                  class="rounded-[8px] border border-card-border/70 bg-card p-4 shadow-sm"
                >
                  <div
                    class="mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border border-secondary/15 bg-secondary/10 text-secondary"
                  >
                    <component :is="feature.icon" :size="21" />
                  </div>
                  <h4
                    class="text-sm font-semibold leading-snug text-foreground"
                  >
                    {{ feature.title }}
                  </h4>
                  <p class="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {{ feature.description }}
                  </p>
                </article>
              </div>
            </div>
            <div
              class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-muted/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span
            class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
            >Validación</span
          >
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            Lo que estamos validando
          </h2>
          <p
            class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Primeras señales de personas y profesionales que reconocen el mismo
            problema: empezar terapia debería sentirse menos confuso.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name + testimonial.text"
            class="group relative bg-card rounded-[8px] p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
          >
            <div
              class="inline-flex items-center rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-5"
            >
              Feedback de validación
            </div>
            <p class="text-foreground leading-relaxed mb-7 text-[0.95rem]">
              “{{ testimonial.text }}”
            </p>
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10"
              >
                {{ initials(testimonial.name) }}
              </div>
              <div>
                <div class="font-semibold text-sm text-foreground">
                  {{ testimonial.name }}
                </div>
                <div class="text-xs text-muted-foreground">
                  {{ testimonial.role }} · {{ testimonial.location }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="preguntas" class="scroll-mt-24 py-24 lg:py-28 bg-background">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span
            class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3"
            >FAQ</span
          >
          <h2
            class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            Dudas antes de dar el paso
          </h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="bg-card rounded-[8px] border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/15 hover:shadow-sm"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-foreground hover:bg-accent/30 transition-colors"
              @click="openFaq = openFaq === index ? null : index"
            >
              <span class="pr-4 text-[0.95rem]">{{ faq.question }}</span>
              <ChevronDown
                :size="18"
                class="text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-3"
                :class="openFaq === index ? 'rotate-180' : ''"
              />
            </button>
            <div
              v-show="openFaq === index"
              class="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-4"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-background py-16 lg:py-20">
      <div
        class="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8"
      >
        <img
          src="/brand/lurems-logo-principal-transparent.png"
          alt="Lurems, claridad en tu camino terapéutico"
          class="h-48 w-auto object-contain sm:h-56 lg:h-64"
          loading="lazy"
        />
      </div>
    </section>

    <section
      id="waitlist-section"
      class="relative py-24 lg:py-28 overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(135deg,#1A3A38_0%,#2D7F78_52%,#6E63BE_100%)]"
      />
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute -top-24 -right-24 w-96 h-96 bg-white/6 rounded-full blur-3xl"
        />
        <div
          class="absolute -bottom-24 -left-24 w-96 h-96 bg-hope/10 rounded-full blur-3xl"
        />
      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div class="order-2 text-center lg:order-1 lg:text-left">
            <div
              class="w-14 h-14 rounded-[8px] bg-white/10 border border-white/20 flex items-center justify-center mx-auto lg:mx-0 mb-6 backdrop-blur-sm"
            >
              <Heart :size="24" class="text-white" />
            </div>
            <span
              class="inline-block text-white/72 font-semibold text-xs uppercase tracking-[0.2em] mb-3"
              >Acceso temprano</span
            >
            <h2
              class="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight"
            >
              Sé de los primeros en probar Lurems
            </h2>
            <p
              class="text-lg md:text-xl text-white/72 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Déjanos tus datos y te avisaremos cuando abramos cupos para
              pacientes y psicólogos. Acceso temprano, sin compromiso y con
              comunicación clara.
            </p>
            <div class="space-y-3 max-w-xl mx-auto lg:mx-0">
              <div
                v-for="item in reassuranceItems"
                :key="item"
                class="flex items-start gap-3 rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 text-left text-sm text-white/82 backdrop-blur-sm"
              >
                <Shield :size="16" class="mt-0.5 flex-shrink-0 text-white" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div
            class="order-1 rounded-[8px] border border-white/16 bg-white/10 p-5 sm:p-7 shadow-2xl shadow-black/10 backdrop-blur-md lg:order-2"
          >
            <div class="mb-6 text-center lg:text-left">
              <p
                class="text-sm font-semibold uppercase tracking-[0.16em] text-white/60"
              >
                Únete a la lista
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white">
                Reserva tu lugar en la lista
              </h3>
            </div>
            <WaitlistForm variant="dark" origin="home-inline" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
