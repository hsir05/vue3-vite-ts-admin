import { REDIRECT_NAME, OVERALL_LAYOUT, ErrorPage } from "./constant";
import type { RouteRecordRaw } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";

export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const ErrorPageRoute: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: OVERALL_LAYOUT,
  meta: {
    title: "ErrorPage",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "ErrorPage",
      component: ErrorPage,
      meta: {
        title: "ErrorPage",
        hideBreadcrumb: true,
      },
    },
  ],
};
export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: "routes.login.login",
  },
};


export const RedirectRoute: RouteRecordRaw = {
  path: "/redirect",
  name: REDIRECT_NAME,
  component: OVERALL_LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("@/views/redirect/index.vue"),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
};
