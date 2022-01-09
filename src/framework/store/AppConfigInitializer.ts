import { appConfig } from "../config/AppConfig";
import { merge } from "lodash-es";
import { locStorage } from "@/utils/Storage"
import { PROJECT_CONFIG } from "@/config/config"
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting";


export function AppConfigInitializer(){
    const { setNavBarStyleColor } = useRootSetting();
    const appCommonCfg = merge( appConfig, locStorage.get(PROJECT_CONFIG) || {});
    setNavBarStyleColor(appCommonCfg.navBarStyle);
    locStorage.set(PROJECT_CONFIG, appCommonCfg)

}