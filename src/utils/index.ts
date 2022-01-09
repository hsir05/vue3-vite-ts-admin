
import type { RouteRecordNormalized } from "vue-router";
import { Menu as MenuTypes } from "@/routes/types";
import { RouteItem } from "@/framework/store/modules/useMultipleTabStore"

export function getRawRoute(route: RouteItem): RouteItem {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const getParentPath = (menu: MenuTypes[], path: string): string => {
  let parentPath = "";
  for (let key of menu) {
    if (key.children && key.children.length > 0) {
      for (let val of key.children) {
        if (val.path === path) {
          parentPath = key.path;
        }
      }
    } else if (key.path === path) {
      parentPath = path;
    }
  }
  return parentPath;
};