<template>
  <Spin :spinning="spinning"> 
    <Sider
        :collapsed="!collapsed && childData.length === 0"
        collapsed-width="50"
        style="box-shadow: rgb(29 35 41 / 5%) 2px 0px 8px 0px;"
        :width="childData.length === 0 ? 80 : (!collapsed ? 210 : 260)"
        :theme="getMenuTheme">
        <AppLogo :show-title="childData.length !== 0" class="h-50px" />
        
            <div  :class="[ 'left-column-menu-wrap', `left-column-menu-wrap-${getMenuTheme}`]" @mouseleave="handleLeave" >
                <section class="scroll-bar">
                    <ul :class="['left-column-menu', getMenuClass]">
                        <template v-for="menu in menuItems" :key="menu.path">
                            <li :class="[  'left-column-menu-item', selectedKeys === menu.path ? 'left-column-menu-item-active' : '',  ]" 
                             @click="handleMenu(menu)" >
                                <span ><SvgIcon :name="menu.meta.icon" size="18" /></span>
                                <p :class="{'hide' : !collapsed}" >{{$t(menu.name)}}</p>
                            </li>
                        </template>
                    </ul>
                    <div class="collapsed-btn" @click="handleCollapse">
                        <SvgIcon :name="`${collapsed ? 'd-arrow-left' : 'd-arrow-right'}`" size="20" />
                    </div>
                </section>
                <div :class="getChildClass">
                    <ul>
                        <li v-for="menu in childData" :key="menu.path"
                            :class="[  'left-column-menu-children-item',
                                currentRoute.path === menu.path ? 'left-column-menu-children-item-active' : '',]"
                            @click.async="router.push(menu.path);"
                        >{{$t(menu.name)}}</li>
                    </ul>
                </div>
            </div>
       
    </Sider> 
    </Spin>
</template>
<script lang="ts">
import { defineComponent, computed, unref, reactive, watch, toRefs} from "vue";
import { Layout } from "ant-design-vue";
import AppLogo from "@/framework/components/AppLogo/AppLogo.vue";
import { useRouter, useRoute } from "vue-router";
import { Menu as MenuTypes } from "@/routes/types";
import { AppConfigHooks } from "@/framework/hooks/config/AppConfigHooks";
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";

import SvgIcon from "@/components/svgIcon/index.vue";
import { Menu, Tooltip, Spin } from "ant-design-vue";
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"
interface menuStateInterFace {
    selectedKeys: string;
    menuItems: MenuTypes[];
    tmp: MenuTypes | undefined;
    childData: MenuTypes[],
    spinning: boolean
}

