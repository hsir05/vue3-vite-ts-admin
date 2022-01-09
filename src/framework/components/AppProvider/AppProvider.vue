<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { AppProviderContext } from "@/framework/context/AppProviderContext";
import { string } from "vue-types";

export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  props: {
    // TODO 这里要换成从配置文件去取默认的 prefixCls
    prefixCls: string().def("codeke"),
  },
  setup(props, { slots }) {
    const isMobile = ref(false);
    const { prefixCls } = toRefs(props);
    AppProviderContext.create({ prefixCls, isMobile });
    return () => slots.default?.();
  },
});
</script>
