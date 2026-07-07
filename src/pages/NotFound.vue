<template>
  <section class="min-h-[70vh] pt-36 pb-20 hero-gradient flex items-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span class="inline-block text-primary font-semibold text-xs uppercase tracking-[0.2em] mb-4">404</span>
      <h1 class="text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">Página no encontrada</h1>
      <p class="text-lg text-muted-foreground mb-8">La ruta que buscas no existe o fue movida.</p>
      <RouterLink to="/" class="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all shadow-lg shadow-primary/20">
        Volver al inicio
      </RouterLink>
    </div>
  </section>
</template>
