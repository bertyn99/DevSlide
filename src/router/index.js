import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home.vue";

const routes = [
  {
    path: "",
    name: "home",
    component: Home,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
