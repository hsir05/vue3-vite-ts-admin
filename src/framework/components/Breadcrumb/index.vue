<template>
  <div :class="prefixCls">
    <Breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched, paths}">
        <span v-if="!hasRedirect(routesMatched, route)">
          {{$t(route.breadcrumbName)}}
        </span>
            
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
            <span class="breadcrumb-title">{{$t(route.breadcrumbName)}}</span>
        </router-link>
      </template>
    </Breadcrumb>
  </div>
</template>
<script lang="ts"> 
import { defineComponent, ref, watchEffect } from "vue";
import type { RouteLocationMatched } from "vue-router";
import { useRouter } from "vue-router";
import { Breadcrumb, } from "ant-design-vue";
import { isString } from "lodash";
import { PageEnum } from "@/enums/pageEnum"
import { useAsyncMenuStore } from "@/framework/store/modules/useAsyncMenuStore"
import { Menu } from "@/routes/types";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
export default defineComponent({
  name: "LayoutBreadcrumb",
  components: {
    Breadcrumb,
    Separator: Breadcrumb.Separator
  },
  setup() {
    interface breadcrumbType {
      path: string;
      breadcrumbName: string;
      children?: Array<{
        path: string;
        breadcrumbName: string;
      }>;
    }
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("layout-breadcrumb");
    const routes = ref<breadcrumbType[]>([]);
    const { currentRoute } = useRouter();
    const router = useRouter();
    const asyncMenusStore = useAsyncMenuStore()

    function handleClick(route: RouteLocationMatched, paths: string[], e: Event) {
      e?.preventDefault();
      const { children, redirect, meta } = route;
      if (children?.length && !redirect) {
        e?.stopPropagation();
        return;
      }

      if (meta?.carrParam) {
        return;
      }
      if (redirect && isString(redirect)) {
        router.push(redirect);
      } else {
        let goPath = "";
        if (paths.length === 1) {
          goPath = paths[0];
        } else {
          const ps = paths.slice(1);
          const lastPath = ps.pop() || "";
          goPath = `${lastPath}`;
        }
        goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
        router.push(goPath);
      }
    }

    function hasRedirect(routes: RouteLocationMatched[], route: RouteLocationMatched) {
      return routes.indexOf(route) !== routes.length - 1;
    }

    function getAllParentPath(list: Menu[], parentKey?: Menu) {
      let children: breadcrumbType[] = [];
    
      for (let key of list) {
        if (currentRoute.value.path === key.path) {
          list.forEach((item) => {
            children.push({ path: item.path, breadcrumbName: item.name });
          });
          parentKey && routes.value.push({ path: parentKey.path, breadcrumbName: parentKey.name, children: children });
          routes.value.push({ path: key.path, breadcrumbName: key.name });
          break
        } else if (key.children && key.children.length > 0) {
          getAllParentPath(key.children, key);
        }
      }
    }

    watchEffect(() => {
      if (currentRoute.value.name === PageEnum.REDIRECT_NAME || currentRoute.value.name === PageEnum.ERROR_PAGE_NAME) return;
      routes.value = [];
      const menuItems = asyncMenusStore.getMenus
      getAllParentPath(menuItems);
    });

    return {
      routes,
      prefixCls,

      handleClick,
      hasRedirect,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-layout-breadcrumb";
.@{prefix-cls} {
    padding-left: 10px;
    .anticon.anticon-down{
        display: inline-flex;
        align-items: center;
    }
}
</style>
