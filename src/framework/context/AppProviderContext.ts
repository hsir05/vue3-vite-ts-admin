import { AbstractContext } from "@/framework/context/AbstractContext";

import type { Ref } from "vue";

export class AppProviderContext extends AbstractContext<AppProviderContextProps> {
  private static instance: AppProviderContext;

  private constructor(context: AppProviderContextProps) {
    super();
    super.createContext(context);
  }

  static create(context: AppProviderContextProps) {
    if (!this.instance) {
      this.instance = new AppProviderContext(context);
    }
  }

  static use(): AppProviderContextProps {
    if (!this.instance) {
      throw new Error("AppProviderContext 尚未初始化");
    }
    return this.instance.getContext();
  }
}

interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}