export default defineComponent({
    name: "ColumnSider",
    components: {
        Sider: Layout.Sider, AppLogo,Spin,
        Tooltip, Menu, MenuItem: Menu.Item, SvgIcon,
    },
    setup() {
        const { currentRoute } = useRouter();
        const { getMenuTheme } = useRootSetting();
        const asyncMenusStore = useAsyncMenuStore();
        const route = useRoute();
        const router = useRouter();

        const menuState: menuStateInterFace = reactive({
            selectedKeys: '',
            menuItems: computed(() => {getCurrentData(asyncMenusStore.getMenus); return asyncMenusStore.getMenus }),
            tmp: undefined,
            childData: [],
            spinning: computed(() => asyncMenusStore.loading)
        })

        watch(
            () => route.path, () => {
                getCurrentData(unref(menuState.menuItems))
            }
        );
        
        const collapsed = AppConfigHooks.isLeftColumnMenuCollapsedComputed();
        const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("layout-left-menu");
        const prefixClsSider = AppProviderContextHooks.getPrefixClsComputedByScope( "layout-left-column-sider" );

        const getMenuClass = computed(() => [prefixCls.value, `${prefixCls.value}-${unref(getMenuTheme)}`]);
        const getChildClass = computed(() => [
            "sider-supplement", 
            `${unref(prefixClsSider)}-${unref(getMenuTheme)}`,
              menuState.childData.length === 0 ? 'sider-supplement-hide' : ''
            ]);

        function handleMenu(menu: MenuTypes) {
            if(menu.meta.single) {
                router.push(menu.path);
            } else if (menu.meta.link){
                window.open(menu.path, '_blank');
            } else {
                menuSelectKeys(menu.path, menu.children || [])
            }
        }
        function handleLeave() {
            if (menuState.tmp) {
                menuSelectKeys(menuState.tmp.path, menuState.tmp.children || [])
            }
        }
        function handleCollapse() {
            AppConfigHooks.setMenuCollapsed(!collapsed.value);
        }

        function getCurrentData(list: MenuTypes[]){
            for (let key of list) {
                if (unref(currentRoute).path.indexOf(key.path) !== -1){
                    menuState.tmp = key
                    menuSelectKeys(key.path, key.children || [])
                }
            }
        }
        function menuSelectKeys(path: string, menuData: MenuTypes[]){
            menuState.selectedKeys = path
            menuState.childData = menuData
        }

        const getAppLogoTitle = () => {
            if (menuState.childData.length === 0) {
                return false
            }
            return true
        }
        
        return {
            ...toRefs(menuState),
            getMenuClass,
            getChildClass,
            currentRoute,
            collapsed,
            router,
            handleMenu,
            handleLeave,
            handleCollapse,
            getMenuTheme,
            getAppLogoTitle,
        };
    },
});
</script>

<style scoped lang="less">
.left-column-menu-wrap {
    display: flex;
    height: calc(100vh - 50px);
}
.collapsed-btn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    cursor: pointer;
}
.left-column-menu-wrap-light {
     .collapsed-btn{
        color: rgba(0, 0, 0, 0.45);
    }
}
.sider-supplement {
    background-color: #00061a;
    box-shadow: 2px 0 8px #1d23290d;
    color: @white;
    width: 180px;
    transition: width 0.3s;
}
.sider-supplement-hide{
    width: 0;
}
.hide{
    display: none;
}
@prefix-left-column-menu: ~"@{namespace}-layout-left-column-sider-light";
.@{prefix-left-column-menu} {
     box-shadow: 2px 0 8px #1d23290d;
    background-color: @white;
    color: @text-color-base;
    
}
.left-menu-children-title {
    font-size: 18px;
    font-weight: 500;
    text-align: center;
}
.h-50px {
    height: 50px;
    line-height: 50px;
}
.left-column-menu-children-item {
    position: relative;
    z-index: 1;
    padding: 12px 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    margin: 5px;
    border-radius: 4px;
}
.left-column-menu-children-item-active {
    color: #fff !important;
    background-color: var(--primary-color) !important;
}

//----------------------------
.scroll-bar {
    width: 80px;
}
.left-column-menu {
    color: @white;
    text-align: center;
    font-size: 12px;
    background-color: #00061a;
    margin-bottom: 0;
    height: calc(100vh - 103px);
    p {
        margin: 0;
    }
}

.left-column-menu-item {
    position: relative;
    padding: 12px 0;
    color: rgba(255, 255, 255, 0.65);
    text-align: center;
    cursor: pointer;
    transition: All 0.3s ease;
    margin: 2px;
    overflow: hidden;
    border-radius: 4px;
}
.left-column-menu-item-active {
    font-weight: 600;
    color: @white;
   
   
    &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: var(--primary-color);
        content: "";
    }
}
@prefix-left-menu-dark: ~"@{namespace}-layout-left-menu-dark";
.@{prefix-left-menu-dark} {
    .left-column-menu-item-active {
        background-color: var(--primary-color);
    }
}

@prefix-left-menu: ~"@{namespace}-layout-left-menu-light";
.@{prefix-left-menu} {
    background-color: @white;
    color: @text-color-base;

    .left-column-menu-item {
        color: @text-color-base;
    }
   
    .left-column-menu-item-active {
        color: @white;
        background-color: var(--primary-color);
    }
}
</style>
