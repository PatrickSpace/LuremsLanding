<script setup>
import { computed, nextTick, reactive, ref, useId, watch } from "vue";
import { ArrowRight, CheckCircle, Loader2, User } from "lucide-vue-next";
import { trackEvent } from "../services/analytics.js";
import { getLeadErrorMessage } from "../services/lead-errors.js";

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
});

const emit = defineEmits(["submitted"]);

const form = reactive({
  nombre: "",
  email: "",
  tipoUsuario: props.defaultType,
  perfilPsicologo: "",
});

const submitted = ref(false);
const loading = ref(false);
const error = ref("");
const fieldErrors = reactive({});
const formId = useId();
const formElement = ref(null);
const errorElement = ref(null);

const psychologistProfileOptions = [
  "Psicólogo clínico independiente",
  "Psicólogo clínico dependiente",
  "Psicólogo con otra especialidad",
  "No soy psicólogo pero me interesa el proyecto",
];

const typeOptions = [
  { value: "Paciente", icon: User },
  { value: "Psicólogo", icon: null },
];

const isDark = props.variant === "dark";
const isPsychologist = computed(() => form.tipoUsuario === "Psicólogo");
const submitLabel = computed(() => "Quiero recibir el aviso");
const successIconClass = computed(() => {
  if (isDark) return "text-white";
  return isPsychologist.value ? "text-secondary" : "text-primary";
});
const successIconWrapperClass = computed(() => {
  if (isDark) return "bg-white/10 border border-white/20";
  return isPsychologist.value ? "bg-secondary/10 border border-secondary/20" : "bg-primary/10 border border-primary/20";
});
const inputClass = computed(() => {
  if (isDark) {
    return isPsychologist.value
      ? "bg-white/90 text-foreground placeholder:text-muted-foreground border border-transparent focus:bg-white focus:ring-2 focus:ring-secondary/25"
      : "bg-white/90 text-foreground placeholder:text-muted-foreground border border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20";
  }

  return isPsychologist.value
    ? "bg-background border border-border/70 focus:border-secondary focus:ring-2 focus:ring-secondary/15"
    : "bg-background border border-border/70 focus:border-primary focus:ring-2 focus:ring-primary/15";
});
const submitButtonClass = computed(() => {
  if (isDark) {
    return isPsychologist.value
      ? "bg-secondary text-white hover:bg-secondary/90 shadow-xl shadow-secondary/20"
      : "bg-white text-primary hover:bg-white/95 shadow-xl shadow-black/10";
  }

  return isPsychologist.value
    ? "bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20"
    : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20";
});

watch(
  () => props.defaultType,
  (value) => {
    form.tipoUsuario = value;
  },
);

watch(() => form.email, () => {
  error.value = "";
  delete fieldErrors.email;
});
watch(() => form.tipoUsuario, () => {
  error.value = "";
  delete fieldErrors.perfilPsicologo;
});
watch(() => form.nombre, () => delete fieldErrors.nombre);
watch(() => form.perfilPsicologo, () => delete fieldErrors.perfilPsicologo);

function clearErrors() {
  error.value = "";
  Object.keys(fieldErrors).forEach((key) => delete fieldErrors[key]);
}

function selectUserType(type) {
  form.tipoUsuario = type;

  trackEvent("select_user_type", {
    tipo_usuario: type,
    origen_formulario: props.origin,
  });
}

function typeButtonClass(type) {
  const selected = form.tipoUsuario === type;
  const psychologistOption = type === "Psicólogo";

  if (selected) {
    if (isDark && !psychologistOption) return "bg-white text-primary shadow-lg";
    return psychologistOption
      ? "bg-secondary text-white border border-secondary shadow-md shadow-secondary/20"
      : "bg-primary text-white border border-primary shadow-md shadow-primary/20";
  }

  if (isDark) {
    return psychologistOption
      ? "bg-white/15 text-white border border-white/25 hover:bg-secondary/25 hover:border-secondary/50"
      : "bg-white/15 text-white border border-white/25 hover:bg-white/25";
  }

  return psychologistOption
    ? "bg-background text-muted-foreground border border-border hover:border-secondary/45 hover:text-foreground"
    : "bg-background text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground";
}

