import type { RouteLocationNormalized } from "vue-router";
import { defineStore } from "pinia";
import { locStorage } from "@/utils/Storage";
import { MULTIPLE_TABS_KEY } from "@/config/config";
import { PageEnum } from "@/enums/pageEnum";

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: string;
};

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteItem[];
}
const whiteList = ["Redirect", "login"];

export const useMultipleTabStore = defineStore({
  id: "app-multiple-tab",
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: locStorage.get(MULTIPLE_TABS_KEY) || []
  }),
  getters: {
    getTabList(): RouteItem[] {
      return this.tabList;
    }
  },
  actions: {
    initTabs(routes: RouteItem[]) {
      this.tabList = routes;
    },
    addTab(route: RouteItem): boolean {
      // 添加标签页
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabList.push(route);
      }
      return true;
    },
    closeCurrentTab(route: RouteItem) {
      return new Promise((resolve) => {
        const index = this.tabList.findIndex((item) => item.fullPath == route.fullPath);
        this.tabList.splice(index, 1);
        resolve(this.tabList);
      });
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    closeAllTab(route: RouteItem) {
      if (route.fullPath === PageEnum.BASE_HOME) {
        this.tabList = this.tabList.filter((item) => item.fullPath === PageEnum.BASE_HOME);
      } else {
        this.tabList = [];
      }
      locStorage.set(MULTIPLE_TABS_KEY, this.tabList);
    },
    closeOtherTabs(route: RouteItem) {
      if (this.tabList.length === 2 && route.fullPath !== PageEnum.BASE_HOME) {
        return false;
      }
      this.tabList = this.tabList.filter(
        (item) => item.fullPath == route.fullPath || item.fullPath === PageEnum.BASE_HOME
      );
    },
  },
});
