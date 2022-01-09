<template>
    <div class="tabs-view">
        <div class="tabs-view-main">
            <div ref="navWrap" class="tabs-card">
                <span class="tabs-card-prev"  :class="{ 'tabs-card-prev-hide': !scrollable }" >
                    <SvgIcon name="arrow-left" />
                </span>

                <Dropdown :trigger="['contextmenu']" @visibleChange="visibleChange(tab)" v-for="(tab, index) in tabsList" :key="index">
                    <div class="tab-card-scroll-item" @click="goPage(tab)">
                        <span :class="[activeKey === tab.path ? 'tab-card-scroll-item-active' : '']">{{$t(tab.name)}}</span>
                        <SvgIcon  name="close"  style="margin-right:0px"  v-if="tab.path !== baseHome" @click.stop="closeTabItem(tab)" />
                    </div>

                    <template #overlay>
                        <Menu style="width:120px">
                            <menuItem   v-for="item in TabsMenuOptions" :key="item.key" :disabled="item.disabled" @click="handleDropMenuItem(item.key)">
                                <SvgIcon :name="item.icon" />
                                {{ item.text }}
                            </menuItem>
                        </Menu>
                    </template>
                </Dropdown>

                <span class="tabs-card-next"   :class="{ 'tabs-card-next-hide': !scrollable }">
                    <SvgIcon name="arrow-right" />
                </span>
            </div>
             <Dropdown :trigger="['hover']" @visibleChange="handleCloseBtn">
                <span class="tabs-close" >
                    <SvgIcon name="arrow-down" />
                </span>

                <template #overlay>
                    <Menu style="width:120px">
                        <menuItem   v-for="item in TabsMenuOptions" :key="item.key" :disabled="item.disabled" @click="handleDropMenuItem(item.key)">
                            <SvgIcon :name="item.icon" />
                            {{ item.text }}
                        </menuItem>
                    </Menu>
                </template>
            </Dropdown>
            
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref, reactive, toRefs, watch } from 'vue';
import { Dropdown, Menu } from 'ant-design-vue';
import { useMultipleTabStore } from '@/framework/store/modules/useMultipleTabStore';
import SvgIcon from "@/components/svgIcon/index.vue"
import { useRouter, useRoute } from 'vue-router'
import { PageEnum } from "@/enums/pageEnum"
import { RouteItem } from "@/framework/store/modules/useMultipleTabStore"
import { MULTIPLE_TABS_KEY } from "@/config/config"
import { locStorage } from "@/utils/Storage"

