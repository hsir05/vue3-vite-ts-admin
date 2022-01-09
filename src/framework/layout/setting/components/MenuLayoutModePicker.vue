<template>
  <div :class="prefixCls" class="text-align">
    <template v-for="item in menuLayoutModeList" :key="item.title">
      <Tooltip :title="$t(item.title)" placement="bottom" >
        <div
          :class="[
            `${prefixCls}-item`,
            `${prefixCls}-item-${item.layoutMode}`
          ]"
          @click="handle(item)"
        ></div>
         <Badge color="green" v-if="item.layoutMode === layoutMode" />
      </Tooltip>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip,Badge } from "ant-design-vue";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { menuLayoutModeList } from "@/framework/layout/setting/setting"
import { MenuLayoutModeEnum } from "@/framework/config/enum/Enum";

 const { setMenuLayoutMode } = useRootSetting()

    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope(
      "setting-menu-layout-mode-picker"
    );

    const layoutMode = AppConfigHooks.getLayoutModeComputed();

    const handle = (item: { layoutMode: MenuLayoutModeEnum }) => {
        setMenuLayoutMode(item.layoutMode)
    };
</script>

<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-setting-menu-layout-mode-picker";
.text-align{
    text-align: center;
}
.@{prefix-cls} {
  display: flex;
  justify-content: space-around;
  &-item {
    position: relative;
    width: 55px;
    height: 46px;
    cursor: pointer;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);
    margin-bottom: 5px;
    &::before,
    &::after {
      position: absolute;
      content: "";
    }

    &-left-menu {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 33%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: @white;
        border-radius: 4px 4px 0 0;
      }
    }

    &-left-column-menu {
      &::before {
        top: 0;
        left: 0;
        z-index: 1;
        width: 25%;
        height: 100%;
        background: linear-gradient(to right, #273352 0%, #273352 33%, #fff 33%, #fff 100%);
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: @white;
        border-radius: 4px 4px 0 0;
      }
    }

    &-top-left-mix-menu {
      &::before {
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
        background-color: #273352;
        border-radius: 4px 0 0 4px;
      }

      &::after {
        top: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 25%;
        background-color: @white;
        border-radius: 4px 4px 0 0;
      }
    }

    &-top-menu {
      &::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
        background-color: #273352;
        border-radius: 4px 4px 0 0;
      }
    }
  }
}
</style>
