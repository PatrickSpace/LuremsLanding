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
import PsychologistsSection from "../components/PsychologistsSection.vue";
import DevelopmentStatusSection from "../components/DevelopmentStatusSection.vue";
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
      "Un espacio pensado para acompañar tu búsqueda y la continuidad de tu proceso, a tu ritmo.",
    href: "/#waitlist-section",
    tone: "patient",
  },
  {
    icon: Users,
    title: "Para psicólogos",
    description:
      "Entre preparar sesiones, coordinar horarios y hacer seguimiento a los pagos, hay mucho trabajo alrededor de cada encuentro.",
    href: "/#para-psicologos",
    tone: "psychologist",
  },
];

const solutionCards = [
  {
    icon: Search,
    eyebrow: "Tu búsqueda",
    title: "Habla con nuestra IA (Lurems) para encontrar tu psicolgo ideal",
    description:
      "Tendrás una conversación empatica y podras expresarte con total libertad, sin prejuicios, sin juzgar, todo privado y confidencial.",
  },
  {
    icon: ClipboardList,
    eyebrow: "Tu psicologo ideal",
    title: "Te brindamos opciones de psicolgos de forma personalizada para tí",
    description:
      "Te ayudamos a conocer las mejores terapeutas para tí teniendo en cuenta tu situación y preferencias",
  },
  {
    icon: HeartHandshake,
    eyebrow: "Tus herramientas",
    title: "Visualiza tu avance en la terapia y conserva lo trabajado",
    description:
      "Podrás ver tu avance en terapia y acceder a las herramientas brindadas por tu terapeuta asi como un diario emocional privado para mejorar los resultados en tu terapia.",
  },
];

const flowSteps = [
  {
    icon: ClipboardList,
    title: "Encuentra a tu psicologo ideal",
    description:
      "Nuestra IA Lurems te recomendará a los mejores psicólogos para tí, teniendo en cuenta tu situación y preferencias.",
  },
  {
    icon: Search,
    title: "Agenda tu primera cita",
    description:
      "Tu elegiras el horario que mejor se adapte a tu disponibilidad y podrás agendar tu primera cita con tu psicólogo ideal.",
  },
  {
    icon: CalendarDays,
    title: "Planifica tus siguientes sesiones",
    description:
      "Tendrás acceso a nuestra plataforma de gestión de citas. Podrás planificar tus siguientes sesiones y recibir recordatorios para no perder ninguna cita.",
  },
  {
    icon: HeartHandshake,
    title: "Conservar lo trabajado",
    description:
      "Registra tus aprendizajes en conjunto con tu terapeuta a traves de recursos personalizados y un diario emocional privado para mejorar los resultados en tu terapia.",
  },
];

const reassuranceItems = [
  "Apuntarte es gratuito y no te compromete a contratar ningún servicio.",
  "Apuntarte no crea una cuenta, reserva una sesión ni garantiza un cupo de acceso.",
  "Usaremos estos datos para contactarte sobre el acceso temprano y conocer los perfiles interesados.",
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
              >Para quienes buscan apoyo psicológico</span
            >
            <h2
              class="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight"
            >
              Elegir por dónde empezar también forma parte del camino.
            </h2>
          </div>
          <p
            class="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed"
          >
          Buscar un psicólogo puede traer más preguntas de las que esperabas. Nosotros te ayudamos a encontrar le mejor psicologo para ti.
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
            >El recorrido que estamos diseñando</span
          >
          <h2
            class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            ¿Como va a funcionar Lurems?
          </h2>
          <p
            class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Esta es la experiencia que buscamos construir para cuando Lurems esté disponible.
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

    <section
      id="continuidad"
      aria-labelledby="continuity-title"
      class="continuity-section scroll-mt-24 bg-muted/30 section-glow py-12 lg:py-16"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:items-center">
          <div>
            <p class="continuity-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.16em]">
              La continuidad del proceso
            </p>
            <h2 id="continuity-title" class="text-[28px] md:text-[36px] leading-[1.25] md:leading-[1.2] font-bold text-foreground tracking-tight mb-4">
              Cada proceso tiene su propio ritmo.
            </h2>
            <p class="continuity-description text-base leading-[1.65] max-w-lg">
              Puede haber pausas, cambios y nuevas preguntas. Queremos que puedas conservar lo trabajado y retomarlo cuando lo necesites.
            </p>
            <a href="#waitlist-section" class="continuity-cta mt-6 inline-flex min-h-16 w-full sm:w-auto sm:min-w-80 items-center justify-center gap-3 rounded-[20px] px-8 py-5 text-sm leading-[1.4] font-semibold transition-colors">
              Solicitar acceso temprano
              <ArrowRight :size="20" :stroke-width="1.5" aria-hidden="true" class="shrink-0" />
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <article
              v-for="benefit in benefits"
              :key="benefit.title"
              class="flex items-start gap-3 rounded-lg p-5 border border-card-border bg-card"
            >
              <div class="w-10 h-10 rounded-[8px] bg-primary/8 border border-primary/10 flex items-center justify-center shrink-0">
                <component :is="benefit.icon" :size="24" :stroke-width="1.5" class="continuity-icon" aria-hidden="true" />
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-foreground text-base leading-[1.4] mb-2">
                  {{ benefit.title }}
                </h3>
                <p class="continuity-description text-sm leading-[1.6]">
                  {{ benefit.description }}
                </p>
              </div>
            </article>
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
            >Antes de sumarte</span
          >
          <h2
            class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight"
          >
            Lo que puedes esperar de Lurems.
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
              Recibe un aviso cuando puedas conocer Lurems.
            </h2>
            <p
              class="text-lg md:text-xl text-white/72 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Déjanos tu nombre y correo, y cuéntanos si te interesa como paciente o como psicólogo. Te contactaremos cuando abramos el acceso.
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
                Acceso temprano
              </p>
              <h3 class="mt-2 text-2xl font-bold text-white">
                Únete a la lista de acceso temprano
              </h3>
            </div>
            <WaitlistForm variant="dark" origin="home-inline" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Official teal 700 and neutral 600 variants, limited to this section. */
.continuity-section { --continuity-accent: #2A6C63; --continuity-muted: #426460; }
.continuity-eyebrow, .continuity-icon { color: var(--continuity-accent); }
.continuity-description { color: var(--continuity-muted); }
.continuity-cta { color: white; background: var(--continuity-accent); }
.continuity-cta:hover { background: var(--foreground); }
.continuity-cta:focus-visible { outline: 2px solid var(--foreground); outline-offset: 4px; }
</style>
