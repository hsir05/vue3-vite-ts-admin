import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { createRouterGuard } from "./routeGuard"
import { RootRoute, LoginRoute, RedirectRoute, ErrorPageRoute } from "@/routes/base";
import { isArray } from "lodash-es";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

// 类型待优化
function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}
routeModuleList.sort(sortRoute);

//需要验证权限
export const asyncRoutes = [...routeModuleList];

//无需验证权限
export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute, ErrorPageRoute];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH as string),
//   history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes: [...routeModuleList, ...constantRouter],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  createRouterGuard(router);
}

export default router;
