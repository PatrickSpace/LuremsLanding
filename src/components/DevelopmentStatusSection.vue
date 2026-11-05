<script setup>
import { ArrowRight, Mail, MessageCircle } from "lucide-vue-next";

const emit = defineEmits(["open-waitlist"]);
</script>

<template>
  <section id="donde-estamos-hoy" class="development-section" aria-labelledby="development-status-title">
    <div class="development-panel">
      <div>
        <p class="eyebrow">Dónde estamos hoy</p>
        <h2 id="development-status-title">Estamos desarrollando Lurems.</h2>
        <p class="description">La plataforma todavía no está disponible. Apúntate gratis a la lista de acceso temprano y te avisaremos cuando abramos el acceso.</p>
        <p class="note">Aún no tenemos una fecha de lanzamiento.</p>
      </div>
      <button type="button" class="development-cta" @click="emit('open-waitlist')">
        Quiero recibir el aviso
        <ArrowRight :size="16" :stroke-width="1.5" aria-hidden="true" />
      </button>
      <div class="development-contact" role="group" aria-label="Contacto">
        <p>¿Tienes alguna pregunta?</p>
        <a href="mailto:jplosta01@gmail.com">
          <Mail :size="20" :stroke-width="1.5" aria-hidden="true" />
          <span>jplosta01@gmail.com</span>
        </a>
        <a href="https://wa.me/51994875357" target="_blank" rel="noopener noreferrer">
          <MessageCircle :size="20" :stroke-width="1.5" aria-hidden="true" />
          <span>WhatsApp · +51 994 875 357</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Official brand and neutral scale aliases, limited to the approved block. */
.development-section {
  --status-subtle: #EFF9F7;
  --status-border: #C8EDE8;
  --status-action: #2A6C63;
  --status-hover: #1F504A;
  --status-muted: #426460;
  max-width: 1440px;
  margin-inline: auto;
  padding: 80px;
  scroll-margin-top: 68px;
  color: var(--foreground);
}
.development-panel { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 48px; align-items: center; padding: 40px; border: 1px solid var(--status-border); border-radius: var(--radius); background: var(--status-subtle); }
.eyebrow { margin: 0 0 12px; color: var(--status-action); font-size: 12px; line-height: 1.4; font-weight: 600; }
h2 { margin: 0 0 16px; font-size: 28px; font-weight: 700; line-height: 1.25; }
.description { max-width: 640px; margin: 0; font-size: 16px; line-height: 1.65; }
.note { margin: 12px 0 0; font-size: 14px; line-height: 1.6; color: var(--status-muted); }
.development-cta { display: inline-flex; justify-content: center; align-items: center; gap: 12px; min-height: 56px; padding: 16px 24px; border: 0; border-radius: 20px; color: var(--card); background: var(--status-action); font-family: inherit; font-size: 14px; font-weight: 600; line-height: 1; cursor: pointer; }
.development-cta:hover { background: var(--status-hover); }
.development-cta:active { background: var(--foreground); }
.development-cta:focus-visible { outline: 2px solid var(--foreground); outline-offset: 4px; }
.development-cta svg { flex: 0 0 auto; }
.development-contact { grid-column: 1 / -1; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 32px; padding-top: 24px; border-top: 1px solid var(--status-border); font-size: 14px; line-height: 1.6; }
.development-contact p { margin: 0; font-weight: 500; }
.development-contact a { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; color: var(--status-action); text-decoration: underline; text-underline-offset: 4px; overflow-wrap: anywhere; }
.development-contact svg { flex: 0 0 auto; }
.development-contact a span { min-width: 0; }
.development-contact a:hover { color: var(--status-hover); text-decoration-thickness: 2px; }
.development-contact a:active { color: var(--foreground); }
.development-contact a:focus-visible { outline: 2px solid var(--foreground); outline-offset: 4px; border-radius: 4px; }
@media (max-width: 1439px) {
  .development-section { padding: 64px; }
  .development-panel { gap: 32px; }
}
@media (max-width: 1279px) {
  .development-section { padding-inline: 48px; }
  .development-panel { grid-template-columns: 1fr; }
}
@media (max-width: 1023px) { .development-section { padding-inline: 32px; } }
@media (max-width: 767px) {
  .development-section { padding: 40px 16px; }
  .development-panel { padding: 24px; gap: 24px; }
  .development-cta { width: 100%; padding-inline: 16px; }
  .development-contact { flex-direction: column; align-items: flex-start; gap: 4px; }
}
</style>
