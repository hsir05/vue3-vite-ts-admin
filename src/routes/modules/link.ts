import { OVERALL_LAYOUT } from "@/framework/layout";
import { RouteRecordRaw } from "vue-router";

const AboutRoute: RouteRecordRaw = {
  path: "/link",
  name: "routes.link.link",
  component: OVERALL_LAYOUT,
  meta: {
    title: "routes.link.link",
    icon: "link",
    hideMenu: true,
    sort: 7,
    link: true,
  },
  children: [
    {
      path: "https://www.baidu.com",
      name: "routes.link.link",
      component: () => import("@/views/link/index.vue"),
      meta: {
        title: "routes.link.link",
        link: true,
      },
    },
  ],
};

export default AboutRoute;
