import type { App } from "vue";
import type { Pinia } from "pinia";
import { createPinia } from "pinia";

export class StoreHandler {
  /**
   * StoreHandler 实例
   */
  private static instance: StoreHandler;

  /**
   * store 实例
   */
  private store: Pinia;

  /**
   * 私有化的构造函数
   */
  private constructor() {
    this.store = createPinia();
  }

  /**
   * 私有的实例化方法
   * @returns StoreHandler 实例
   */
  private static getInstance(): StoreHandler {
    if (!this.instance) {
      this.instance = new StoreHandler();
    }
    return this.instance;
  }

  /**
   * 安装 pinia store 插件的方法
   * @param app app 根组件实例
   */
  static installStore(app: App): void {
    app.use(this.getInstance().store);
  }

  /**
   * 获得 pinia store 实例的方法
   */
  static getStore(): Pinia {
    if (!this.instance) {
      throw new Error("store没有实例化，请检查您的 store 插件是否安装正常");
    }
    return this.instance.store;
  }
}
