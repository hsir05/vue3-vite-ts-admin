<template>
  <BasicDrawer
    :title="$t('layout.setting.drawerTitle')"
    :visible="visible"
    width="310"
    @update:visible="$emit('update:visible', $event)">

   <Divider >{{ $t("layout.setting.systemTheme") }}</Divider>
    <SystemTheme />

    <Divider>{{ $t("layout.setting.MenuLayoutMode") }}</Divider>
    <MenuLayoutModePicker />
    
     <Divider>{{ $t("layout.setting.navBarStyle") }} </Divider>
     <NavBarStyle/>
    
    <Divider>{{ $t("layout.setting.surfaceFunction") }}</Divider>
    <SurfaceFunctionPicker />
    <SplitMenu />
    <BreadcrumbPicker />
    <MultipTabsPicker />

    <Divider>{{ $t("layout.setting.animation") }} </Divider>
    <AnimationPicker />
    <AnimationType />

  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Divider } from "ant-design-vue";
import { bool } from "vue-types";
import BasicDrawer from "@/components/common/BasicDrawer/BasicDrawer.vue";
import MenuLayoutModePicker from "@/framework/layout/setting/components/MenuLayoutModePicker.vue";
import SurfaceFunctionPicker from "@/framework/layout/setting/components/SurfaceFunctionPicker.vue";
import SplitMenu from "@/framework/layout/setting/components/SplitMenu.vue"
import SystemTheme from '@/framework/layout/setting/components/SystemTheme.vue'
import AnimationType from "./components/AnimationType.vue"
import NavBarStyle from "./components/NavBarStyle.vue"; 
import AnimationPicker from "./components/AnimationPicker.vue"
import BreadcrumbPicker from "./components/BreadcrumbPicker.vue"
import MultipTabsPicker from "./components/MultipTabsPicker.vue"
export default defineComponent({
  name: "LayoutSettingDrawer",
  components: { Divider,SplitMenu, MultipTabsPicker, BasicDrawer, AnimationPicker,BreadcrumbPicker, AnimationType, NavBarStyle, MenuLayoutModePicker, SurfaceFunctionPicker, SystemTheme },
  props: {
    visible: bool().isRequired,
  },
  emits: ["update:visible"],
  setup() {
    return {}
  }
});
</script>
