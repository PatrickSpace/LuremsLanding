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
</script>

<template>
  <div class="overflow-x-hidden">
    <section class="relative z-10 hero-gradient pt-24 lg:pt-28 pb-0 overflow-visible">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[12%] right-[8%] w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div class="absolute bottom-[8%] left-[4%] w-80 h-80 rounded-full bg-hope/10 blur-3xl animate-pulse" />
        <div
          class="hero-illustration-mask absolute right-0 top-[58%] lg:top-1/2 -translate-y-1/2 h-[360px] sm:h-[430px] lg:h-[520px] w-[100vw] sm:w-[82vw] lg:w-[65vw] max-w-[900px]"
          style="mask-image: linear-gradient(to left, black 72%, transparent 100%); -webkit-mask-image: linear-gradient(to left, black 72%, transparent 100%);"
        >
          <img
            src="/brand/lurems-hero-illustration.png"
            alt="Camino terapéutico guiado por un faro"
            class="h-full w-full object-contain object-right"
            loading="eager"
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex items-center min-h-[600px] py-12 lg:py-16">
          <div class="max-w-lg text-center lg:text-left animate-reveal-up pt-8 lg:pt-0">
            <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-8 shadow-sm">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
              Encuentra el apoyo que necesitas
            </div>

            <h1 class="text-4xl sm:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] tracking-tight mb-6 [overflow-wrap:break-word]">
              Te ayudamos a encontrar
              <span class="gradient-text">orientación</span>
              para tu camino terapéutico
            </h1>

            <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Comprende lo que necesitas, conecta con un psicólogo adecuado y mantén claridad durante cada etapa del proceso.
            </p>

            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
              <button class="group inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5" @click="scrollToWaitlist">
                Comenzar mi camino
                <ArrowRight :size="18" class="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <RouterLink to="/como-funciona" class="group inline-flex items-center justify-center gap-2 bg-white/70 hover:bg-white backdrop-blur-sm text-foreground font-medium px-8 py-4 rounded-full border border-border hover:border-primary/30 transition-all duration-300 text-base hover:-translate-y-0.5">
                ¿Cómo funciona?
              </RouterLink>
            </div>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5">
              <div class="flex items-center gap-2 text-sm text-muted-foreground/80"><Shield :size="15" class="text-primary/80" />Seguro y confidencial</div>
              <div class="flex items-center gap-2 text-sm text-muted-foreground/80"><Users :size="15" class="text-secondary/80" />Psicólogos verificados</div>
            </div>
          </div>
        </div>

        <div class="relative z-30 mt-10 lg:mt-0 lg:-mb-20 max-w-4xl">
          <div class="grid grid-cols-1 md:grid-cols-2 bg-white/90 backdrop-blur-xl rounded-xl border border-border shadow-xl overflow-hidden">
            <RouterLink
              v-for="path in heroPaths"
              :key="path.title"
              :to="path.href"
              class="group flex items-center gap-5 p-6 md:p-7 hover:bg-primary/5 transition-colors"
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center border"
                :class="path.tone === 'patient' ? 'bg-primary/8 border-primary/12 text-primary' : 'bg-secondary/10 border-secondary/15 text-secondary'"
              >
                <component :is="path.icon" :size="30" />
              </div>
              <div class="min-w-0">
                <h3 class="font-semibold text-foreground mb-1">{{ path.title }}</h3>
                <p class="text-sm text-muted-foreground leading-relaxed">{{ path.description }}</p>
              </div>
              <span class="ml-auto w-9 h-9 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowRight :size="16" />
              </span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-0 pt-20 lg:pt-36 pb-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Cómo funciona</span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight">Tu siguiente paso, más fácil de ver</h2>
          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Un recorrido simple para comprender tus necesidades, conectar y sostener tu proceso.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div class="hidden md:block absolute top-14 left-[12%] right-[12%] border-t border-dashed border-primary/25" />
          <div v-for="(step, index) in flowSteps" :key="step.title" class="relative text-center group">
            <div class="relative z-10 w-28 h-28 rounded-full bg-white border border-border flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
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

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16 border border-border rounded-xl bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
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

    <section class="py-28 bg-muted/30 section-glow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Por qué Lurems</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight">Diseñado para acompañar tu proceso</h2>
          <p class="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">No somos un directorio. Somos una experiencia de orientación y continuidad terapéutica.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="benefit in benefits" :key="benefit.title" class="group relative bg-card rounded-xl p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1.5">
            <div class="w-12 h-12 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/20 transition-all duration-500">
              <component :is="benefit.icon" :size="22" class="text-primary" />
            </div>
            <h3 class="font-semibold text-foreground text-lg mb-2">{{ benefit.title }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-28 bg-background">
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
            <div class="rounded-xl bg-gradient-to-br from-secondary/10 via-primary/5 to-background border border-card-border p-8 shadow-2xl shadow-black/5">
              <div class="space-y-3 mb-5">
                <div v-for="stat in [
                  { label: 'Orientación inicial', value: 'Antes', trend: 'Comprender necesidades' },
                  { label: 'Conexión profesional', value: 'Durante', trend: 'Elegir con más contexto' },
                  { label: 'Continuidad', value: 'Después', trend: 'Mantener claridad' },
                ]" :key="stat.label" class="flex items-center justify-between p-4 bg-card rounded-xl border border-card-border/60">
                  <span class="text-sm text-muted-foreground">{{ stat.label }}</span>
                  <div class="text-right">
                    <div class="font-bold text-foreground">{{ stat.value }}</div>
                    <div class="text-xs text-primary font-medium">{{ stat.trend }}</div>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-primary/6 rounded-xl border border-primary/10">
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

    <section class="py-28 bg-muted/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">Validación</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-2 mb-5 tracking-tight">Señales de usuarios y profesionales</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div v-for="testimonial in testimonials" :key="testimonial.name + testimonial.text" class="group relative bg-card rounded-xl p-7 border border-card-border shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
            <div class="inline-flex items-center rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-5">
              Feedback demostrativo
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

    <section class="py-28 bg-background">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
          <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-3">FAQ</span>
          <h2 class="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-5 tracking-tight">Preguntas frecuentes</h2>
        </div>

        <div class="space-y-3">
          <div v-for="(faq, index) in faqs" :key="faq.question" class="bg-card rounded-xl border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/15 hover:shadow-sm">
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

    <section id="waitlist-section" class="relative py-28 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary" />
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <Heart :size="24" class="text-white" />
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Da el primer paso con más claridad</h2>
        <p class="text-xl text-white/70 mb-12 max-w-md mx-auto">Empieza una experiencia diseñada para ayudarte a comprender tus necesidades y avanzar con confianza.</p>
        <div class="bg-white/8 backdrop-blur-md rounded-xl p-8 border border-white/15 shadow-2xl">
          <WaitlistForm variant="dark" origin="home-inline" />
        </div>
      </div>
    </section>
  </div>
</template>
