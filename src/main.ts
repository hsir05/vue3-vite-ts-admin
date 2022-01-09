
import "./assets/styles/index.less"
import "./framework/design/index.less"
import "virtual:windi.css";
import "virtual:svg-icons-register"
import { createApp } from "vue";
import App from "./App.vue";
import { StoreHandler, AppConfigInitializer } from "./framework/store";
import { LocaleHandler } from "./framework/locale";
import { setupRouter } from "./routes/index";
import router from "./routes/index"
import { GlobalComponentRegistrator } from "./components/GlobalComponentRegistrator";
/**
 * vue 项目启动总入口
 */
async function bootstrap() {
  const app = createApp(App);
 
  // 安装 pinia store
  StoreHandler.installStore(app);

  // 初始化 AppConfig
  AppConfigInitializer();

  // 注册全局组件
  GlobalComponentRegistrator.regist(app);

  // 安装 vue-i18n
  LocaleHandler.installVueI18n(app);
  
  // 安装 router
  setupRouter(app);

  await router.isReady();

  app.mount("#app");
}

bootstrap();
