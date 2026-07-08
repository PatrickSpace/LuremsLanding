import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import { trackPageView } from "./services/analytics.js";

const routes = [
  { path: "/", component: Home },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  trackPageView(to);
});

export default router;
