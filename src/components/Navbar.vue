<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import { navLinks } from "../data/site.js";

const emit = defineEmits(["open-waitlist"]);
const route = useRoute();
const scrolled = ref(false);
const menuOpen = ref(false);

const currentPath = computed(() => route.path);
const currentFullPath = computed(() => route.fullPath);

function updateScrolled() {
  scrolled.value = window.scrollY > 10;
}

function isNavLinkActive(href) {
  return href.includes("#") ? currentFullPath.value === href : currentPath.value === href;
}

onMounted(() => {
  updateScrolled();
  window.addEventListener("scroll", updateScrolled, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrolled);
});

watch(currentFullPath, () => {
  menuOpen.value = false;
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'bg-transparent'"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[68px]">
        <RouterLink to="/" class="flex items-center cursor-pointer group" data-testid="nav-logo">
          <img
            src="/brand/lurems-isotipo-transparent.png"
            alt="Lurems"
            class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span class="ml-2 text-[1.7rem] font-medium leading-none tracking-normal text-foreground">lurems</span>
        </RouterLink>

        <div class="hidden md:flex items-center gap-0.5">
          <RouterLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
            :class="isNavLinkActive(link.href) ? 'text-primary bg-primary/8' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
          >
            {{ link.label }}
            <span v-if="isNavLinkActive(link.href)" class="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-primary" />
          </RouterLink>
        </div>

        <div class="hidden md:flex items-center gap-2.5">
          <button class="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm shadow-primary/20 hover:shadow-primary/25 hover:-translate-y-px transition-all" @click="emit('open-waitlist', 'Paciente')">
            Solicitar acceso
          </button>
        </div>

        <button
          class="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
          aria-label="Abrir menú"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>

      <div v-if="menuOpen" class="md:hidden pb-5 pt-2 space-y-0.5 border-t border-border/50 mt-0 bg-background/95 backdrop-blur-xl rounded-b-2xl">
        <RouterLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"
          :class="isNavLinkActive(link.href) ? 'text-primary bg-primary/8' : 'text-muted-foreground hover:text-foreground hover:bg-accent'"
        >
          {{ link.label }}
        </RouterLink>
        <div class="flex flex-col gap-2 px-4 pt-3 mt-2 border-t border-border/30">
          <button class="w-full py-2.5 px-4 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all" @click="emit('open-waitlist', 'Paciente')">
            Solicitar acceso
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
