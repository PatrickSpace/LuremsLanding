<script setup>
import { ref } from "vue";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Heart,
  HeartHandshake,
  Search,
  Shield,
  UserRound,
  Users,
} from "lucide-vue-next";
import WaitlistForm from "../components/WaitlistForm.vue";
import HeroVideo from "../components/HeroVideo.vue";
import DevelopmentStatusSection from "../components/DevelopmentStatusSection.vue";
import PsychologistsSection from "../components/PsychologistsSection.vue";
import {
  benefits,
  faqs,
} from "../data/site.js";

const emit = defineEmits(["open-waitlist"]);
const openFaq = ref(null);

function scrollToWaitlist() {
  document
    .getElementById("waitlist-section")
    ?.scrollIntoView({ behavior: "smooth" });
}

const heroPaths = [
  {
    icon: UserRound,
    title: "Para pacientes",
    description:
      "Encuentra al profesional adecuado para ti, organiza tus citas, registra tus emociones y conserva lo aprendido para dar continuidad a tu terapia.",
    href: "/#waitlist-section",
    tone: "patient",
  },
  {
    icon: Users,
    title: "Para psicólogos",
    description:
      "Recibe pacientes acordes con tu especialidad, gestiona tu agenda, despreocúpate de la cobranza y accede a herramientas que reducen tareas administrativas.",
    href: "/#para-psicologos",
    tone: "psychologist",
  },
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


</script>

<template>
  <div class="overflow-x-hidden">
    <HeroVideo @request-access="scrollToWaitlist" />
    <section class="relative z-10 bg-background py-10 lg:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative z-30">
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
            Más claridad para elegir y continuar tu terapia
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

    <PsychologistsSection @open-waitlist="emit('open-waitlist', $event)" />

    <DevelopmentStatusSection @open-waitlist="emit('open-waitlist')" />

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
