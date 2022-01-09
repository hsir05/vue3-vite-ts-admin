import type { Locale } from "ant-design-vue/lib/locale-provider";
import { AbstractLocaleDriver } from "@/framework/locale/lang/AbstractLocaleDriver";
import { LocaleTypeEnum } from "@/framework/locale/enum/LocaleTypeEnum";
import antdLocale from "ant-design-vue/es/locale/en_US";

// 英文语言包驱动
export class ENUSLocaleDriver extends AbstractLocaleDriver {
  /**
   * 构造方法，在构造方法中将 <html> 标签中的 lang 属性 设置为 zh-Hans-CN
   */
  constructor() {
    super();
    document.querySelector("html")?.setAttribute("lang", "en_US");
  }

  /**
   * 返回 vue-i18n 配置中所需的 messages 对象
   */
  getVueI18nMessages(): Record<string, Record<string, any>> {
    const frameworkModules: Record<string, Record<string, any>> = import.meta.globEager(
      "./en_US/**/*.ts"
    );
    const businessModules: Record<string, Record<string, any>> = import.meta.globEager(
      "@/lang/en_US/**/*.ts"
    );
    return this.genVueI18nMessage(
      { ...frameworkModules, ...businessModules },
      LocaleTypeEnum.EN_US
    );
  }

  /**
   * 返回 antDesignVue 的 en_US 语言包
   */
  getAntdLocale(): Locale {
    return antdLocale;
  }
}
