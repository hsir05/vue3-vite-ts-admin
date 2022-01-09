import type { ILocaleConfig } from "@/framework/config/type/ILocaleConfig";
import { LocaleTypeEnum } from "@/framework/locale/enum/LocaleTypeEnum";

// 语言包配置，要切换整个项目的语言就在这里进行配置
export const localeConfig: ILocaleConfig = {
  locale: LocaleTypeEnum.ZH_CN,
  fallbackLocale: LocaleTypeEnum.EN_US,
  availableLocales: [LocaleTypeEnum.ZH_CN, LocaleTypeEnum.EN_US],
  fallbackWarn: true,
  missingWarn: true,
};
