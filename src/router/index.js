import { createRouter, createWebHistory } from "vue-router";
import UserCreateView from "../views/UserCreateView.vue";

const routes = [
  {
    path: "/",
    name: "usercreate",
    component: UserCreateView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
