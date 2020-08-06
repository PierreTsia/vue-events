import store from "@/store";
import { Route } from "vue-router";
import { Routes } from "@/router/index";

export default async (to: Route, from: Route, next: Function) => {
  console.log({ to, from });
  await store.dispatch("getCurrentUser");
  switch (to.name) {
    case Routes.Login:
      return store.getters.isAuth ? next({ path: "/" }) : next();
    case Routes.Home:
      return store.getters.isAuth ? next() : next({ path: "/login" });
  }
};
