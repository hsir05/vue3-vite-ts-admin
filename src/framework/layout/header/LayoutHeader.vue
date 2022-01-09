<template>
  <Header :class="getHeaderClass" class="flex justify-between">
    <div :class="`${prefixCls}-left`" class="flex items-center">
      <AppLogo v-if="showLogo" :show-title="true" class="w-200px" />
      <HeaderTrigger  v-if="showHeaderTrigger"  :class="`${prefixCls}-trigger`" :foldout="headerTriggerFoldout"
        @update:foldout="$emit('update:headerTriggerFoldout', $event)"/>

      <LayoutBreadcrumb v-if="isBreadcrumbShowBool && getBreadcrumb" />
    </div> 

    <div :class="[(showMenu && getSplitMenu) ? `${prefixCls}-menu` : '']">
      <HorizontalMenu v-if="showMenu" :key="Number(getSplitMenu)" :theme="getHeaderTheme" />
    </div>

    <div :class="`${prefixCls}-action`" class="flex items-center">
     <Tooltip placement="bottom">
        <template #title>
          <span>{{$t('layout.setting.search')}}</span>
        </template>
        <SvgIcon name="search" style="margin: 0 10px;" size="14" :class="`${prefixCls}-action-item`" />
      </Tooltip>

      <Tooltip placement="bottom">
        <template #title>
          <span>{{$t('layout.setting.notice')}}</span> 
        </template>
        <SvgIcon name="bell" style="margin: 0 10px;" :class="`${prefixCls}-action-item`" />
      </Tooltip>

      <Tooltip placement="bottom">
        <template #title>
          <span>{{$t('layout.setting.fullScreen')}}</span>
        </template>
        <SvgIcon :name="fullscreenIcon" :class="`${prefixCls}-action-item`" @click="toggleFullScreen"  />
        
      </Tooltip>

      <MyAvatar />

       <Tooltip placement="left">
        <template #title>
          <span>{{$t('layout.setting.project')}}</span> 
        </template>
        <SettingButton 
        :class="`${prefixCls}-action-item`"
        @buttonClick="$emit('settingButtonClick', $event)"/>
      </Tooltip>

    </div>
  </Header>
</template>

<script lang="ts">
import { defineComponent, computed, unref, toRefs, reactive } from "vue";
import { Layout, Tooltip } from "ant-design-vue";
import { bool } from "vue-types";
import AppLogo from "@/framework/components/AppLogo/AppLogo.vue";
import HeaderTrigger from "./Trigger.vue"; 
import HorizontalMenu from "@/framework/layout/menu/HorizontalMenu.vue";
import SettingButton from "../setting/SettingBtn.vue";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import LayoutBreadcrumb from "@/framework/components/Breadcrumb/index.vue";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import MyAvatar from "./MyAvatar.vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import SvgIcon from "@/components/svgIcon/index.vue";
export default defineComponent({
  name: "LayoutHeader",
  components: {
    Header: Layout.Header,
    SvgIcon,
    AppLogo,
    Tooltip,
    HeaderTrigger,
    HorizontalMenu,
    SettingButton,
    LayoutBreadcrumb,
    MyAvatar,
  },
  props: {
    showLogo: bool().def(false),
    showMenu: bool().def(false),
    showHeaderTrigger: bool().def(false),
    headerTriggerFoldout: bool().isRequired,
  },
  emits: ["update:headerTriggerFoldout", "settingButtonClick"],
  setup() {
      const { getSplitMenu } = useRootSetting()

    const state = reactive({
      fullscreenIcon: "full-screen",
    });

    document.addEventListener(
      "fullscreenchange",
      () =>
        (state.fullscreenIcon =
          document.fullscreenElement !== null ? "fullscreenExit" : "full-screen")
    );

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    };
 
    const { getHeaderTheme, getBreadcrumb } = useRootSetting();
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("layout-header");

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme);
      
      return [prefixCls.value, `${prefixCls.value}-${theme}`];
    }); 

    const isBreadcrumbShowBool = AppConfigHooks.isBreadcrumbShow();
    
    return {
      ...toRefs(state),
      prefixCls,
      isBreadcrumbShowBool,
      getHeaderClass,
      toggleFullScreen,
      getHeaderTheme,
      getBreadcrumb,
      getSplitMenu
    };
  },
});
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-layout-header";
@prefix-menu: ~"@{namespace}-layout-header-menu";

.@{prefix-cls} {
  height: @header-height;
  padding: 0;
  line-height: @header-height;
  background-color: var(--header-bg-color);
  border-bottom: 1px solid #eee;
  &-trigger {
    font-size: 1.1em;
    display: flex;
    height: 100%;
    padding: 1px 12px 0;
    cursor: pointer;
    align-items: center;
  }
  &-action{
      padding-right: 10px;
  }
  &-action-item {
    height: 100%;
    padding: 0 1px;
    font-size: 1.2em;
    cursor: pointer;
  }
}
.@{prefix-menu}{
    width: 100%;
}
</style>
<style lang="less">
@prefix-light: ~"@{namespace}-layout-header-light";
@prefix-dark: ~"@{namespace}-layout-header-dark";
@prefix-avatar: ~"@{namespace}-layout-dropdown-avatar";

.@{prefix-avatar}{
    cursor: pointer;
    width: 130px;
    text-align: center;
}

.@{prefix-light} {
    .@{namespace}-layout-dropdown-name{
        color: @text-color-base;
    }
    .@{namespace}-layout-header-action-item{
        color: @text-color-base;
    }
}
.@{prefix-dark} {
    .@{namespace}-layout-header-trigger{
        color: @white;
    }
    .ant-breadcrumb{
        color: @text-color-hover;
    }
    .ant-breadcrumb a, .ant-breadcrumb-link, .ant-breadcrumb-separator{
        color: @text-color-hover;
    }
    .ant-breadcrumb > span:last-child{
        color: @white;
    }
    .@{namespace}-layout-dropdown-name{
        color: @text-color-hover;
    }
    .@{namespace}-layout-header-action-item{
        color: @text-color-hover;
    }
}
</style>
