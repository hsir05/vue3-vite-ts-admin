import { toRaw } from "vue";
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { locStorage } from "@/utils/Storage";
import { MENUS_KEY } from "@/config/config";
import { Menu } from "@/routes/types";
import { generatorAsyncMenu } from "../../../routes/generatorData";
import { constantRouter } from "@/routes/index";

interface AsyncMenuState {
  menus: Menu[];
  routers: RouteRecordRaw[];
  addRouters: RouteRecordRaw[];
  keepAliveComponents: string[];
  loading:boolean
}

export const useAsyncMenuStore = defineStore({
  id: "app-async-menus",
  state: (): AsyncMenuState => ({
    menus: locStorage.get(MENUS_KEY) || [],
    // menus:  [],
    routers: constantRouter,
    addRouters: [],
    keepAliveComponents: [],
    loading: true,
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    setMenus(menus: Menu[]) {
      this.menus = menus;
       
       this.loading = false;
    },
    getCurentRouteParent(path: string) {
      let item: Menu[] = [];
      for (let key of this.menus) {
        if (!key.meta.single && path.indexOf(key.path) !== -1) {
          item.push(key);
          break;
        }
      }
      return item;
    },
    setRouters(routers: RouteRecordRaw[]) {
      this.addRouters = routers;
      this.routers = constantRouter.concat(routers);
    },
    setKeepAliveComponents(compNames: string[]) {
      this.keepAliveComponents = compNames;
    },
    async asyncMenu() {
        try {
            let list = await generatorAsyncMenu();
           locStorage.set(MENUS_KEY, list);
            this.setMenus(list);
        } catch (error) {
            console.log(error);
        }
    },
  },
});
