import type { Locale } from "ant-design-vue/lib/locale-provider";
import { AbstractLocaleDriver } from "@/framework/locale/lang/AbstractLocaleDriver";
import { LocaleTypeEnum } from "@/framework/locale/enum/LocaleTypeEnum";
import antdLocale from "ant-design-vue/es/locale/zh_CN";
import "moment/dist/locale/zh-cn";

// 中文语言包驱动
export class ZHCNLocaleDriver extends AbstractLocaleDriver {
  /**
   * 构造方法，在构造方法中将 <html> 标签中的 lang 属性 设置为 zh-Hans-CN
   */
  constructor() {
    super();
    document.querySelector("html")?.setAttribute("lang", "zh-Hans-CN");
  }

  /**
   * 返回 vue-i18n 配置中所需的 messages 对象
   */
  getVueI18nMessages(): Record<string, Record<string, any>> {
    const frameworkModules: Record<string, Record<string, any>> = import.meta.globEager(
      "./zh_CN/**/*.ts"
    );
    const businessModules: Record<string, Record<string, any>> = import.meta.globEager(
      "/src/lang/zh_CN/**/*.ts"
    );
    return this.genVueI18nMessage(
      { ...frameworkModules, ...businessModules },
      LocaleTypeEnum.ZH_CN
    );
  }

  /**
   * 返回 antDesignVue 的 zh_CN 语言包
   */
  getAntdLocale(): Locale {
    return antdLocale;
  }
}
