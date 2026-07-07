<script setup>
import { reactive, ref, watch } from "vue";
import { ArrowRight, CheckCircle, Loader2, Stethoscope, User } from "lucide-vue-next";
import { z } from "zod";
import { trackEvent } from "../services/analytics.js";
import { submitLead } from "../services/leads.js";

const props = defineProps({
  variant: {
    type: String,
    default: "light",
  },
  defaultType: {
    type: String,
    default: "Paciente",
  },
  origin: {
    type: String,
    default: "waitlist",
  },
  showExtraFields: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submitted"]);

const form = reactive({
  nombre: "",
  email: "",
  tipoUsuario: props.defaultType,
  perfilPsicologo: "",
  ciudad: "",
  telefono: "",
});

const submitted = ref(false);
const loading = ref(false);
const error = ref("");
const fieldErrors = reactive({});

const psychologistProfileOptions = [
  "Psicólogo clínico independiente",
  "Psicólogo clínico dependiente",
  "Psicólogo con otra especialidad",
  "No soy psicólogo pero me interesa el proyecto",
];

const schema = z
  .object({
    nombre: z.string().min(2, "Nombre requerido"),
    email: z.string().email("Email inválido"),
    tipoUsuario: z.enum(["Paciente", "Psicólogo"]),
    perfilPsicologo: z.string().optional(),
    ciudad: z.string().optional(),
    telefono: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tipoUsuario === "Psicólogo" && !psychologistProfileOptions.includes(data.perfilPsicologo || "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["perfilPsicologo"],
        message: "Selecciona una opción",
      });
    }
  });

const typeOptions = [
  { value: "Paciente", icon: User },
  { value: "Psicólogo", icon: Stethoscope },
];

const isDark = props.variant === "dark";

watch(
  () => props.defaultType,
  (value) => {
    form.tipoUsuario = value;
    if (value !== "Psicólogo") {
      form.perfilPsicologo = "";
    }
  },
);

function clearErrors() {
  error.value = "";
  Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key]);
}

function selectUserType(type) {
  form.tipoUsuario = type;
  if (type !== "Psicólogo") {
    form.perfilPsicologo = "";
  }

  trackEvent("select_user_type", {
    tipo_usuario: type,
    origen_formulario: props.origin,
  });
}

