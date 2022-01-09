import type { App, Component } from "vue";

export class GlobalComponentRegistrator {
  /**
   * GlobalComponentRegistrator 实例
   */
  private static instance: GlobalComponentRegistrator;

  /**
   * 需要注册的全局组件数组
   */
  private components: Array<Component> = [];

  /**
   * 私有化的构造函数
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * 注册全局组件的方法
   * @param app 根组件实例
   */
  static regist(app: App): void {
    if (!this.instance) {
      this.instance = new GlobalComponentRegistrator();
      this.instance.prepareComponents();
      this.instance.components.forEach((component) => {
        if (component.name) {
          app.component(component.name, component);
        }
      });
    }
  }

  /**
   * 向数组中添加需要全局注册的组件，该数组准备用于全局注册
   */
  private prepareComponents() {
    // 添加要全局注册的各 vue 组件即可
    // this.components.push(组件1);
    // this.components.push(组件2);
  }
}
