import type { IAppConfig } from "@/framework/config/type/IAppConfig";
import { ThemeEnum, RouterTransitionEnum, MenuLayoutModeEnum, NavBarStyleEnum } from "./enum/Enum";

export const DARK = "#001529";
export const LIGHT = "#fffffe";

export const appConfig: IAppConfig = {
  // 菜单布局模式
  menuLayoutMode: MenuLayoutModeEnum.LEFT_MENU,
  // 是否显示回到顶部
  openBackTop: true,
  collapsed: true,
  // MultipsTabs
  multipTabsShowFold: false,
  multipTabsShow: true,
  //导航栏风格
  navBarStyle: NavBarStyleEnum.NAV_THEME_DARK,
  //headerTheme
  headerTheme: ThemeEnum.LIGHT,
  headerBgColor: "#fffffe",
  // stystem
  systemTheme: "#409EFF",
  //menuTheme
  menuTheme: ThemeEnum.DARK,
  menuBgColor: "#001529",
  // 切换动画
  transitionName: RouterTransitionEnum.FADE_SIDE,
  isAnimation: false,
  // 是否分割菜单
  splitMenu: false,
  // 是否禁用面包屑
  isBreadcrumb: true,
  // 是否显示多页签
  isMultipTabs: true,
};
