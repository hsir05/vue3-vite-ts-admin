import { MenuLayoutModeEnum } from "@/framework/config/enum/Enum";

// 页面切换动画
export const animates = [
    { value: "zoom-fade", name: "ZOOM_FADE", label: "渐变" },
    { value: "zoom-out", name: "ZOOM_OUT", label: "闪现" },
    { value: "fade-slide", name: "FADE_SIDE", label: "滑动" },
    { value: "fade", name: "FADE", label: "消退" },
    { value: "fade-bottom", name: "FADE_BOTTOM", label: "底部消退" },
    { value: "fade-scale", name: "FADE_SCALE", label: "缩放消退" },
];
// 页面布局风格
export const menuLayoutModeList = [
    { 
        title: "layout.setting.MenuLayoutModeLeft", 
        layoutMode: MenuLayoutModeEnum.LEFT_MENU 
    },
    {
        title: "layout.setting.MenuLayoutModeLeftColumn",
        layoutMode: MenuLayoutModeEnum.LEFT_COLUMN_MENU,
    },
    { title: "layout.setting.MenuLayoutModeTop", layoutMode: MenuLayoutModeEnum.TOP_MENU },
];
// 导航栏主题风格
export const navBarStyleList = [
  {
    value: "nav-theme-dark",
    icon: "nav-theme-dark",
    label: "暗色侧边栏",
  },
  {
    value: "header-theme-dark",
    icon: "header-theme-dark",
    label: "暗色顶栏",
  },
  {
    value: "nav-theme-light",
    icon: "nav-theme-light",
    label: "白色侧边栏",
  },
];
// 系统主题
export const appSystemThemeList: string[] = [
  "#409EFF",
  "#2d8cf0",
  "#0960bd",
  "#009688",
  "#536dfe",
  "#ff5c93",
  "#ee4f12",
  "#0096c7",
  "#9c27b0",
  "#ff9800",
  "#FF3D68",
  "#00C1D4",
  "#71EFA3",
  "#78DEC7",
  "#1768AC",
  "#FB9300",
];


