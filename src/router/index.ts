import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Authguard from "./authguard.guard";

export enum Routes {
  Login = "Login",
  Home = "Home"
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: Routes.Home,
    component: Home,
    beforeEnter: Authguard
  },
  {
    path: "/login",
    name: Routes.Login,
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: Authguard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
