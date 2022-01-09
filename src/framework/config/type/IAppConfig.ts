import type { MenuLayoutModeEnum, ThemeEnum, RouterTransitionEnum } from "../enum/Enum";

export interface IAppConfig {
  // 菜单布局模式
  menuLayoutMode: MenuLayoutModeEnum;
  // 是否开启 back to top
  openBackTop: boolean;
  collapsed: boolean;
  // MultipTabs
  multipTabsShowFold: boolean;
  multipTabsShow: boolean;
  // system
  systemTheme: string;
  // 导航栏风格
  navBarStyle: string;
  //headerTheme
  headerTheme: ThemeEnum;
  headerBgColor: string;
  //menuTheme
  menuTheme: ThemeEnum;
  menuBgColor: string;
  transitionName: RouterTransitionEnum;
  isAnimation: boolean;
  // 是否分割菜单
  splitMenu: boolean;
  // 是否禁用动画
  isBreadcrumb: boolean;
  // 是否显示多页签
  isMultipTabs: boolean;
}
