import { OVERALL_LAYOUT } from "@/framework/layout";
import { RouteRecordRaw } from "vue-router";

const AboutRoute: RouteRecordRaw = {
  path: "/about",
  name: "routes.about.about",
  component: OVERALL_LAYOUT,
  redirect: "/about",
  meta: {
    title: "routes.about.about",
    icon: "about",
    sort: 6,
    single: true,
  },
  children: [
    {
      path: "/about",
      name: "routes.about.about",
      component: () => import("@/views/about/About.vue"),
      meta: {
        title: "routes.about.about",
        sort: 6,
        single: true,
      },
    },
  ],
};

export default AboutRoute;
