import { RouteRecordRaw } from 'vue-router';
import { OVERALL_LAYOUT } from "@/framework/layout";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/exception",
    name: "routes.exception.exception",
    redirect: "/exception/403",
    component: OVERALL_LAYOUT,
    meta: {
      title: "routes.exception.exception",
      icon: "file -exception",
      sort: 3,
    },
    children: [
      {
        path: "/exception/403",
        name: "403",
        meta: {
          sort: 1,
          keepAlive: true,
          title: "routes.exception.error",
        },
        component: () => import("@/views/exception/403.vue"),
      },
      {
        path: "/exception/404",
        name: "404",
        meta: {
          sort: 2,
          keepAlive: true,
          title: "routes.exception.notFound",
        },
        component: () => import("@/views/exception/404.vue"),
      },
      {
        path: "/exception/500",
        name: "500",
        meta: {
          sort: 3,
          keepAlive: true,
          title: "routes.exception.serveErr",
        },
        component: () => import("@/views/exception/500.vue"),
      },
    ],
  },
];

export default routes;
