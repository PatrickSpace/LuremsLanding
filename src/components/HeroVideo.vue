<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { ArrowDown, ArrowRight, HeartHandshake, Pause, Play } from "lucide-vue-next";

const emit = defineEmits(["request-access"]);
const scenes = [
  { id: "solo", position: "72% center" },
  { id: "triste", position: "54% center" },
  { id: "agotado", position: "52% center" },
  { id: "abrumado", position: "35% center" },
  { id: "estresado", position: "45% center" },
  { id: "perdido", position: "68% center" },
  { id: "incomprendido", position: "65% center" },
];
const emotions = scenes.map((scene, index) => ({ word: scene.id, scene: index }));
const SCENE_DURATION_MS = 5000;
const INITIAL_PRELOAD_DELAY_MS = 3000;
const VIDEO_VERSION = "v2";
const emotionIndex = ref(0);
const activeSlot = ref(0);
const slots = ref([0, 1]);
const hero = ref(null);
const videos = [];
const playing = ref(false);
const canLoadVideo = ref(false);
const loadedSlots = ref([false, false]);
let emotionTimer;
let preloadTimer;
let fadeTimer;
let playbackController;
let motionPreference;
let visibilityObserver;
let heroVisible = true;
let userPaused = false;
let motionOptIn = false;

// Un video precargado puede tener metadatos sin haber decodificado una imagen.
// No retiramos la escena actual hasta confirmar reproducción y primer fotograma.
function playFirstFrame(video, signal) {
  return new Promise((resolve, reject) => {
    let frameId;
    let settled = false;
    const cleanup = () => {
      window.clearTimeout(timeout);
      video.removeEventListener("error", onError);
      signal.removeEventListener("abort", onAbort);
      if (frameId !== undefined) video.cancelVideoFrameCallback?.(frameId);
    };
    const finish = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) {
        video.pause();
        reject(error);
      } else resolve();
    };
    const onError = () => finish(new Error(`No se pudo cargar ${video.dataset.scene}`));
    const onAbort = () => finish(new DOMException("Reproducción cancelada", "AbortError"));
    const timeout = window.setTimeout(() => finish(new Error("El video no está listo")), 10000);
    video.addEventListener("error", onError, { once: true });
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) return onAbort();
    video.muted = true;
    video.defaultMuted = true;
    video.play().then(() => {
      if (settled) return;
      if (video.requestVideoFrameCallback) {
        frameId = video.requestVideoFrameCallback(() => finish());
      } else if (video.readyState >= 2) finish();
      else onError();
    }).catch(finish);
  });
}

function pauseSequence() {
  playing.value = false;
  playbackController?.abort();
  window.clearTimeout(emotionTimer);
  window.clearTimeout(preloadTimer);
  window.clearTimeout(fadeTimer);
  videos.forEach(video => video?.pause());
}

function prepareNextScene() {
  const nextSlot = 1 - activeSlot.value;
  slots.value[nextSlot] = (emotionIndex.value + 1) % scenes.length;
  loadedSlots.value[nextSlot] = true;
}

function scheduleNextScene(delay = SCENE_DURATION_MS) {
  window.clearTimeout(emotionTimer);
  emotionTimer = window.setTimeout(advanceEmotion, delay);
}

async function advanceEmotion() {
  const controller = playbackController;
  if (!playing.value || controller.signal.aborted) return;
  const nextIndex = (emotionIndex.value + 1) % scenes.length;
  const incomingSlot = 1 - activeSlot.value;
  prepareNextScene();
  await nextTick();
  const incoming = videos[incomingSlot];
  try {
    if (incoming.error) incoming.load();
    incoming.currentTime = 0;
    await playFirstFrame(incoming, controller.signal);
    if (controller.signal.aborted) return;
    const outgoing = videos[activeSlot.value];
    activeSlot.value = incomingSlot;
    emotionIndex.value = nextIndex;
    fadeTimer = window.setTimeout(() => {
      outgoing.pause();
      prepareNextScene();
    }, 600);
    scheduleNextScene();
  } catch (error) {
    if (controller.signal.aborted) return;
    console.warn("Lurems: se conserva la escena actual mientras se reintenta el siguiente video.", error);
    scheduleNextScene(2000);
  }
}

async function resumeSequence() {
  if (playing.value || userPaused || !heroVisible || document.hidden ||
      (motionPreference.matches && !motionOptIn)) return;
  const controller = new AbortController();
  playbackController = controller;
  canLoadVideo.value = true;
  playing.value = true;
  loadedSlots.value[activeSlot.value] = true;
  await nextTick();
  try {
    const current = videos[activeSlot.value];
    if (current.error) current.load();
    await playFirstFrame(current, controller.signal);
    if (!controller.signal.aborted) {
      // Primero se presenta el fondo actual. El siguiente recibe URL después,
      // con dos segundos de margen nominal; si no llega, el actual sigue en bucle.
      preloadTimer = window.setTimeout(() => {
        if (!controller.signal.aborted) prepareNextScene();
      }, INITIAL_PRELOAD_DELAY_MS);
      scheduleNextScene();
    }
  } catch {
    if (!controller.signal.aborted) pauseSequence();
  }
}

