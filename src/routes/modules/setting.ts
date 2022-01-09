import { RouteRecordRaw } from "vue-router";
import { OVERALL_LAYOUT } from "@/framework/layout";

const HomeRoute: RouteRecordRaw = {
  path: "/setting",
  component: OVERALL_LAYOUT,
  redirect: "/setting/menu",
  name: "routes.setting.system",
  meta: {
    title: "routes.setting.system",
    icon: "system",
    sort: 2,
  },
  children: [
    {
      path: "/setting/menu",
      name: "routes.setting.menu",
      component: () => import("@/views/setting/menu/Menu.vue"),
      meta: {
        sort: 1,
        keepAlive: true,
        title: "routes.setting.menu",
      },
    },
    {
      path: "/setting/auth",
      name: "routes.setting.auth",
      component: () => import("@/views/setting/auth/Auth.vue"),
      meta: {
        title: "routes.setting.auth",
        keepAlive: true,
        sort: 2,
      },
    },
    {
      path: "/setting/account",
      name: "routes.setting.account",
      component: () => import("@/views/setting/account/Account.vue"),
      meta: {
        title: "routes.setting.account",
        keepAlive: true,
        sort: 2,
      },
    },
  ],
};

export default HomeRoute;
