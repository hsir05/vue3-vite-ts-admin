import type { ComputedRef } from "vue";
import { computed } from "vue";
import { MenuLayoutModeEnum } from "../../config/enum/Enum";
import { useAppStore } from "@/framework/store/modules/useAppStore";
 
export class AppConfigHooks {
  private static appStore = useAppStore().projectConfig;

  /* ===================================== 菜单布局模式相关 begin ================================ */
  static getLayoutModeComputed(): ComputedRef<MenuLayoutModeEnum> {
    return computed(() => this.appStore.menuLayoutMode);
  }

  static isLeftMenuModeComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.menuLayoutMode === MenuLayoutModeEnum.LEFT_MENU);
  }
  // 菜单分割switch 是否可切换
  static isSplitMenuStatusComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.menuLayoutMode !== MenuLayoutModeEnum.TOP_MENU);
  }
  static isTopMenuModeComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.menuLayoutMode === MenuLayoutModeEnum.TOP_MENU);
  }

  static isSplitMenuComputed(): ComputedRef<boolean> {
    return computed(
      () => this.appStore.menuLayoutMode === MenuLayoutModeEnum.LEFT_MENU
      // || (this.appStore.menuLayoutMode === MenuLayoutModeEnum.TOP_MENU && this.appStore.splitMenu)
    );
  }

  static isLeftColumnMenuModeComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.menuLayoutMode === MenuLayoutModeEnum.LEFT_COLUMN_MENU);
  }

  static isBreadcrumbShow(): ComputedRef<boolean> {
    return computed(() => this.appStore.menuLayoutMode !== MenuLayoutModeEnum.TOP_MENU);
  }
  static isLeftColumnMenuCollapsedComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.collapsed);
  }
  static setMenuCollapsed(bool: boolean) {
    this.appStore.collapsed = bool;
  }
  /* ===================================== 菜单布局模式相关 end ================================== */

  /* ===================================== 回到顶部按钮相关 begin ================================ */
  static isOpenBackTopComputed(): ComputedRef<boolean> {
    return computed(() => this.appStore.openBackTop);
  }
  /* ===================================== 回到顶部按钮相关 end ================================== */
}
