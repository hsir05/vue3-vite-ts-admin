import { asyncRoutes } from "./index";
import { cloneDeep } from "lodash-es";
import { RouteRecordRaw } from "vue-router";
import { Menu } from "./types";

/**
 * 获取路由
 * 请求获取数据
 * @returns {Promise<Router>}
 */
// export const generataorAsyncRoutes = (): Promise<RouteRecordRaw[]> => {
//   return new Promise((resolve, reject) => {
//     let routes: RouteRecordRaw[] = [];
//     resolve(routes);
//   });
// };
/**
 * 生成菜单
 * @returns {Promise<Router>}
 */
export const generatorAsyncMenu = (): Promise<Menu[]> => {
  return new Promise((resolve) => {
    let asyncMenu: Menu[] = routerGenerator(cloneDeep(asyncRoutes));
    setTimeout(() => {
      resolve(asyncMenu);
    }, 1000);
  });
};

/**
 * 路由数据转换成菜单数据
 * @param routerMap
 * @param parent
 * @returns {*}
 */
// @ts-ignore
export const routerGenerator = (routerMap: RouteRecordRaw[], parent?: Menu): Menu[] => {
  return routerMap.map((item) => {
    if (item.meta && item.children) {
      if (item.meta.single || item.meta.link) {
        let child = item.children[0];
        let singleMenu: Menu = {
          path: child.path,
          name: child.name as string,
          meta: {
            ...child.meta,
            icon: item.meta?.icon,
          },
        };
        return singleMenu;
      }
    }

    const currentRouter: Menu = {
      path: item.path,
      name: item.meta ? item.meta.title : "",
      meta: {
        ...item.meta,
        title: item.meta?.title,
        keepAlive: item.meta?.keepAlive,
        icon: item.meta?.icon || undefined,
      },
    };

    item.redirect && (currentRouter.redirect = item.redirect as string);

    if (item.children && item.children.length > 0) {
      currentRouter.children = routerGenerator(item.children, currentRouter);
    }
    return currentRouter;
  });
};
