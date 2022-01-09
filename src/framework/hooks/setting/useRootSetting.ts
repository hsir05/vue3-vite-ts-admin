import { computed } from "vue";
import { MenuLayoutModeEnum } from "../../config/enum/Enum";
import { useAppStore } from "@/framework/store/modules/useAppStore";
import { ThemeEnum, RouterTransitionEnum, NavBarStyleEnum } from "../../config/enum/Enum";
import { DARK, LIGHT } from "../../config/AppConfig";
import { setCssVar } from "./util";

const HEADER_BG_COLOR_VAR = "--header-bg-color";

export function useRootSetting() {
  const appStore = useAppStore();

  // 布局模式
  function setMenuLayoutMode(value: MenuLayoutModeEnum) {
    appStore.setAppConfig({ menuLayoutMode: value });
    getSplitMenu && setSplitMenu(false);
  }

  // 回到顶部
  function setBackTop(value: boolean) {
    appStore.setAppConfig({ openBackTop: value });
  }

  // 系统主题
  const getSystemTheme = computed(() => appStore.getSystemTheme);
  function setSystemTheme(theme: string) {
    appStore.setAppConfig({ systemTheme: theme });
  }
  // 导航栏风格
  const getNavBarStyle = computed(() => appStore.getNavBarStyle);
  const isNavThemeLight = computed(
    () => appStore.getNavBarStyle === NavBarStyleEnum.NAV_THEME_LIGHT
  );
  const isHeaderThemeDark = computed(
    () => appStore.getNavBarStyle !== NavBarStyleEnum.HEADER_THEME_DARK
  );
  function setNavBarStyle(style: string) {
    appStore.setAppConfig({ navBarStyle: style });
    setNavBarStyleColor(style)
  }

  function setNavBarStyleColor(style: string) {
       if (style === NavBarStyleEnum.HEADER_THEME_DARK) {
         setCssVar(HEADER_BG_COLOR_VAR, DARK);
       } else {
         setCssVar(HEADER_BG_COLOR_VAR, LIGHT);
       }
  }

  // 菜单主题
  const getMenuTheme = computed(() =>
    appStore.getNavBarStyle === NavBarStyleEnum.NAV_THEME_LIGHT ? "light" : "dark"
  );
  function setMenuTheme(theme: ThemeEnum) {
    appStore.setAppConfig({ menuTheme: theme });
  }

  // header主题
  const getHeaderTheme = computed(() =>
    appStore.getNavBarStyle === NavBarStyleEnum.HEADER_THEME_DARK ? "dark" : "light"
  );

  //是否分割菜单
  const getSplitMenu = computed(() => appStore.getSplitMenu);
  function setSplitMenu(value: boolean) {
    appStore.setAppConfig({ splitMenu: value });
  }

  // 进场动画
  const getTransitionName = computed(() => appStore.getTransitionName);
  function setTransitionName(transitionName: RouterTransitionEnum) {
    appStore.setAppConfig({ transitionName: transitionName });
  }

  // 是否禁用动画
  const getIsAnimation = computed(() => appStore.getIsAnimation);
  function setIsanimation(isAnimation: boolean) {
    appStore.setAppConfig({ isAnimation: isAnimation });
  }

  // 是否面包屑
  const getBreadcrumb = computed(() => appStore.getBreadcrumb);
  function setBreadcrumb(isBreadcrumb: boolean) {
    appStore.setAppConfig({ isBreadcrumb: isBreadcrumb });
  }

  // 是否显示多页签
  const isMultipTabs = computed(() => appStore.getMultipTabs);
  function setMultipTabs(isMultipTabs: boolean) {
    appStore.setAppConfig({ isMultipTabs: isMultipTabs });
  }

  return {
    getSystemTheme,
    getNavBarStyle,

    getSplitMenu,
    isNavThemeLight,
    isHeaderThemeDark,
    isMultipTabs,

    getMenuTheme,
    getHeaderTheme,
    getTransitionName,
    getIsAnimation,
    getBreadcrumb,

    setSystemTheme,
    setBackTop,
    setMenuLayoutMode,
    setMenuTheme,
    setTransitionName,
    setNavBarStyle,
    setSplitMenu,
    setIsanimation,
    setBreadcrumb,
    setMultipTabs,
    setNavBarStyleColor,
  };
}
