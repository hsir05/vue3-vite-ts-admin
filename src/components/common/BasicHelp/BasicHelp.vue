<template>
  <Tooltip :color="color" :placement="placement" :overlay-class-name="prefixCls">
    <template v-if="!$slots.default">
      <span :class="prefixCls" class="inline-block"><InfoCircleOutlined /></span>
    </template>
    <template v-else
      ><span :class="prefixCls" class="inline-block"><slot></slot></span
    ></template>

    <template v-if="!$slots.helpMessage" #title>
      <template v-if="isString(helpMessage)">{{ helpMessage }}</template>
      <template v-for="(item, index) in helpMessage" v-else :key="index">
        {{ (showMessageIndex ? index + 1 + ". " : "") + item }} <br />
      </template>
    </template>
    <template v-else #title><slot name="helpMessage"></slot></template>
  </Tooltip>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Tooltip } from "ant-design-vue";
import { InfoCircleOutlined } from "@ant-design/icons-vue";
import { string, oneOfType, arrayOf, oneOf, bool } from "vue-types";
import { compact, isString } from "lodash-es";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";

export default defineComponent({
  name: "BasicHelp",
  components: { Tooltip, InfoCircleOutlined },
  props: {
    helpMessage: oneOfType([String, arrayOf(String)]).isRequired,
    showMessageIndex: bool().def(true),
    placement: oneOf(
      compact([
        "top",
        "left",
        "right",
        "bottom",
        "topLeft",
        "bottomLeft",
        "bottomRight",
        "leftTop",
        "leftBottom",
        "rightTop",
        "rightBottom",
      ])
    ).def("right"),
    color: string(),
  },
  setup() {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("basic-help");
    return { prefixCls, isString };
  },
});
</script>