async function onSubmit() {
  if (loading.value || submitted.value) return;
  clearErrors();
  // Evita el doble envío en esta instancia, no duplicados entre clientes.
  loading.value = true;
  const data = { ...form };
  try {
    const { validateLead } = await import("../services/lead-validation.js");
    const parsed = validateLead(data, psychologistProfileOptions);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      loading.value = false;
      await nextTick();
      formElement.value?.querySelector('[aria-invalid="true"]')?.focus();
      trackEvent("lead_form_error", {
        error_type: "validation",
        error_fields: parsed.error.issues.map((issue) => issue.path[0]).join(","),
        tipo_usuario: data.tipoUsuario,
        origen_formulario: props.origin,
      });
      return;
    }

    const { submitLead } = await import("../services/leads.js");
    await submitLead({ ...parsed.data, origenFormulario: props.origin });
    trackEvent("generate_lead", {
      method: props.origin,
      origen_formulario: props.origin,
      tipo_usuario: parsed.data.tipoUsuario,
      perfil_psicologo: parsed.data.tipoUsuario === "Psicólogo" ? parsed.data.perfilPsicologo : undefined,
    });
    submitted.value = true;
    emit("submitted");
  } catch (cause) {
    error.value = getLeadErrorMessage(cause);
    await nextTick();
    errorElement.value?.focus();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div v-if="submitted" class="flex flex-col items-center gap-3 py-6 text-center" :class="isDark ? 'text-white' : 'text-foreground'">
    <div class="w-16 h-16 rounded-2xl flex items-center justify-center" :class="successIconWrapperClass">
      <CheckCircle :size="32" :class="successIconClass" />
    </div>
    <p class="text-2xl font-bold">Ya estás en la lista.</p>
    <p class="max-w-sm" :class="isDark ? 'text-white/70' : 'text-muted-foreground'">
      Te avisaremos por correo cuando abramos el acceso a Lurems. Gracias por tu interés. Este registro no crea una cuenta ni reserva una sesión.
    </p>
  </div>

  <form v-else ref="formElement" class="space-y-4" novalidate :aria-busy="loading" @submit.prevent="onSubmit">
    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="option in typeOptions"
        :key="option.value"
        type="button"
        :aria-pressed="form.tipoUsuario === option.value"
        :disabled="loading"
        class="flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-semibold transition-all"
        :class="typeButtonClass(option.value)"
        @click="selectUserType(option.value)"
      >
        <svg
          v-if="option.value === 'Psicólogo'"
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3v15" />
          <path d="M5 3v7a7 7 0 0 0 14 0V3" />
          <path d="M9 21h6" />
          <path d="M10 18h4" />
        </svg>
        <component v-else :is="option.icon" :size="16" />
        <span><span class="hidden sm:inline">Soy </span>{{ option.value }}</span>
      </button>
    </div>

    <label v-if="form.tipoUsuario === 'Psicólogo'" class="block space-y-1.5">
      <span :id="`${formId}-profile-label`" class="sr-only">Tu perfil profesional</span>
      <select
        v-model="form.perfilPsicologo"
        :disabled="loading"
        :aria-labelledby="`${formId}-profile-label`"
        :aria-invalid="!!fieldErrors.perfilPsicologo"
        :aria-describedby="fieldErrors.perfilPsicologo ? `${formId}-profile-error` : undefined"
        class="w-full h-12 px-4 rounded-full transition-all appearance-none"
        :class="[inputClass, fieldErrors.perfilPsicologo && 'ring-1 ring-destructive']"
      >
        <option value="" disabled>Tu perfil profesional</option>
        <option v-for="profile in psychologistProfileOptions" :key="profile" :value="profile">{{ profile }}</option>
      </select>
      <span v-if="fieldErrors.perfilPsicologo" :id="`${formId}-profile-error`" role="alert" class="block text-xs leading-[1.5] text-foreground" :class="isDark ? 'bg-card rounded-lg px-2 py-1' : ''">{{ fieldErrors.perfilPsicologo }}</span>
    </label>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label class="space-y-1.5">
        <span :id="`${formId}-name-label`" class="sr-only">Tu nombre</span>
        <input
          v-model="form.nombre"
          autocomplete="given-name"
          :disabled="loading"
          :aria-labelledby="`${formId}-name-label`"
          :aria-invalid="!!fieldErrors.nombre"
          :aria-describedby="fieldErrors.nombre ? `${formId}-name-error` : undefined"
          class="w-full h-12 px-4 rounded-full transition-all"
          :class="[inputClass, fieldErrors.nombre && 'ring-1 ring-destructive']"
          placeholder="¿Cómo te llamas?"
        />
        <span v-if="fieldErrors.nombre" :id="`${formId}-name-error`" role="alert" class="block text-xs leading-[1.5] text-foreground" :class="isDark ? 'bg-card rounded-lg px-2 py-1' : ''">{{ fieldErrors.nombre }}</span>
      </label>

      <label class="space-y-1.5">
        <span :id="`${formId}-email-label`" class="sr-only">Correo electrónico</span>
        <input
          v-model="form.email"
          type="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          :disabled="loading"
          :aria-labelledby="`${formId}-email-label`"
          :aria-invalid="!!fieldErrors.email"
          :aria-describedby="fieldErrors.email ? `${formId}-email-error` : undefined"
          class="w-full h-12 px-4 rounded-full transition-all"
          :class="[inputClass, fieldErrors.email && 'ring-1 ring-destructive']"
          placeholder="Correo electrónico"
        />
        <span v-if="fieldErrors.email" :id="`${formId}-email-error`" role="alert" class="block text-xs leading-[1.5] text-foreground" :class="isDark ? 'bg-card rounded-lg px-2 py-1' : ''">{{ fieldErrors.email }}</span>
      </label>
    </div>

    <p v-if="error" ref="errorElement" role="alert" tabindex="-1" class="text-sm leading-[1.6] text-center text-foreground rounded-lg py-3 px-4 border" :class="isDark ? 'bg-card border-destructive/30' : 'bg-destructive/8 border-destructive/15'">
      {{ error }}
    </p>

    <button
      type="submit"
      :disabled="loading"
      class="w-full h-12 rounded-full font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      :class="submitButtonClass"
    >
      <Loader2 v-if="loading" :size="18" class="animate-spin" />
      <span>{{ loading ? "Guardando tus datos…" : submitLabel }}</span>
      <ArrowRight v-if="!loading" :size="18" />
    </button>
    <p class="text-xs text-center" :class="isDark ? 'text-white/50' : 'text-muted-foreground/70'">Usaremos estos datos para contactarte sobre el acceso temprano y conocer los perfiles interesados.</p>
  </form>
</template>
