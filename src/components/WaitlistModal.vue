<script setup>
import { Sparkles, X } from "lucide-vue-next";
import WaitlistForm from "./WaitlistForm.vue";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  defaultType: {
    type: String,
    default: "Paciente",
  },
});

const emit = defineEmits(["update:open"]);

function handleSubmitted() {
  setTimeout(() => emit("update:open", false), 1400);
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
        <button class="absolute inset-0 bg-foreground/40 backdrop-blur-sm" aria-label="Cerrar modal" @click="emit('update:open', false)" />
        <div class="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-card shadow-2xl border border-card-border">
          <button class="absolute right-4 top-4 z-10 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all" aria-label="Cerrar" @click="emit('update:open', false)">
            <X :size="18" />
          </button>

          <div class="px-6 pt-6 pb-4 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border/50">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <Sparkles :size="20" class="text-primary" />
            </div>
            <h2 class="text-xl font-bold text-foreground">Comienza con más claridad</h2>
            <p class="text-muted-foreground text-sm mt-1">Déjanos tus datos para recibir acceso temprano a Lurems.</p>
          </div>

          <div class="px-6 py-5">
            <WaitlistForm :default-type="defaultType" origin="modal" @submitted="handleSubmitted" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
