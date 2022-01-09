import { defineStore } from "pinia";
import { IAppConfig } from "@/framework/config/type/IAppConfig"
import { appConfig } from "@/framework/config/AppConfig"
import { merge } from "lodash-es";
import { RouterTransitionEnum } from "../../config/enum/Enum";
import { locStorage } from "@/utils/Storage"
import { PROJECT_CONFIG } from "@/config/config"

interface AppState {
    projectConfig:IAppConfig
}

export const useAppStore = defineStore({
  id: "useAppStore",
  state: (): AppState => ({
    projectConfig: locStorage.get(PROJECT_CONFIG) || appConfig,
  }),
  getters: {
    getMultipTabsShowFold(): boolean {
      return this.projectConfig.multipTabsShowFold;
    },
    getSystemTheme(): string {
      return this.projectConfig.systemTheme;
    },
    getHeaderBgColor(): string {
      return this.projectConfig.headerBgColor;
    }, 
    getNavBarStyle(): string {
      return this.projectConfig.navBarStyle;
    },
    getTransitionName(): RouterTransitionEnum | undefined {
      return this.projectConfig.isAnimation ? undefined : this.projectConfig.transitionName; 
    },
    getSplitMenu(): boolean {
      return this.projectConfig.splitMenu;
    },
    getIsAnimation(): boolean {
      return this.projectConfig.isAnimation;
    },
    getBreadcrumb(): boolean {
      return this.projectConfig.isBreadcrumb;
    },
    getMultipTabs(): boolean {
      return this.projectConfig.isMultipTabs;
    },
  },
  actions: {
    setAppConfig(config: Partial<IAppConfig>): void {
      let key = Object.keys(config)[0];
      // @ts-ignore
      if (this.$state.projectConfig[key] === Object.values(config)[0]) {
        return 
      }
      this.$state.projectConfig = merge(this.$state.projectConfig || {}, config);
      locStorage.set(PROJECT_CONFIG, this.$state.projectConfig);
    },
  },
});
