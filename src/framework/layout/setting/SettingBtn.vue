<template>
  <div class="flex items-center" @click.stop="$emit('buttonClick', $event)">
    <SettingOutlined class="p-8px"/>
  </div>
</template>

<script lang="ts"> 
import { defineComponent } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "SettingButton",
  components: { SettingOutlined },
  emits: ["buttonClick"],
  setup() {
    return {};
  },
});
</script>
