<template>
  <ConfigProvider :locale="antdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { LocaleHandler } from "@/framework/locale";
import AppProvider from "@/framework/components/AppProvider/AppProvider.vue";
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"

export default defineComponent({
  name: "App",
  components: { ConfigProvider, AppProvider },
  setup() {
    const antdLocale = LocaleHandler.getAntdLocale();
    
    const asyncMenuStore = useAsyncMenuStore()
    asyncMenuStore.asyncMenu()

    return { ConfigProvider, antdLocale };
  },
});
</script>
