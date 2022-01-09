 <template>
    <div class="nav-bar-style" >
        <Tooltip placement="bottom" v-for="item in navBarStyleList" :key="item.value">
            <template #title>
                <span>{{item.label}}</span>
            </template>
            <div class="nav-bar-style-item">
                <div class=""><SvgIcon :name="item.icon" size="60" @click="setNavBarStyle(item.value)" style="margin: 0;" /></div>
                <Badge color="green" v-if="item.value === getNavBarStyle" />
            </div>
        </Tooltip>
    </div>
 </template>
 <script lang="ts" setup>
import { Tooltip, Badge } from "ant-design-vue";
import SvgIcon from "@/components/svgIcon/index.vue"
import { navBarStyleList } from "@/framework/layout/setting/setting"
import { useRootSetting } from "@/framework/hooks/setting/useRootSetting";

  const { getNavBarStyle, setNavBarStyle } = useRootSetting();
</script>
<style lang="less">
    .nav-bar-style{
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
    }
    .nav-bar-style-item{
        text-align: center;
    }
</style>