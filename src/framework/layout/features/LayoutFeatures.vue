<template>
  <BackTop v-if="isOpenBackTop" :target="getTarget" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BackTop } from "ant-design-vue";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";

export default defineComponent({
  name: "LayoutFeatures",
  components: { BackTop },
  setup() {
    const isOpenBackTop = AppConfigHooks.isOpenBackTopComputed();
    return { getTarget: () => window /*document.body*/, isOpenBackTop };
  },
});
</script>
