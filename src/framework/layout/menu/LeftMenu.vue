<template>
    <Spin :spinning="spinning">
        <Menu  :collapsed="true"  v-model:selectedKeys="selectedKeys"  :openKeys="openKeys" mode="inline"  :theme="theme">
            <template v-for="menu in menuItems" >
                <SubMenu v-if="menu.children && menu.children.length > 0" :key="menu.path">
                    <template #icon>
                        <SvgIcon :name="menu.meta.icon" size="18" />
                    </template>
                    <template #title>
                        <span>{{ $t(menu.name) }}</span>
                    </template>
                    <MenuItem v-for="item in menu.children" :key="item.path">
                        <router-link :to="item.path">{{ $t(item.name) }}</router-link>
                    </MenuItem>
                </SubMenu>
                <MenuItem v-else-if="menu.meta.single" @click="router.push({ path: menu.path });" :key="menu.path ">
                    <template #icon>
                        <SvgIcon :name="menu.meta.icon" size="18" />
                    </template>
                   <span>{{ $t(menu.name) }}</span>
                </MenuItem>

                <MenuItem v-else >
                    <template #icon>
                        <SvgIcon :name="menu.meta.icon" size="18" />
                    </template>
                   <a :href="menu.path" target="_target">
                        <span>{{ $t(menu.name) }}</span>
                    </a>
                </MenuItem>
            </template>
        </Menu>
    </Spin>
</template> 

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, computed } from "vue";
import type { MenuTheme } from 'ant-design-vue';
import type { PropType } from 'vue';
import { Menu, Spin } from "ant-design-vue";
import { topLeftColumnMenuEmitter } from './menuMitt'
import { useRouter, useRoute } from 'vue-router';
import SvgIcon from '@/components/svgIcon/index.vue'
import { Menu as MenuTypes } from "@/routes/types";
import { ThemeEnum } from "../../config/enum/Enum";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting"
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"

interface menuStateFace {
    selectedKeys: string[];
    openKeys: string[];
    menuItems: MenuTypes[];
    spinning: boolean
}

export default defineComponent({
    name: "LeftMenu",
    components: { Menu, MenuItem: Menu.Item, SubMenu: Menu.SubMenu, SvgIcon, Spin },
    props: {
        theme: {
            type: String as PropType<MenuTheme>,
            default: ThemeEnum.DARK,
        },
    },
    setup() {
        const { currentRoute } = useRouter();
        const router = useRouter()
        const route = useRoute()
        const { getSplitMenu } = useRootSetting()
        const asyncMenusStore = useAsyncMenuStore()

        const menuState: menuStateFace = reactive({
            openKeys: [route.matched[0].path],
            selectedKeys: [currentRoute.value.path],
            menuItems: computed(() => getSplitMenu.value ? asyncMenusStore.getCurentRouteParent(currentRoute.value.path) : asyncMenusStore.getMenus),
            spinning: computed(() => asyncMenusStore.loading)
        }) 

        watch(() => route.path, () => {
            menuState.selectedKeys = [route.path]
            menuState.openKeys = [route.matched[0].path]
        })
        watch(() => getSplitMenu.value, (value) => {
            if (!value) {
                menuState.menuItems = asyncMenusStore.getMenus
            }
        })

        topLeftColumnMenuEmitter.on('listenTopLeftColumnData', menuData => {
            let path = menuData[0].redirect || menuData[0].path
            router.push({ path: path });
        })

        return {
            ...toRefs(menuState),router
        };
    },
});
</script>
<style lang="less" scoped>
.ant-menu {
    height: 49px;
}
.ant-menu-inline {
    .ant-menu-item {
        margin-top: 0;
    }
}
</style>