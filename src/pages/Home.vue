<script setup>
import { ref } from "vue";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Heart,
  HeartHandshake,
  MessageCircle,
  Search,
  Shield,
  Star,
  UserRound,
  Users,
  Zap,
} from "lucide-vue-next";
import WaitlistForm from "../components/WaitlistForm.vue";
import { benefits, faqs, psychologistBenefits, testimonials } from "../data/site.js";

const openFaq = ref(null);

function scrollToWaitlist() {
  document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
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
    description: "Encuentra orientación y conecta con un profesional adecuado para ti.",
    href: "/pacientes",
    tone: "patient",
  },
  {
    icon: Users,
    title: "Para psicólogos",
    description: "Conecta con más personas y organiza mejor tu práctica.",
    href: "/psicologos",
    tone: "psychologist",
  },
];

const heroSignals = [
  { icon: Shield, text: "Privacidad desde el primer registro" },
  { icon: Users, text: "Profesionales verificados" },
  { icon: HeartHandshake, text: "Orientación antes de elegir" },
];

const solutionCards = [
  {
    icon: Search,
    eyebrow: "Problema",
    title: "Buscar terapia puede sentirse abrumador",
    description: "Perfiles, enfoques, precios y disponibilidad aparecen dispersos justo cuando necesitas claridad.",
  },
  {
    icon: ClipboardList,
    eyebrow: "Orientación",
    title: "Lurems ordena tus necesidades",
    description: "Te guiamos con preguntas simples para entender qué tipo de acompañamiento puede tener más sentido para ti.",
  },
  {
    icon: HeartHandshake,
    eyebrow: "Continuidad",
    title: "Un siguiente paso con más confianza",
    description: "Conecta con profesionales adecuados y conserva contexto para avanzar sin empezar de cero cada vez.",
  },
];

const flowSteps = [
  {
    icon: ClipboardList,
    title: "Cuéntanos sobre ti",
    description: "Responde algunas preguntas para entender tus necesidades.",
  },
  {
    icon: Search,
    title: "Recibe orientación",
    description: "Ordenamos tu búsqueda y te mostramos opciones adecuadas.",
  },
  {
    icon: CalendarDays,
    title: "Agenda tu sesión",
    description: "Elige un horario disponible que se adapte a ti.",
  },
  {
    icon: HeartHandshake,
    title: "Continúa tu proceso",
    description: "Mantén claridad antes y después de cada encuentro.",
  },
];

const reassuranceItems = [
  "Registro gratuito para acceso temprano",
  "No reemplaza atención psicológica ni emergencias",
  "Usamos tus datos solo para contactarte y mejorar la experiencia",
];
</script>