export default defineComponent({
    name: 'MultipleTabs',
    components: { SvgIcon, Dropdown, Menu, menuItem: Menu.Item },
    setup() {
        const router = useRouter()
        const route = useRoute();
        const state = reactive({
            activeKey: route.fullPath,
            scrollable: false,
        })
        //  const navScroll: any = ref(null);
        // const navWrap: any = ref(null);
        const isCurrent = ref(false);
        const tabStore = useMultipleTabStore();

        const getSimpleRoute = (route:any): RouteItem => {
            const { fullPath, hash, meta, params, path, query } = route;
            return { fullPath, hash, meta, name: meta.title, params, path, query };
        };

        let cacheRoutes: RouteItem[] = [];
        const simpleRoute = getSimpleRoute(route);
        try {
            const routesStr = locStorage.get(MULTIPLE_TABS_KEY) as string | null | undefined;
            cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
        } catch (e) {
            cacheRoutes = [simpleRoute];
        } 
        tabStore.initTabs(cacheRoutes)

        const tabsList = computed(() => tabStore.getTabList.filter((item) => !item.meta?.hideTab));
        
         // 在页面关闭或刷新之前，保存数据
        window.addEventListener('beforeunload', () => {
            locStorage.set(MULTIPLE_TABS_KEY, JSON.stringify(tabsList.value));
        }); 
        const whiteList: string[] = [
            PageEnum.BASE_LOGIN_NAME,
            PageEnum.REDIRECT_NAME,
            PageEnum.ERROR_PAGE_NAME, 
        ];

        watch(
            () => route.fullPath,
            (to) => {  
                if (whiteList.includes(route.name as string)) return;
                state.activeKey = to;
                tabStore.addTab(getSimpleRoute(route));
                // updateNavScroll(true);
            },
            { immediate: true }
        );
        function visibleChange(tab: RouteItem) {
            isCurrent.value = PageEnum.BASE_HOME_REDIRECT === tab.path;
        }
        function handleCloseBtn(){
            isCurrent.value = PageEnum.BASE_HOME_REDIRECT === route.fullPath;
        }
        const TabsMenuOptions = computed(() => {
            const isDisabled = unref(tabsList).length <= 1;
            return [
                {
                    text: '刷新当前',
                    key: '1',
                    icon: 'refresh',
                },
                {
                    text: `关闭当前`,
                    key: '2',
                    disabled: unref(isCurrent) || isDisabled,
                    icon: 'close',
                },
                {
                    text: '关闭其他',
                    key: '3',
                    disabled: isDisabled,
                    icon: 'pic-center',
                },
                {
                    text: '关闭全部',
                    key: '4',
                    disabled: isDisabled,
                    icon: 'minus',
                },
            ];
        });

        const removeTab = async (route: RouteItem) => {
            await tabStore.closeCurrentTab(route)
            if (state.activeKey === route.fullPath) {
                const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
                state.activeKey = currentRoute.fullPath;
                router.push(currentRoute);
            }
        }
        function closeOther(route:any) {
            tabStore.closeOtherTabs(route);
            state.activeKey = route.fullPath;
            router.replace(route.fullPath);
        }
        function closeAll(e:RouteItem) {
            tabStore.closeAllTab(e);
            router.replace(PageEnum.BASE_HOME);
        }
        function reloadPage() {
            router.push({
                path: "/redirect" + unref(route).fullPath,
            });
        }
        function closeTabItem(e:RouteItem) {
            const { fullPath } = e;
            const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath);
            removeTab(routeInfo as RouteItem);
        }
        function goPage(e:RouteItem){
            const { fullPath } = e
            if (fullPath === route.fullPath) return
            state.activeKey = fullPath
            router.push({ path: fullPath });
        }
        
        function handleDropMenuItem(key: string) {
            switch (key) {
                //刷新
                case '1':
                    reloadPage();
                    break;
                //关闭
                case '2':
                    removeTab(route as RouteItem);
                    break;
                //关闭其他
                case '3':
                    closeOther(route);
                    break;
                //关闭所有
                case '4':
                    closeAll(route as RouteItem);
                    break;
            }
        }
        return {
            ...toRefs(state),
            tabsList,
            // navWrap,
            // navScroll,
            TabsMenuOptions,
            baseHome: PageEnum.BASE_HOME,

            closeTabItem,
            goPage,
            handleDropMenuItem,
            visibleChange,
            handleCloseBtn,
        }

        
    }
})

</script>
<style lang="less" scoped >
.tabs-view {
    width: 100%;
    padding: 6px 12px 6px 10px;
    display: flex;
    transition: all 0.2s ease-in-out;
    background-color: #f5f7f9;
    box-sizing: border-box;
    .tabs-view-main {
        height: 32px;
        display: flex;
        max-width: 100%;
        min-width: 100%;
    }
    .tabs-card {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;
    }
    .tab-card-scroll-item {
        background: @white;
        color: #333639;
        height: 32px;
        padding: 4px 10px;
        border-radius: 3px;
        margin-right: 6px;
        cursor: pointer;
        display: inline-block;
        position: relative;
        flex: 0 0 auto;
        user-select: none;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
    }
    .tabs-card-next-hide,.tabs-card-prev-hide {
          display: none;
    }
    .tab-card-scroll-item-active{
        color: var(--primary-color);
    }  
     .tabs-card-prev, .tabs-card-next {
        width: 32px;
        text-align: center;
        line-height: 32px;
        cursor: pointer;
    }
    .tabs-card-next-hide,
        .tabs-card-prev-hide {
          display: none;
    }
    .tabs-close {
      min-width: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: @white;
      border-radius: 2px;
      cursor: pointer;
      &-btn {
        color: @white;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
}
</style>