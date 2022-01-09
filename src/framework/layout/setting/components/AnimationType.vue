<template>
  <div class="flex justify-between px-2 mt20">
    <span>{{ $t('layout.setting.animationType') }}</span>
    <Select
      ref="select"
      :value="getTransitionName"
      style="width: 120px"
      :disabled="getIsAnimation"
      @change="handleChange"
    >
      <Option :value="item.value" v-for="item in animates" :key="item.value">{{item.label}}</Option>
    </Select>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting";
import { Select } from "ant-design-vue";
import { animates } from "@/framework/layout/setting/setting"
import { RouterTransitionEnum } from "../../../config/enum/Enum";

export default defineComponent({
  name: "TransitionName",
  components: {
    Select: Select,
    Option: Select.Option,
  },
  setup() {
    const { setTransitionName, getTransitionName, getIsAnimation } = useRootSetting();

    function handleChange(value: RouterTransitionEnum) {
      setTransitionName(value)
    }

    return {  getTransitionName, handleChange, animates, getIsAnimation };
  },
});
</script>