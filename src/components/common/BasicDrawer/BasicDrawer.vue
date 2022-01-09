<template>
  <Drawer
    :class="prefixCls"
    :closable="closable"
    :placement="placement"
    :visible="visible"
    :width="width"
    @update:visible="$emit('update:visible', $event)"
    @close="$emit('close', $event)"
  >
    <template v-if="!$slots.title" #title>
      <BasicTitle>
        {{ title }}
      </BasicTitle>
    </template>
    <template v-else #title>
      <slot name="title"></slot>
    </template>

    <ScrollContainer>
      <slot></slot>
    </ScrollContainer>
  </Drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Drawer } from "ant-design-vue";
import { string, bool, oneOf, oneOfType, integer } from "vue-types";
import { compact } from "lodash-es";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import BasicTitle from "@/components/common/BasicTitle/BasicTitle.vue";
import ScrollContainer from "@/components/common/ScrollContainer/ScrollContainer.vue";

export default defineComponent({
  name: "BasicDrawer",
  components: { Drawer, BasicTitle, ScrollContainer },
  props: {
    title: string().def(""),
    closable: bool().def(true),
    placement: oneOf(compact(["top", "right", "bottom", "left"])).def("right"),
    visible: bool().isRequired,
    width: oneOfType([string(), integer()]),
  },
  emits: ["update:visible", "close"],
  setup() {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("basic-drawer");
    const bodyStyle = {
        paddingBottom: '120px'
    }
    return { prefixCls, bodyStyle };
  },
});
</script>

//
<style lang="less">
@prefix-cls: ~"@{namespace}-basic-drawer";
.@{prefix-cls} {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }
  .ant-drawer-close {
    &:hover {
      color: #ed6f6f;
    }
    &:focus {
      outline: none;
    }
  }
  .ant-drawer-body {
    height: calc(100% - 55px);
    padding: 0;
  }
}
</style>