async function onSubmit() {
  clearErrors();
  const parsed = schema.safeParse(form);

  if (!parsed.success) {
    parsed.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0]] = issue.message;
    });
    trackEvent("lead_form_error", {
      error_type: "validation",
      error_fields: parsed.error.issues.map((issue) => issue.path[0]).join(","),
      tipo_usuario: form.tipoUsuario,
      origen_formulario: props.origin,
    });
    return;
  }

  loading.value = true;
  try {
    await submitLead({ ...parsed.data, origenFormulario: props.origin });
    trackEvent("generate_lead", {
      method: props.origin,
      origen_formulario: props.origin,
      tipo_usuario: parsed.data.tipoUsuario,
      perfil_psicologo: parsed.data.tipoUsuario === "Psicólogo" ? parsed.data.perfilPsicologo : undefined,
    });
    submitted.value = true;
    emit("submitted");
  } catch {
    error.value = "Hubo un error al registrarte. Intenta de nuevo.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-if="submitted" class="flex flex-col items-center gap-3 py-6 text-center" :class="isDark ? 'text-white' : 'text-foreground'">
    <div class="w-16 h-16 rounded-2xl flex items-center justify-center" :class="isDark ? 'bg-white/10 border border-white/20' : 'bg-primary/10 border border-primary/20'">
      <CheckCircle :size="32" :class="isDark ? 'text-white' : 'text-primary'" />
    </div>
    <p class="text-2xl font-bold">¡Registrado!</p>
    <p class="max-w-sm" :class="isDark ? 'text-white/70' : 'text-muted-foreground'">
      Te notificaremos cuando Lurems esté disponible. Gracias por dar el primer paso.
    </p>
  </div>

  <form v-else class="space-y-4" @submit.prevent="onSubmit">
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="option in typeOptions"
        :key="option.value"
        type="button"
        class="flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-semibold transition-all"
      :class="form.tipoUsuario === option.value
        ? isDark ? 'bg-white text-primary shadow-lg' : 'bg-primary text-white border border-primary shadow-md shadow-primary/20'
          : isDark ? 'bg-white/15 text-white border border-white/25 hover:bg-white/25' : 'bg-background text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground'"
        @click="selectUserType(option.value)"
      >
        <component :is="option.icon" :size="16" />
        <span><span class="hidden sm:inline">Soy </span>{{ option.value }}</span>
      </button>
    </div>

    <label v-if="form.tipoUsuario === 'Psicólogo'" class="block space-y-1.5">
      <span v-if="showExtraFields" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Perfil profesional *</span>
      <select
        v-model="form.perfilPsicologo"
        class="w-full h-12 px-4 rounded-full transition-all appearance-none"
        :class="isDark ? 'bg-white/90 text-foreground border border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20' : 'bg-background border border-border/70 focus:border-primary text-foreground'"
      >
        <option value="" disabled>Selecciona tu perfil</option>
        <option v-for="profile in psychologistProfileOptions" :key="profile" :value="profile">{{ profile }}</option>
      </select>
      <span v-if="fieldErrors.perfilPsicologo" class="block text-xs" :class="isDark ? 'text-white/80' : 'text-destructive'">{{ fieldErrors.perfilPsicologo }}</span>
    </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label class="space-y-1.5">
        <span v-if="showExtraFields" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nombre completo *</span>
        <input
          v-model="form.nombre"
          class="w-full h-12 px-4 rounded-full transition-all"
          :class="isDark ? 'bg-white/90 text-foreground placeholder:text-muted-foreground border border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20' : 'bg-background border border-border/70 focus:border-primary'"
          placeholder="Tu nombre"
        />
        <span v-if="fieldErrors.nombre" class="block text-xs" :class="isDark ? 'text-white/80' : 'text-destructive'">{{ fieldErrors.nombre }}</span>
      </label>

      <label class="space-y-1.5">
        <span v-if="showExtraFields" class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email *</span>
        <input
          v-model="form.email"
          type="email"
          class="w-full h-12 px-4 rounded-full transition-all"
          :class="isDark ? 'bg-white/90 text-foreground placeholder:text-muted-foreground border border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20' : 'bg-background border border-border/70 focus:border-primary'"
          placeholder="tu@email.com"
        />
        <span v-if="fieldErrors.email" class="block text-xs" :class="isDark ? 'text-white/80' : 'text-destructive'">{{ fieldErrors.email }}</span>
      </label>
    </div>

    <div v-if="showExtraFields" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label class="space-y-1.5">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ciudad</span>
        <input v-model="form.ciudad" class="w-full h-11 px-4 rounded-full bg-background border border-border/70 focus:border-primary" placeholder="Buenos Aires" />
      </label>
      <label class="space-y-1.5">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Teléfono</span>
        <input v-model="form.telefono" type="tel" class="w-full h-11 px-4 rounded-full bg-background border border-border/70 focus:border-primary" placeholder="+54 11..." />
      </label>
    </div>

    <p v-if="error" class="text-sm text-center rounded-xl py-2.5 px-4 border" :class="isDark ? 'text-white/90 bg-white/15 border-white/20' : 'text-destructive bg-destructive/8 border-destructive/15'">
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="loading"
      class="w-full h-12 rounded-full font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      :class="isDark ? 'bg-white text-primary hover:bg-white/95 shadow-xl shadow-black/10' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'"
    >
      <Loader2 v-if="loading" :size="18" class="animate-spin" />
      <span>{{ loading ? "Registrando..." : "Comenzar mi camino" }}</span>
      <ArrowRight v-if="!loading" :size="18" />
    </button>
    <p class="text-xs text-center" :class="isDark ? 'text-white/50' : 'text-muted-foreground/70'">Sin spam. Cancela cuando quieras.</p>
  </form>
</template>
