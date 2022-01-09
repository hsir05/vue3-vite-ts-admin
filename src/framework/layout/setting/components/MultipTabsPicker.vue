<template>
  <SettingSwitchItem
    class="mt20"
    :title="$t('layout.setting.isMultipTabs')"
    :checked="isMultipTabs"
    @change="setMultipTabs($event)"
  />
</template>

<script lang="ts" setup>
import SettingSwitchItem from "./SettingSwitchItem.vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
const { isMultipTabs, setMultipTabs } = useRootSetting()

</script>
