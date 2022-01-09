import { OVERALL_LAYOUT } from "@/framework/layout";
import { RouteRecordRaw } from "vue-router";

const HomeRoute: RouteRecordRaw = {
  path: "/dashboard",
  component: OVERALL_LAYOUT,
  redirect: "/dashboard/welcome",
  name: "Dashboard",
  meta: {
    title: "routes.dashboard.dashboard",
    icon: "dashboard",
    sort: 1,
  },
  children: [
    {
      path: "/dashboard/welcome",
      name: "欢迎",
      component: () => import("@/views/dashboard/welcome/Welcome.vue"),
      meta: {
        title: "routes.dashboard.welcome",
        sort: 1,
      },
    },
    {
      path: "/dashboard/workbench",
      name: "工作台",
      component: () => import("@/views/dashboard/workbench/Workbench.vue"),
      meta: {
        sort: 2,
        keepAlive: true,
        title: "routes.dashboard.workbench",
      },
    },
  ],
};

export default HomeRoute;
