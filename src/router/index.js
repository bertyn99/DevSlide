import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home.vue";
import Presentation from "../pages/presentation.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: Home,
  },
  {
    path: "/presentation",
    name: "presentation",
    component: Presentation,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
