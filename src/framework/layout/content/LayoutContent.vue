<template>
  <Content class="layout-content">
    <RouterView>
        <template #default="{ Component, route }">
        <transition :name="getTransitionName" mode="out-in" appear>
            <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">
            <component :is="Component" :key="route.fullPath" />
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath" />
        </transition>
        </template>
    </RouterView> 
  </Content>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { Layout } from "ant-design-vue"; 
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"
export default defineComponent({
  name: "LayoutContent",
  components: { Content: Layout.Content },
  setup() {
      const asyncMenuStore =  useAsyncMenuStore()
      const keepAliveComponents = computed(() => asyncMenuStore.keepAliveComponents)
      
      const { getTransitionName } = useRootSetting()

      return {
        getTransitionName, 
        keepAliveComponents
      }
  },
});
</script>
<style lang="less">
    .layout-content{
        overflow-x: hidden;
        padding: 0 10px;
    }
</style>
