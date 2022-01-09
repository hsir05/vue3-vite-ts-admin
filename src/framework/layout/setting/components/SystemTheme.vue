<template>
    <ThemeItem :colorList="appSystemThemeList" :theme="getSystemTheme" @handeSetting="handleTheme" />
</template>
<script lang="ts" setup>
import ThemeItem from "./ThemeItem.vue"
import { appSystemThemeList } from '../setting'
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"

    const { setSystemTheme, getSystemTheme } = useRootSetting()
    function handleTheme(color: string) {
        // @ts-ignore
        window.less.modifyVars({ 
            '@primary-color': color
        }).then(() => {
            setSystemTheme(color)
        })
        .catch((error:any) => {
            console.log(error);
        });
    }

</script>

