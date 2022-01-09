<template>
  <span :class="prefixCls">
    <slot></slot>
    <BasicHelp v-if="helpMessage" :class="`${prefixCls}-help`" :help-message="helpMessage" />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { oneOfType, arrayOf } from "vue-types";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import BasicHelp from "@/components/common/BasicHelp/BasicHelp.vue";

export default defineComponent({
  name: "BasicTitle",
  components: { BasicHelp },
  props: {
    helpMessage: oneOfType([String, arrayOf(String)]),
  },
  setup() {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("basic-title");
    return { prefixCls };
  },
});
</script>
