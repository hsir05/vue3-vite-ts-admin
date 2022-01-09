<template>
  <CScrollbar
    :height="height"
    :width="width"
    :trigger="trigger"
    :direction="direction"
    :v-bar-style="vBarStyle"
    :h-bar-style="hBarStyle"
    :v-thumb-style="vThumbStyle"
    :h-thumb-style="hThumbStyle"
    :class="prefixCls"
    class="p-12px"
    @scroll="$emit('scroll', $event)"
  >
    <slot></slot>
  </CScrollbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CScrollbar } from "c-scrollbar";
import { compact } from "lodash-es";
import { string, oneOf, object } from "vue-types";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";

export default defineComponent({
  name: "ScrollContainer",
  components: { CScrollbar },
  props: {
    height: string().def("100%"),
    width: string().def("100%"),
    trigger: oneOf(compact(["always", "hover", "none"])).def("hover"),
    direction: oneOf(compact(["x", "y", "all"])).def("all"),
    vBarStyle: object(),
    hBarStyle: object(),
    vThumbStyle: object(),
    hThumbStyle: object(),
  },
  emits: ["scroll"],
  setup() {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("scroll-container");
    return { prefixCls };
  },
});
</script>
