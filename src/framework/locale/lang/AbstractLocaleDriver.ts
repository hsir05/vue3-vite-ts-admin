import type { Locale } from "ant-design-vue/lib/locale-provider/";
import { set, merge } from "lodash-es";

// 抽象的语言包驱动程序
export abstract class AbstractLocaleDriver {
  /**
   * 返回 vue-i18n 配置中所需的 messages 对象
   * 抽象方法，由具体实现类去实现
   */
  abstract getVueI18nMessages(): Record<string, Record<string, any>>;

  /**
   * 返回 antDesignVue 语言包
   */
  abstract getAntdLocale(): Locale;

  /**
   * 由项目中自定义的语言包模块生成 vue-i18n 配置中所需的 messages 对象
   * @param modules 定义的语言包模块
   * @param prefix 语言前缀
   */
  protected genVueI18nMessage(
    modules: Record<string, Record<string, any>>,
    prefix = "lang"
  ): Record<string, any> {
    const obj: Record<string, any> = {};
    // 遍历模块，组合成一个语言包
    for (const moduleKey in modules) {
      let fileName = moduleKey
        .replace(`./${prefix}/`, "")
        .replace(`/src/lang/${prefix}/`, "")
        .replace(/^\.\//, "");
      fileName = fileName.substring(0, fileName.lastIndexOf("."));
      const langFileModule = modules[moduleKey].default;
      const moduleObj = set({}, fileName.split("/").join("."), langFileModule);
      merge(obj, moduleObj);
    }
    return { [prefix]: obj };
  }
}
