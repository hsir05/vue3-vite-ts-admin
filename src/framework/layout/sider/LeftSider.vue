<template>
  <Sider
    collapsible
    breakpoint="lg"
    :trigger="null"
    :collapsed="collapsed || active"
    :theme="getMenuTheme"
    :collapsed-width="active ? 0 : 60"
    :class="prefixCls"
    @update:collapsed="$emit('update:collapsed', $event)"
  >
    <div :class="`${prefixCls}-header`" v-if="!isTopMenuMode">
      <AppLogo :show-title="!collapsed" class="w-full" />
    </div>
    <LeftMenu :theme="getMenuTheme" /> 
  </Sider>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Layout, Spin } from "ant-design-vue";
import { bool } from "vue-types";
import AppLogo from "@/framework/components/AppLogo/AppLogo.vue";
import LeftMenu from "@/framework/layout/menu/LeftMenu.vue";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { useRoute } from 'vue-router';
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";

export default defineComponent({
  name: "LeftSider",
  components: { Sider: Layout.Sider, AppLogo, LeftMenu, Spin },
  props: {
    collapsed: bool().isRequired,
  },
  setup() {
    const { getMenuTheme, getSplitMenu } = useRootSetting()

    const active = ref(false)
    const isTopMenuMode = AppConfigHooks.isTopMenuModeComputed() ;
    const isLeftMenuMode = AppConfigHooks.isLeftMenuModeComputed() ;
    const route = useRoute()
    if (!isLeftMenuMode.value && getSplitMenu.value && route.meta.single) {
        active.value = true
    }

    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope(
      "layout-outside-left-sider"
    );
    

    watch(() => route.path, () => {
        active.value =( !isLeftMenuMode.value && route.meta.single) ? true : false
    })

    return { prefixCls, getMenuTheme, active, isTopMenuMode };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-layout-outside-left-sider";
.@{prefix-cls} {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  &-header {
    height: @header-height;
    padding-bottom: 1px;
    line-height: @header-height;
  }
}
</style>
