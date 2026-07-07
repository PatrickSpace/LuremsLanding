<script setup>
import { ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

defineProps({
  page: {
    type: Object,
    required: true,
  },
});

const openFaq = ref(null);
</script>

<template>
  <div>
    <section class="relative pt-36 pb-20 hero-gradient overflow-hidden">
      <div class="absolute top-8 right-[8%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-4">{{ page.eyebrow }}</span>
        <h1 class="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">{{ page.title }}</h1>
        <p class="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">{{ page.description }}</p>
      </div>
    </section>

    <section v-if="page.sections" class="py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article v-for="section in page.sections" :key="section.title" class="bg-card border border-card-border rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-5">
              <component :is="section.icon" :size="22" class="text-primary" />
            </div>
            <h2 class="font-semibold text-xl text-foreground mb-3">{{ section.title }}</h2>
            <p class="text-muted-foreground leading-relaxed">{{ section.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-if="page.faqs" class="py-24 bg-background">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-3">
          <div v-for="(faq, index) in page.faqs" :key="faq.question" class="bg-card rounded-2xl border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/15 hover:shadow-sm">
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
  </div>
</template>
