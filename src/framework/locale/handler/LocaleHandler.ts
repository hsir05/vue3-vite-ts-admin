import type { App } from "vue";
import type { I18nOptions, I18n } from "vue-i18n";
import type { Locale } from "ant-design-vue/lib/locale-provider/";
import { createI18n } from "vue-i18n";
import { localeConfig } from "@/framework/config/LocaleConfig";
import { LocaleTypeEnum } from "@/framework/locale/enum/LocaleTypeEnum";
import { AbstractLocaleDriver } from "@/framework/locale/lang/AbstractLocaleDriver";
import { ZHCNLocaleDriver } from "@/framework/locale/lang/ZHCNLocaleDriver";
// import { ENUSLocaleDriver } from "@/framework/locale/lang/ENUSLocaleDriver";

type I18nGlobalTranslation = { 
  (key: string): string;
  (key: string, locale: string): string;
  (key: string, locale: string, list: unknown[]): string;
  (key: string, locale: string, named: Record<string, unknown>): string;
  (key: string, list: unknown[]): string;
  (key: string, named: Record<string, unknown>): string;
};
type I18nTranslationRestParameters = [string, any];

export class LocaleHandler {
  /**
   * LocaleHandler 实例
   */
  private static instance: LocaleHandler;

  /**
   * 语言驱动程序实例
   */
  private localeDriver!: AbstractLocaleDriver;

  /**
   * 私有化的构造函数
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * 私有的实例化方法
   * @returns VueI18nInstaller 实例
   */
  private static getInstance(): LocaleHandler {
    if (!this.instance) {
      this.instance = new LocaleHandler();
      this.instance.prepareLocaleDriver();
    }
    return this.instance;
  }
  
  private static i18n: I18n;

  static getI18n(): { t: I18nGlobalTranslation } {
    const { t, ...methods } = this.i18n.global;
    const tFn: I18nGlobalTranslation = (key: string, ...arg: any[]) => {
      if (!key) return "";
      return t(key, ...(arg as I18nTranslationRestParameters));
    };
    return {
      ...methods,
      t: tFn,
    };
  }

  /**
   * 安装 vue-i18n 插件的方法
   * @param app app 根组件实例
   */
  static installVueI18n(app: App) {
    const messages: Record<
      string,
      Record<string, any>
    > = LocaleHandler.getInstance().localeDriver.getVueI18nMessages();
    const vueI18nOptions: I18nOptions = {
      legacy: false, // must set `false`, to use Composition API
      ...localeConfig,
      messages,
      globalInjection: true,
    };
    const i18n: ReturnType<typeof createI18n> = createI18n(vueI18nOptions);
    this.i18n = i18n as I18n;
    app.use(i18n);
  }

  /**
   * 返回 antDesignVue 语言包
   */
  static getAntdLocale(): Locale {
    return LocaleHandler.getInstance().localeDriver.getAntdLocale();
  }

  /**
   * 语言驱动程序实例
   */
  private prepareLocaleDriver(): void {
    const { locale } = localeConfig;
    switch (locale) {
      case LocaleTypeEnum.ZH_CN: {
        this.localeDriver = new ZHCNLocaleDriver();
        break;
      }
    //   case LocaleTypeEnum.EN_US: {
    //     this.localeDriver = new ENUSLocaleDriver();
    //     break;
    //   }
      default: {
        throw new Error("没有找到对应的语言包驱动程序，请检查您的国际化配置");
      }
    }
  }
}
