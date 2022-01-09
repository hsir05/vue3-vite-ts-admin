import { LocaleTypeEnum } from "@/framework/locale/enum/LocaleTypeEnum";

export interface ILocaleConfig {
  // 语言环境
  locale: LocaleTypeEnum;

  // 预设回退的语言环境, 配置vue-i18n时使用
  fallbackLocale: LocaleTypeEnum;

  // 可用语言环境列表, 配置vue-i18n时使用
  availableLocales: LocaleTypeEnum[];

  // 是否取消本地化失败时输出的警告, 配置vue-i18n时使用
  missingWarn: boolean;

  // 是否取消回退到 fallbackLocale 或 root 时的警告, 配置vue-i18n时使用
  fallbackWarn: boolean;
}
