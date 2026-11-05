<script setup>
import { ArrowRight, CalendarCheck, CreditCard, LibraryBig, UserRoundPlus } from "lucide-vue-next";

const emit = defineEmits(["open-waitlist"]);
const features = [
  {
    icon: UserRoundPlus,
    title: "Consigue nuevos pacientes",
    description: "Crea tu perfil para que las personas que buscan atención puedan encontrarte según tu especialidad y forma de trabajar.",
  },
  {
    icon: CalendarCheck,
    title: "Automatiza tus citas y recordatorios",
    description: "Tus pacientes podrán reservar según tu disponibilidad y recibir recordatorios automáticos antes de cada sesión.",
  },
  {
    icon: CreditCard,
    title: "Deja los cobros en nuestras manos",
    description: "Lurems gestionará los cobros y te mostrará el estado de tus pagos, para que no tengas que perseguir cada pendiente.",
  },
  {
    icon: LibraryBig,
    title: "Comparte recursos para cada paciente",
    description: "Personaliza ejercicios, materiales y herramientas para que cada paciente pueda trabajarlos y consultarlos entre sesiones.",
  },
];
</script>

<template>
  <section id="para-psicologos" class="psychologists-section" aria-labelledby="professional-title">
    <div class="professional-grid">
      <div class="professional-summary">
        <p class="eyebrow">Para psicólogos</p>
        <h2 id="professional-title"><span>Más pacientes.</span> <span class="emphasis">Menos pendientes.</span></h2>
        <p class="intro">Estamos creando Lurems para ayudarte a conseguir pacientes, automatizar tu consulta y acompañar cada proceso con recursos personalizados.</p>
        <button type="button" class="professional-cta" aria-describedby="psychologists-access-note" @click="emit('open-waitlist', 'Psicólogo')">
          Quiero sumarme como psicólogo
          <ArrowRight :size="16" :stroke-width="1.5" aria-hidden="true" />
        </button>
        <p id="psychologists-access-note" class="access-note">Únete a la lista de acceso temprano. Te avisaremos cuando puedas probar Lurems.</p>
      </div>

      <div class="professional-features" aria-labelledby="professional-features-title">
        <p class="eyebrow">Funcionalidades previstas</p>
        <h3 id="professional-features-title">Tu consulta, organizada de principio a fin.</h3>
        <p class="features-intro">Así queremos ayudarte cuando Lurems esté disponible.</p>
        <div class="professional-cards">
          <article v-for="feature in features" :key="feature.title">
            <div class="feature-icon">
              <component :is="feature.icon" :size="24" :stroke-width="1.5" aria-hidden="true" />
            </div>
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.description }}</p>
          </article>
        </div>
        <p class="development">Estas funcionalidades están en desarrollo y todavía no están disponibles.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Official professional color scale and shadow.s from the Brand System. */
.psychologists-section {
  --professional-action: #6358B8;
  --professional-hover: #4D44A0;
  --professional-active: #383188;
  --professional-subtle: #F0EEFF;
  --professional-border: #DDD9FF;
  --professional-muted: #426460;
  --professional-shadow: 0 2px 8px rgba(26,58,56,.08), 0 1px 3px rgba(26,58,56,.05);
  max-width: 1440px;
  margin-inline: auto;
  padding: 80px;
  scroll-margin-top: 68px;
  color: var(--foreground);
}
.professional-grid { display: grid; grid-template-columns: minmax(0, .82fr) minmax(0, 1.25fr); align-items: center; gap: 64px; }
.eyebrow { margin: 0 0 16px; color: var(--professional-hover); font-size: 12px; line-height: 1.4; font-weight: 600; }
h2 { margin: 0 0 24px; font-size: 44px; font-weight: 700; line-height: 1.15; letter-spacing: -.02em; }
h2 span { display: block; }
h2 .emphasis { color: var(--professional-action); }
.intro { max-width: 440px; margin: 0 0 32px; font-size: 18px; line-height: 1.7; color: var(--professional-muted); }
.professional-cta { display: inline-flex; align-items: center; justify-content: center; gap: 12px; padding: 16px 24px; min-height: 56px; border: 0; border-radius: 20px; background: var(--professional-action); color: white; font-family: inherit; font-size: 14px; font-weight: 600; line-height: 1; cursor: pointer; text-align: center; }
.professional-cta:hover { background: var(--professional-hover); }
.professional-cta:active { background: var(--professional-active); }
.professional-cta:focus-visible { outline: 2px solid var(--professional-active); outline-offset: 4px; }
.professional-cta svg { flex: 0 0 auto; }
.access-note { max-width: 352px; margin: 16px 0 0; font-size: 12px; line-height: 1.5; color: var(--professional-muted); }
.professional-features { min-width: 0; padding: 32px; border-radius: 20px; background: var(--professional-subtle); border: 1px solid var(--professional-border); }
.professional-features .eyebrow { margin-bottom: 12px; }
h3 { margin: 0 0 12px; font-size: 22px; line-height: 1.3; font-weight: 600; }
.features-intro { margin: 0 0 24px; color: var(--professional-muted); font-size: 14px; line-height: 1.6; }
.professional-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
article { min-width: 0; padding: 24px; border-radius: 12px; background: var(--card); box-shadow: var(--professional-shadow); }
.feature-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 8px; background: var(--professional-subtle); color: var(--psychologist); margin-bottom: 20px; }
h4 { margin: 0 0 12px; font-size: 18px; font-weight: 600; line-height: 1.35; text-wrap: pretty; }
article p { margin: 0; color: var(--professional-muted); font-size: 14px; line-height: 1.6; }
.development { margin: 24px 0 0; font-size: 12px; line-height: 1.5; color: var(--professional-muted); }
@media (max-width: 1439px) {
  .psychologists-section { padding: 64px; }
  .professional-grid { gap: 40px; }
  h2 { font-size: 36px; line-height: 1.2; }
  .professional-features { padding: 24px; }
  article { padding: 20px; }
}
@media (max-width: 1279px) {
  .psychologists-section { padding: 64px 48px; }
  .professional-grid { grid-template-columns: 1fr; gap: 40px; }
  .intro { max-width: 640px; }
  h2 span { display: inline; }
  article { padding: 24px; }
}
@media (max-width: 1023px) { .psychologists-section { padding-inline: 32px; } }
@media (max-width: 767px) {
  .psychologists-section { padding: 40px 16px; }
  .professional-grid { gap: 32px; }
  h2 { font-size: 36px; line-height: 1.2; }
  h2 span { display: block; }
  .intro { font-size: 16px; line-height: 1.65; margin-bottom: 24px; }
  .professional-cta { width: 100%; padding-inline: 16px; }
  .access-note { max-width: none; }
  .professional-features { padding: 20px; }
  .professional-cards { grid-template-columns: 1fr; }
  article { padding: 20px; }
  .feature-icon { margin-bottom: 16px; }
}
@media (max-width: 374px) { h2 { font-size: 28px; line-height: 1.25; } }
</style>
