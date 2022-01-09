<template>
 <Spin :spinning="spinning">
    <Menu v-model:selectedKeys="selectedKeys" mode="horizontal" :theme="theme"  style="height: 49px;">
        <template v-for="menu in menuItems">
            <MenuItem v-if="menu.meta.link" >
                <template #icon>
                    <SvgIcon :name="menu.meta.icon" size="18" />
                </template>
                <a :href="menu.path" target="_target">
                    <span>{{ $t(menu.name) }}</span>
                </a>
            </MenuItem>

            <MenuItem v-else-if="!menu.children || menu.children.length === 0 || getSplitMenu || menu.meta.single" :key="menu.path"  @click="handleMenu(menu)" >
                <template #icon>
                    <SvgIcon :name="menu.meta.icon" size="18" />
                </template>
                <span>{{$t(menu.name)}}</span>
            </MenuItem> 

            <SubMenu v-else :key="menu.path + 1">
                <template #icon>
                    <SvgIcon :name="menu.meta.icon" size="18" />
                </template>
                <template #title>
                    <span>{{$t(menu.name)}}</span>
                </template>
                <MenuItem  v-for="item in menu.children" :key="item.path"  @click="handleMenu(item.path)">
                    <span>{{$t(item.name)}}</span>
                </MenuItem>
            </SubMenu>
        </template>
    </Menu>
</Spin>
</template> 

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import { Menu } from "ant-design-vue";
import { topLeftColumnMenuEmitter } from './menuMitt'
import type { PropType } from 'vue'; 
import { useRouter, useRoute } from 'vue-router';
import type { MenuTheme } from 'ant-design-vue';
import { Spin } from 'ant-design-vue';
import SvgIcon from '@/components/svgIcon/index.vue'
import { ThemeEnum } from "../../config/enum/Enum";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { Menu as MenuTypes } from "@/routes/types";
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"

interface menuStateFace {
    selectedKeys: string[];
    menuItems: MenuTypes[];
    spinning: boolean
}

export default defineComponent({
    name: "HorizontalMenu",
    props: {
        theme: {
            type: String as PropType<MenuTheme>,
            default: ThemeEnum.DARK,
        },
    },
    components: {
        Menu,
        MenuItem: Menu.Item,
        SubMenu: Menu.SubMenu,
        SvgIcon,
        Spin
    }, 
    setup() {
        const route = useRoute()
        const router = useRouter()
        const asyncMenusStore = useAsyncMenuStore()
        const { getSplitMenu } = useRootSetting()
        const menuState: menuStateFace = reactive({
            selectedKeys: getSplitMenu.value ? [route.matched[0].path] : [route.matched[1].path],
            menuItems: computed(() => asyncMenusStore.getMenus),
            spinning: computed(() => asyncMenusStore.loading)
        })

        watch( () => getSplitMenu.value, (value) => {
            menuState.selectedKeys = value ? [route.matched[0].path] : [route.matched[1].path]
        })
        watch(() => route.path,() => {
            if (getSplitMenu.value) {
                menuState.selectedKeys = [route.matched[0].path]
            } else {
                menuState.selectedKeys = [route.matched[1].path]
            }
        })

        function handleMenu(value: string | MenuTypes) {
            if (typeof (value) === 'string' || (!getSplitMenu.value && value.meta.single)) {
                router.push(value)
            } else {
                topLeftColumnMenuEmitter.emit('listenTopLeftColumnData', [value])
            }
        }

        return {
            ...toRefs(menuState),
            getSplitMenu,
            handleMenu,
        };
    },
});
</script>
