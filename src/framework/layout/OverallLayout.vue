<template>
  <Layout :class="prefixCls">
    <LayoutFeatures />
    <LayoutSettingDrawer v-model:visible="settingDrawerVisible" />
    <!-- splitmenu -->
    <LeftSider v-if="isSplitMenuComputed" v-model:collapsed="layoutOutsideLeftSiderCollapsed" />
    <LayoutLeftColumnSider v-if="isLeftColumnMenuMode" />
    <Layout >
      <LayoutHeader
        :show-logo="isLogoShow"
        :show-menu="isTopMenuMode"
        :show-header-trigger="isLeftMenuMode"
        :header-trigger-foldout="!layoutOutsideLeftSiderCollapsed"
        @update:headerTriggerFoldout="layoutOutsideLeftSiderCollapsed = !$event"
        @settingButtonClick="handleSettingBtnClick"
      />
      <Layout>
      <LeftSider :collapsed="false" v-if="isTopMenuMode && getSplitMenu" />
      
      <Layout>
          <LayoutMultipleTab v-if="isMultipTabs" />
        <LayoutContent />
      </Layout>
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, ref, unref, computed } from "vue";
import { Layout } from "ant-design-vue";
import LayoutFeatures from "@/framework/layout/features/LayoutFeatures.vue";
import LayoutSettingDrawer from "./setting/SettingDrawer.vue";
import LeftSider from "./sider/LeftSider.vue";
import LayoutLeftColumnSider from "./sider/ColumnSider.vue";

import LayoutHeader from "@/framework/layout/header/LayoutHeader.vue";
import LayoutContent from "@/framework/layout/content/LayoutContent.vue";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import LayoutMultipleTab from "@/framework/layout/tabs/index.vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting";
export default defineComponent({
  name: "OverallLayout",
  components: {
    Layout,
    LayoutFeatures,
    LayoutSettingDrawer,
    LeftSider,
    LayoutLeftColumnSider,
    LayoutHeader,
    LayoutContent,
    LayoutMultipleTab,
  },
  setup() {
    // 得到样式类名称
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("overall-layout");
    const { getSplitMenu, isMultipTabs } = useRootSetting();

    // 判断菜单布局模式
    const isLeftMenuMode = AppConfigHooks.isLeftMenuModeComputed();
    // 分割菜单
    const isSplitMenuComputed = AppConfigHooks.isSplitMenuComputed();

    const isTopMenuMode = AppConfigHooks.isTopMenuModeComputed() ;
    const isLeftColumnMenuMode = AppConfigHooks.isLeftColumnMenuModeComputed();

    const isLogoShow = computed(() => {
    //   if (unref(isTopMenuMode) && !unref(getSplitMenu)) {
      if (unref(isTopMenuMode)) {
        return true;
      }
      return false;
    });

    // 左侧菜单 sider 是否收起
    const layoutOutsideLeftSiderCollapsed = ref<boolean>(false);

    // 右侧的 settingDrawer 是否可见
    const settingDrawerVisible = ref(false);
    // settingButton 点击时打开 settingDrawer
    const handleSettingBtnClick = () => {
      if (!settingDrawerVisible.value) {
        settingDrawerVisible.value = true;
      }
    };

    return {
      prefixCls,
      isLeftMenuMode,
      isSplitMenuComputed,
      isMultipTabs,
      isLogoShow,
      isTopMenuMode,
      isLeftColumnMenuMode,
      settingDrawerVisible,
      layoutOutsideLeftSiderCollapsed,
      getSplitMenu,
      handleSettingBtnClick,
    };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-overall-layout";

.@{prefix-cls} {
  .ant-layout {
    background: @content-bg;
    height: calc(100vh - 10px);
  }
}
</style>