function syncMotionPreference() {
  motionOptIn = false;
  pauseSequence();
  canLoadVideo.value = !motionPreference.matches;
  if (motionPreference.matches) loadedSlots.value = [false, false];
  resumeSequence();
}

function togglePlayback() {
  if (playing.value) {
    userPaused = true;
    pauseSequence();
  } else {
    userPaused = false;
    motionOptIn = true;
    resumeSequence();
  }
}

function syncVisibility() {
  if (document.hidden) pauseSequence();
  else resumeSequence();
}

onMounted(() => {
  motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  syncMotionPreference();
  motionPreference.addEventListener("change", syncMotionPreference);
  document.addEventListener("visibilitychange", syncVisibility);
  visibilityObserver = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    if (!heroVisible) pauseSequence();
    else resumeSequence();
  });
  visibilityObserver.observe(hero.value);
});

onUnmounted(() => {
  pauseSequence();
  motionPreference?.removeEventListener("change", syncMotionPreference);
  document.removeEventListener("visibilitychange", syncVisibility);
  visibilityObserver?.disconnect();
});
</script>

<template>
  <section ref="hero" class="video-hero" aria-labelledby="hero-title">
    <video
      v-for="(sceneIndex, index) in slots"
      :key="index"
      :ref="element => { videos[index] = element; }"
      class="video-hero__film"
      :class="{ 'video-hero__film--active': index === activeSlot }"
      :style="{ objectPosition: scenes[sceneIndex].position }"
      :src="canLoadVideo && loadedSlots[index] ? `/media/lurems-${scenes[sceneIndex].id}-${VIDEO_VERSION}.mp4` : undefined"
      :poster="`/media/lurems-${scenes[sceneIndex].id}-poster.jpg`"
      :data-scene="scenes[sceneIndex].id"
      preload="auto"
      muted loop playsinline
      aria-hidden="true" tabindex="-1"
    />
    <div class="video-hero__filter" aria-hidden="true" />

    <div class="video-hero__inner">
      <div class="video-hero__copy">
        <p class="video-hero__eyebrow"><span /> En desarrollo · Acceso temprano</p>
        <h1 id="hero-title" :aria-label="`¿Te sientes ${emotions[emotionIndex].word}?`">
          <span class="hero-title__intro" aria-hidden="true">¿Te sientes</span>
          <span class="hero-title__word" aria-hidden="true">
            <span class="hero-title__sizer">incomprendido?</span>
            <Transition name="emotion" mode="out-in">
              <span :key="emotionIndex" class="hero-title__entry"><span class="hero-title__gradient">{{ emotions[emotionIndex].word }}</span>?</span>
            </Transition>
          </span>
        </h1>
        <p class="video-hero__statement">Pedir ayuda no tiene<br class="hidden sm:block" /> nada de malo.</p>
        <p class="video-hero__description">
          Estamos creando un espacio para encontrar al psicólogo adecuado,
          organizar tu terapia y reconocer tus avances, dentro y fuera de cada sesión.
        </p>
        <div class="video-hero__actions">
          <button class="video-hero__primary" @click="emit('request-access')">
            Solicitar acceso temprano <ArrowRight :size="19" />
          </button>
          <RouterLink to="/#como-funciona" class="video-hero__secondary">Ver cómo funciona <ArrowRight :size="17" /></RouterLink>
        </div>
        <p class="video-hero__note">Un primer paso, a tu ritmo.</p>
      </div>

      <div class="video-hero__footer">
        <RouterLink to="/#como-funciona" class="video-hero__discover"><ArrowDown :size="17" /> Descubre tu próximo paso</RouterLink>
        <p class="video-hero__signature"><HeartHandshake :size="20" /> Claridad en tu camino terapéutico</p>
        <button class="video-hero__playback" :aria-label="playing ? 'Pausar secuencia de fondo' : 'Reproducir secuencia de fondo'" @click="togglePlayback">
          <Pause v-if="playing" :size="15" /><Play v-else :size="15" />
          <span>{{ playing ? 'Pausar' : 'Reproducir' }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-hero { position: relative; isolation: isolate; min-height: 100svh; background: #122e2a; color: #fff; overflow: hidden; }
.video-hero__film, .video-hero__filter { position: absolute; inset: 0; width: 100%; height: 100%; }
.video-hero__film { object-fit: cover; filter: saturate(.58) brightness(.88); z-index: -2; opacity: 0; transition: opacity 600ms ease; }
.video-hero__film--active { opacity: 1; }
.video-hero__filter {
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(8,30,27,.72), rgba(8,30,27,.38) 40%, transparent 75%),
    linear-gradient(110deg, rgba(40,113,98,.68) 5%, rgba(54,119,111,.50) 35%, rgba(123,93,181,.65) 95%),
    linear-gradient(0deg, rgba(12,22,29,.78), transparent 28%, transparent 75%, rgba(12,22,29,.40));
}
.video-hero__inner { max-width: 1280px; margin: auto; padding: 144px 32px 30px; min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
.video-hero__copy { max-width: 650px; margin-block: auto; padding: 35px 0 65px; }
.video-hero__eyebrow { display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase; color: #c7e2d9; margin-bottom: 30px; }
.video-hero__eyebrow span { width: 7px; height: 7px; border-radius: 50%; background: #9cdcca; box-shadow: 0 0 0 5px #9cdcca14; }
h1 { font-size: clamp(3rem, 5.1vw, 4.7rem); line-height: 1.1; font-weight: 650; letter-spacing: -.055em; margin: 0 0 23px; }
.hero-title__intro { display: block; }
.hero-title__word { display: inline-grid; vertical-align: top; }
.hero-title__sizer, .hero-title__entry { grid-area: 1 / 1; white-space: nowrap; }
.hero-title__sizer { visibility: hidden; }
.emotion-enter-active, .emotion-leave-active { transition: opacity 180ms ease; }
.emotion-enter-from, .emotion-leave-to { opacity: 0; }
.hero-title__gradient {
  color: #a4dfcc;
  background: linear-gradient(110deg, #a4dfcc 5%, #81c9bd 35%, #b5a0ef 95%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.video-hero__statement { font-size: clamp(1.9rem, 3.15vw, 2.85rem); line-height: 1.2; font-weight: 500; letter-spacing: -.035em; margin-bottom: 24px; }
.video-hero__description { max-width: 510px; color: #e0eae6; font-size: 16px; line-height: 1.85; margin-bottom: 32px; }
.video-hero__actions { display: flex; align-items: center; gap: 25px; }
.video-hero__primary, .video-hero__secondary { display: inline-flex; align-items: center; justify-content: center; gap: 12px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
.video-hero__primary { padding: 19px 25px; border-radius: 999px; background: #a4dfcc; color: #123c32; cursor: pointer; }
.video-hero__primary:hover { background: #c2efdf; }
.video-hero__secondary { color: white; padding: 15px 0; border-bottom: 1px solid #ffffff50; }
.video-hero__secondary:hover { border-color: white; }
.video-hero__note { font-size: 12px; color: #bed3ca; margin-top: 20px; }
.video-hero__footer { border-top: 1px solid #ffffff26; padding-top: 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; color: #e0eae6; font-size: 11px; }
.video-hero__discover, .video-hero__signature, .video-hero__playback { display: inline-flex; align-items: center; gap: 10px; }
.video-hero__signature { margin-left: auto; }
.video-hero__playback { border: 1px solid #ffffff40; border-radius: 999px; padding: 10px 14px; color: white; background: #123c3266; cursor: pointer; }
.video-hero__playback:hover { background: #123c32; }
@media (min-width: 1600px) { .video-hero__inner { max-width: 1440px; } }
@media (max-width: 767px) {
  .video-hero__inner { padding: 110px 24px 22px; }
  .video-hero__copy { padding: 25px 0 45px; }
  .video-hero__filter {
    background:
      linear-gradient(90deg, rgba(8,30,27,.68), rgba(8,30,27,.38)),
      linear-gradient(110deg, rgba(40,113,98,.72) 5%, rgba(54,119,111,.58) 35%, rgba(123,93,181,.70) 95%),
      linear-gradient(0deg, rgba(12,22,29,.80), transparent 65%);
  }
  .video-hero__eyebrow { font-size: 9px; letter-spacing: .11em; margin-bottom: 25px; }
  h1 { font-size: clamp(1.75rem, 8vw, 3.6rem); }
  .video-hero__statement { font-size: 1.85rem; }
  .video-hero__description { font-size: 14px; line-height: 1.8; }
  .video-hero__actions { flex-direction: column; align-items: flex-start; gap: 8px; }
  .video-hero__primary { width: 100%; font-size: 12px; }
  .video-hero__secondary { font-size: 12px; }
  .video-hero__signature { display: none; }
  .video-hero__footer { font-size: 10px; gap: 12px; padding-top: 18px; }
  .video-hero__playback { padding: 10px; }
  .video-hero__playback span { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .emotion-enter-active, .emotion-leave-active, .video-hero__film { transition: none; }
}
</style>