<template>
  <div class="overflow-x-hidden">
    <section class="relative z-10 hero-gradient pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute left-[8%] top-[18%] h-56 w-56 rounded-full bg-hope/12 blur-3xl" />
        <div class="absolute right-[10%] top-[8%] h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:min-h-[640px]">
          <div class="max-w-xl text-center lg:text-left animate-reveal-up">
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-primary/15 text-primary text-sm font-semibold mb-7 shadow-sm">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Acceso temprano para pacientes y psicólogos
            </div>

            <h1 class="text-4xl sm:text-5xl xl:text-[3.45rem] font-bold text-foreground leading-[1.06] tracking-tight mb-6 [overflow-wrap:break-word]">
              Encuentra terapia con
              <span class="gradient-text">más claridad</span>
            </h1>

            <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-9 max-w-xl mx-auto lg:mx-0">
              Lurems te ayuda a entender qué necesitas, encontrar un psicólogo adecuado y sostener tu proceso sin buscar a ciegas.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
              <button class="group inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-4 rounded-full transition-all duration-300 text-base shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5" @click="scrollToWaitlist">
                Unirme al acceso temprano
                <ArrowRight :size="18" class="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <RouterLink to="/como-funciona" class="group inline-flex min-h-14 items-center justify-center gap-2 whitespace-nowrap bg-white/75 hover:bg-white backdrop-blur-sm text-foreground font-semibold px-7 py-4 rounded-full border border-border hover:border-primary/30 transition-all duration-300 text-base hover:-translate-y-0.5">
                Ver cómo funciona
              </RouterLink>
            </div>

            <div class="grid gap-2.5 sm:grid-cols-3 lg:max-w-2xl">
              <div v-for="signal in heroSignals" :key="signal.text" class="flex items-center justify-center lg:justify-start gap-2 rounded-full border border-border/70 bg-white/65 px-3.5 py-2.5 text-xs font-medium text-muted-foreground shadow-sm">
                <component :is="signal.icon" :size="15" class="text-primary" />
                <span>{{ signal.text }}</span>
              </div>
            </div>
          </div>

          <div class="relative animate-reveal-up animate-reveal-delay">
            <div class="relative overflow-hidden rounded-[8px] border border-white/80 bg-white shadow-2xl shadow-primary/10">
              <img
                src="/brand/lurems-hero-illustration.png"
                alt="Camino terapéutico guiado por un faro"
                class="h-[280px] w-full object-cover object-center sm:h-[360px] lg:h-[510px]"
                loading="eager"
              />
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/72 via-foreground/20 to-transparent p-4 sm:p-6">
                <div class="max-w-md rounded-[8px] border border-white/18 bg-white/92 p-4 shadow-xl backdrop-blur-md">
                  <div class="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Orientación inicial</p>
                      <p class="text-sm font-semibold text-foreground">Tu necesidad empieza ordenada</p>
                    </div>
                    <div class="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      <Star :size="12" class="fill-primary" />
                      Compatible
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="rounded-[8px] bg-background px-2 py-2">
                      <p class="text-[0.68rem] text-muted-foreground">Contexto</p>
                      <p class="text-xs font-bold text-foreground">Claro</p>
                    </div>
                    <div class="rounded-[8px] bg-background px-2 py-2">
                      <p class="text-[0.68rem] text-muted-foreground">Enfoque</p>
                      <p class="text-xs font-bold text-foreground">Adecuado</p>
                    </div>
                    <div class="rounded-[8px] bg-background px-2 py-2">
                      <p class="text-[0.68rem] text-muted-foreground">Paso</p>
                      <p class="text-xs font-bold text-foreground">Concreto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -right-5 -top-5 hidden rounded-[8px] border border-secondary/15 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow-lg lg:flex lg:items-center lg:gap-2">
              <MessageCircle :size="17" class="text-secondary" />
              Sin listas interminables
            </div>
          </div>
        </div>

        <div class="relative z-30 mt-10">
          <div class="grid grid-cols-1 md:grid-cols-2 bg-white/92 backdrop-blur-xl rounded-[8px] border border-border shadow-lg overflow-hidden">
            <RouterLink
              v-for="path in heroPaths"
              :key="path.title"
              :to="path.href"
              class="group flex items-center gap-4 p-5 sm:p-6 md:p-7 hover:bg-primary/5 transition-colors"
            >
              <div
                class="w-14 h-14 rounded-[8px] flex items-center justify-center border"
                :class="path.tone === 'patient' ? 'bg-primary/8 border-primary/12 text-primary' : 'bg-secondary/10 border-secondary/15 text-secondary'"
              >
                <component :is="path.icon" :size="26" />
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-foreground mb-1">{{ path.title }}</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">{{ path.description }}</p>
              </div>
              <span class="ml-auto hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-muted text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:flex">
                <ArrowRight :size="16" />
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-0 py-20 lg:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end mb-12">
          <div>
            <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Problema / solución</span>
            <h2 class="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">No necesitas elegir a ciegas cuando estás buscando ayuda</h2>
          </div>
          <p class="text-lg text-muted-foreground leading-relaxed max-w-2xl lg:ml-auto">
            La conversión empieza cuando la persona entiende rápido qué gana: menos incertidumbre, mejores señales para elegir y un proceso más fácil de continuar.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="card in solutionCards" :key="card.title" class="group rounded-[8px] border border-card-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg">
            <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] border border-primary/10 bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <component :is="card.icon" :size="21" />
            </div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{{ card.eyebrow }}</p>
            <h3 class="mb-3 text-lg font-semibold text-foreground">{{ card.title }}</h3>
            <p class="text-sm leading-relaxed text-muted-foreground">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-0 py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Cómo funciona</span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight">Tu siguiente paso, más fácil de ver</h2>
          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Un recorrido simple para comprender tus necesidades, conectar y sostener tu proceso.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div class="hidden md:block absolute top-14 left-[12%] right-[12%] border-t border-dashed border-primary/25" />
          <div v-for="(step, index) in flowSteps" :key="step.title" class="relative text-center group">
            <div class="relative z-10 w-24 h-24 rounded-[8px] bg-background border border-border flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300 group-hover:-translate-y-1">
              <component :is="step.icon" :size="38" :class="index % 2 === 0 ? 'text-primary' : 'text-secondary'" />
            </div>
            <span
              class="inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold text-white mb-3"
              :class="index % 2 === 0 ? 'bg-primary' : 'bg-secondary'"
            >
              {{ index + 1 }}
            </span>
            <h3 class="text-base font-semibold text-foreground mb-3">{{ step.title }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed max-w-[15rem] mx-auto">{{ step.description }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 border border-border rounded-[8px] bg-background/80 backdrop-blur-sm shadow-sm overflow-hidden">
          <div class="flex items-start gap-3 p-5">
            <Shield :size="24" class="text-primary mt-1" />
            <div>
              <h4 class="font-semibold text-sm text-foreground">Privacidad garantizada</h4>
              <p class="text-xs text-muted-foreground mt-1">Tus datos se tratan con cuidado.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-5">
            <Shield :size="24" class="text-primary mt-1" />
            <div>
              <h4 class="font-semibold text-sm text-foreground">Psicólogos verificados</h4>
              <p class="text-xs text-muted-foreground mt-1">Perfiles validados antes de publicarse.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-5">
            <Heart :size="24" class="text-secondary mt-1" />
            <div>
              <h4 class="font-semibold text-sm text-foreground">Acompañamiento continuo</h4>
              <p class="text-xs text-muted-foreground mt-1">Claridad antes y después de cada sesión.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-5">
            <Zap :size="24" class="text-secondary mt-1" />
            <div>
              <h4 class="font-semibold text-sm text-foreground">Acceso desde cualquier lugar</h4>
              <p class="text-xs text-muted-foreground mt-1">En web o app, cuando lo necesites.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-muted/30 section-glow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 lg:mb-20">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Por qué Lurems</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight">Diseñado para acompañar tu decisión</h2>
          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">No somos un directorio más. Somos una experiencia de orientación, confianza y continuidad para empezar mejor.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="benefit in benefits" :key="benefit.title" class="group relative bg-card rounded-[8px] p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
            <div class="w-12 h-12 rounded-[8px] bg-primary/8 border border-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-500">
              <component :is="benefit.icon" :size="22" class="text-primary" />
            </div>
            <h3 class="font-semibold text-foreground text-lg mb-2">{{ benefit.title }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="inline-block text-secondary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Para psicólogos</span>
            <h2 class="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mt-2 mb-7 leading-tight tracking-tight">
              Conecta con personas que buscan un acompañamiento acorde a tu experiencia
            </h2>
            <p class="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">Lurems facilita una relación más clara, organizada y continua entre psicólogo y paciente.</p>
            <ul class="space-y-5 mb-10">
              <li v-for="item in psychologistBenefits" :key="item.text" class="flex items-start gap-4">
                <div class="w-8 h-8 rounded-lg bg-secondary/8 border border-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <component :is="item.icon" :size="14" class="text-secondary" />
                </div>
                <span class="text-foreground text-[0.95rem] leading-snug">{{ item.text }}</span>
              </li>
            </ul>
            <RouterLink to="/psicologos" class="group inline-flex items-center gap-2.5 bg-secondary hover:bg-secondary/90 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-lg shadow-secondary/20 hover:shadow-secondary/30 hover:-translate-y-0.5 text-sm">
              Conocer Lurems para psicólogos
              <ArrowRight :size="16" class="group-hover:translate-x-0.5 transition-transform" />
            </RouterLink>
          </div>

          <div class="relative">
            <div class="rounded-[8px] bg-gradient-to-br from-secondary/10 via-primary/5 to-background border border-card-border p-6 sm:p-8 shadow-2xl shadow-black/5">
              <div class="space-y-3 mb-5">
                <div v-for="stat in [
                  { label: 'Orientación inicial', value: 'Antes', trend: 'Comprender necesidades' },
                  { label: 'Conexión profesional', value: 'Durante', trend: 'Elegir con más contexto' },
                  { label: 'Continuidad', value: 'Después', trend: 'Mantener claridad' },
                ]" :key="stat.label" class="flex items-center justify-between p-4 bg-card rounded-[8px] border border-card-border/60">
                  <span class="text-sm text-muted-foreground">{{ stat.label }}</span>
                  <div class="text-right">
                    <div class="font-bold text-foreground">{{ stat.value }}</div>
                    <div class="text-xs text-primary font-medium">{{ stat.trend }}</div>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-primary/6 rounded-[8px] border border-primary/10">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">SH</div>
                  <div>
                    <div class="font-semibold text-sm text-foreground">Dra. Sofía Herrera</div>
                    <div class="text-xs text-muted-foreground">Psicología cognitivo-conductual</div>
                  </div>
                  <div class="ml-auto flex gap-0.5">
                    <Star v-for="i in 5" :key="i" :size="12" class="text-amber-400 fill-amber-400" />
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-muted/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Validación</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight">Señales de usuarios y profesionales</h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">Mensajes de validación temprana que reducen incertidumbre y acercan la propuesta a una decisión humana.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="testimonial in testimonials" :key="testimonial.name + testimonial.text" class="group relative bg-card rounded-[8px] p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
            <div class="inline-flex items-center rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-5">
              Feedback de validación
            </div>
            <p class="text-foreground leading-relaxed mb-7 text-[0.95rem]">“{{ testimonial.text }}”</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-primary font-bold text-sm border border-primary/10">{{ initials(testimonial.name) }}</div>
              <div>
                <div class="font-semibold text-sm text-foreground">{{ testimonial.name }}</div>
                <div class="text-xs text-muted-foreground">{{ testimonial.role }} · {{ testimonial.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-background">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">FAQ</span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight">Dudas antes de dar el paso</h2>
        </div>

        <div class="space-y-3">
          <div v-for="(faq, index) in faqs" :key="faq.question" class="bg-card rounded-[8px] border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/15 hover:shadow-sm">
            <button class="w-full flex items-center justify-between px-6 py-5 text-left font-medium text-foreground hover:bg-accent/30 transition-colors" @click="openFaq = openFaq === index ? null : index">
              <span class="pr-4 text-[0.95rem]">{{ faq.question }}</span>
              <ChevronDown :size="18" class="text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-3" :class="openFaq === index ? 'rotate-180' : ''" />
            </button>
            <div v-show="openFaq === index" class="px-6 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border/40 pt-4">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="waitlist-section" class="relative py-24 lg:py-28 overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(135deg,#1A3A38_0%,#2D7F78_52%,#6E63BE_100%)]" />
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/6 rounded-full blur-3xl" />
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-hope/10 rounded-full blur-3xl" />
      </div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div class="order-2 text-center lg:order-1 lg:text-left">
            <div class="w-14 h-14 rounded-[8px] bg-white/10 border border-white/20 flex items-center justify-center mx-auto lg:mx-0 mb-6 backdrop-blur-sm">
              <Heart :size="24" class="text-white" />
            </div>
            <span class="inline-block text-white/72 font-semibold text-xs uppercase tracking-[0.2em] mb-3">Acceso temprano</span>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-tight">Da el primer paso con más claridad</h2>
            <p class="text-lg md:text-xl text-white/72 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">Déjanos tus datos y te avisaremos cuando puedas probar Lurems. La idea no es venderte presión: es ayudarte a empezar con más contexto.</p>
            <div class="space-y-3 max-w-xl mx-auto lg:mx-0">
              <div v-for="item in reassuranceItems" :key="item" class="flex items-start gap-3 rounded-[8px] border border-white/12 bg-white/8 px-4 py-3 text-left text-sm text-white/82 backdrop-blur-sm">
                <Shield :size="16" class="mt-0.5 flex-shrink-0 text-white" />
                <span>{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="order-1 rounded-[8px] border border-white/16 bg-white/10 p-5 sm:p-7 shadow-2xl shadow-black/10 backdrop-blur-md lg:order-2">
            <div class="mb-6 text-center lg:text-left">
              <p class="text-sm font-semibold uppercase tracking-[0.16em] text-white/60">Únete a la lista</p>
              <h3 class="mt-2 text-2xl font-bold text-white">Recibe acceso cuando abramos cupos</h3>
            </div>
            <WaitlistForm variant="dark" origin="home-inline" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
