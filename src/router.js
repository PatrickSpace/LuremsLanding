import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import SimplePage from "./pages/SimplePage.vue";
import NotFound from "./pages/NotFound.vue";
import { pages } from "./data/site.js";
import { trackEvent } from "./services/analytics.js";

const routes = [
  { path: "/", component: Home },
  ...Object.entries(pages).map(([path, page]) => ({
    path,
    component: SimplePage,
    props: { page },
  })),
  { path: "/:pathMatch(.*)*", component: NotFound },
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
  trackEvent("page_view", {
    page_path: to.fullPath,
    page_title: document.title,
  });
});

export default router;
