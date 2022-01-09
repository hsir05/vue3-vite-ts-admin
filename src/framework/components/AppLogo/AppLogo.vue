<template>
  <div :class="prefixCls" class="flex items-center h-full cursor-pointer justify-center">
    <img src="../../../assets/logo.png" class="h-3/4" />
    <div v-if="showTitle" class="ml-2 truncate" :class="[
        { 'logo-title' : isActive },
        `${prefixCls}-title`
    ]">
      {{ title }}
    </div> 
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from "vue";
import { bool } from "vue-types";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
export default defineComponent({
  name: "AppLogo",
  props: {
    showTitle: bool().def(true),
    alwaysShowTitle: bool(),
  },
  setup() {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("app-logo");
    const title = import.meta.env.VITE_APP_NAME;

    const { isNavThemeLight, isHeaderThemeDark } = useRootSetting()
    const isTopMenuMode = AppConfigHooks.isTopMenuModeComputed()

    const isActive = computed(() => {
        if (unref(isNavThemeLight) || (unref(isTopMenuMode) && unref(isHeaderThemeDark)) ) {
            return true
        }
        return false
    })

    return { prefixCls, title, isActive };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-app-logo";

.@{prefix-cls} {
  color: @white;
  transition: all 1s, ease;
  &-title {
    font-size: 16px;
    font-weight: 400;
  }
}
.logo-title{
    color: @text-color-base;
}
</style>
