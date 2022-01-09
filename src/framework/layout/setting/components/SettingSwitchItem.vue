<template>
  <div :class="prefixCls" class="flex justify-between px-2">
    <span>{{ title }}</span>
    <Switch
      :disabled="disabled"
      :checked-children="$t('layout.setting.on')"
      :un-checked-children="$t('layout.setting.off')"
      v-bind="getBindValue"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Switch } from "ant-design-vue";
import { string, bool } from "vue-types";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";

export default defineComponent({
  name: "SettingSwitchItem",
  components: { Switch },
  props: {
    title: string().isRequired,
    disabled: bool().def(false),
    checked: bool().def(false),
  },
  emits: ["change"],
  setup(props) {
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("setting-switch-item");
    const getBindValue = computed(() => {
      return props.checked ? { checked: props.checked } : {};
    });
    return { prefixCls, getBindValue };
  },
});
</script>
