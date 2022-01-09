<template>
  <SettingSwitchItem
    class="mt20"
    :title="$t('layout.setting.splitMenu')"
    :checked="getSplitMenu"
    :disabled="!disabled"
    @change="setSplitMenu($event)"
  />
</template>

<script lang="ts" setup>
import SettingSwitchItem from "./SettingSwitchItem.vue";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"

    const disabled = AppConfigHooks.isTopMenuModeComputed();
    const { getSplitMenu, setSplitMenu } = useRootSetting()
</script>
