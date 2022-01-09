<template>
  <SettingSwitchItem
    class="mt20"
    :title="$t('layout.setting.noAnimation')"
    :checked="getIsAnimation"
    @change="setIsanimation($event)"
  />
</template>

<script lang="ts" setup>
import SettingSwitchItem from "./SettingSwitchItem.vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
const { getIsAnimation, setIsanimation } = useRootSetting()
</script>
