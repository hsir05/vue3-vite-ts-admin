<template>
  <Dropdown>
    <div :class="`${prefixCls}-avatar`" style="height: 100%">
      <Avatar src="/src/assets/g.jpeg" size="small" />
      <span :class="`${prefixCls}-name`">vt-admin</span>
    </div>
    <template #overlay>
      <Menu>
        <MenuItem @click="router.push('/setting/account')" ><SvgIcon name="setting" />个人设置</MenuItem>
        <MenuItem  @click="showConfirm"><SvgIcon name="logout" size="16" />退出系统</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { h,defineComponent } from "vue";
import { Dropdown, Menu, Avatar, Modal } from "ant-design-vue";
import { AppProviderContextHooks } from "@/framework/hooks/context/AppProviderContextHooks";
import SvgIcon from "@/components/svgIcon/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MyAvatar",
  components: { Dropdown, Menu, ExclamationCircleOutlined, SvgIcon, Avatar, MenuItem: Menu.Item },
  setup() {
    const router = useRouter();
    const prefixCls = AppProviderContextHooks.getPrefixClsComputedByScope("layout-dropdown");

    const showConfirm = () => {
      Modal.confirm({
        icon:h(ExclamationCircleOutlined),
        title:  h('span', '温馨提示'),
        content:  h('span', '是否确认退出系统?'),
        onOk() {
         logout()
        },
        onCancel() {
          console.log('Cancel');
        }
      });
    };

    const logout = () => {
      router.replace("/login");
    };

    return {
      prefixCls,
      router,
      showConfirm
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}-layout-dropdown-name";
.@{prefix-cls} {
  font-size: 16px;
  padding: 5px 5px 5px 10px;
}
</style>
