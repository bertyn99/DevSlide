import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: "",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
