<script setup>
import { ArrowUpRight } from "lucide-vue-next";

const emit = defineEmits(["open-waitlist"]);

const productLinks = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#para-psicologos", label: "Para psicólogos" },
  { href: "/#preguntas", label: "Preguntas frecuentes" },
];

const companyLinks = [
  { href: "/#waitlist-section", label: "Acceso temprano" },
  { href: "/#para-psicologos", label: "Unirme como psicólogo" },
];
</script>

<template>
  <footer class="relative overflow-hidden">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div class="bg-[#0E2422] text-white/70">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div class="mb-20 p-8 md:p-12 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="text-center md:text-left">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">No tienes que recorrer este camino sin orientación</h3>
              <p class="text-white/60 max-w-md">Empieza con una experiencia diseñada para ayudarte a comprender tus necesidades y dar el siguiente paso.</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <button class="px-7 py-3.5 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-all shadow-lg shadow-black/20" @click="emit('open-waitlist', 'Paciente')">
                Quiero acceso temprano
              </button>
              <button class="px-7 py-3.5 rounded-full bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all" @click="emit('open-waitlist', 'Psicólogo')">
                Quiero unirme como psicólogo
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div class="lg:col-span-4">
            <img src="/brand/lurems-logo-negativo.png" alt="Lurems" class="h-20 w-auto object-contain mb-5" />
            <p class="text-sm text-white/50 leading-relaxed max-w-xs mb-6">
              Claridad en tu camino terapéutico. Orientamos, conectamos y acompañamos procesos con una experiencia segura y humana.
            </p>
            <div class="flex gap-2.5">
              <a href="https://linkedin.com/company/lurems" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-primary/30">in</a>
              <a href="https://instagram.com/lurems" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-primary/30">ig</a>
              <a href="https://twitter.com/lurems" target="_blank" rel="noopener noreferrer" aria-label="Twitter" class="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/30 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-primary/30">x</a>
            </div>
          </div>

          <div class="lg:col-span-2 lg:col-start-6">
            <h4 class="font-semibold text-white text-xs uppercase tracking-[0.15em] mb-5">Producto</h4>
            <ul class="space-y-3.5">
              <li v-for="link in productLinks" :key="link.href">
                <RouterLink :to="link.href" class="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1 group">
                  {{ link.label }}
                  <ArrowUpRight :size="12" class="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </RouterLink>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-2">
            <h4 class="font-semibold text-white text-xs uppercase tracking-[0.15em] mb-5">Empresa</h4>
            <ul class="space-y-3.5">
              <li v-for="link in companyLinks" :key="link.href">
                <RouterLink :to="link.href" class="text-sm text-white/50 hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-1 group">
                  {{ link.label }}
                  <ArrowUpRight :size="12" class="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </RouterLink>
              </li>
            </ul>
          </div>

        </div>

        <div class="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-white/30">&copy; {{ new Date().getFullYear() }} Lurems. Todos los derechos reservados.</p>
          <p class="text-sm text-white/30">Lurems no sustituye atención de emergencia ni diagnóstico clínico.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
