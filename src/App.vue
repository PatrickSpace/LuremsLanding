<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import WaitlistModal from "./components/WaitlistModal.vue";
import { trackEvent } from "./services/analytics.js";

const modalOpen = ref(false);
const defaultType = ref("Paciente");

function openWaitlist(type = "Paciente") {
  defaultType.value = type;
  modalOpen.value = true;
  trackEvent("open_lead_form", {
    tipo_usuario: type,
    page_path: window.location.pathname + window.location.hash,
  });
}
</script>

<template>
  <Navbar @open-waitlist="openWaitlist" />
  <main>
    <RouterView @open-waitlist="openWaitlist" />
  </main>
  <Footer @open-waitlist="openWaitlist" />
  <WaitlistModal v-model:open="modalOpen" :default-type="defaultType" />
</template>
