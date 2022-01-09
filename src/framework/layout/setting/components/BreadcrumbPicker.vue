<template>
  <SettingSwitchItem
    class="mt20"
    :title="$t('layout.setting.breadcrumb')"
    :checked="getBreadcrumb"
    :disabled="disabled"
    @change="setBreadcrumb($event)"
  />
</template>

<script lang="ts" setup>
import { unref, computed } from "vue";
import SettingSwitchItem from "./SettingSwitchItem.vue";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
 const { getBreadcrumb, setBreadcrumb, getSplitMenu } = useRootSetting()

const disabled = computed(() => unref(getSplitMenu))
</script>
