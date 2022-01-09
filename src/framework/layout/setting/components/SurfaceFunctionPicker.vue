<template>
  <SettingSwitchItem
    :title="$t('layout.setting.openBackTop')"
    :checked="isOpenBackTop"
    @change="setBackTop($event)"
  />
</template>

<script lang="ts" setup>
import SettingSwitchItem from "./SettingSwitchItem.vue";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
const isOpenBackTop = AppConfigHooks.isOpenBackTopComputed();
const { setBackTop } = useRootSetting()
</script>
