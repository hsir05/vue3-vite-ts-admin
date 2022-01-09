import type { ComputedRef } from "vue";
import { computed, unref } from "vue";
import { AppProviderContext } from "@/framework/context/AppProviderContext";

export class AppProviderContextHooks {
  static getPrefixClsComputedByScope(scope: string): ComputedRef<string> {
    return computed(() => `${unref(AppProviderContext.use().prefixCls)}-${scope}`);
  }

  static getIsMobileComputed(): ComputedRef<boolean> {
    return computed(() => unref(AppProviderContext.use().isMobile));
  }
}
