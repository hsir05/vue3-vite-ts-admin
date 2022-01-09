<template>
  <div class="theme-color-wrap">
    <div
      class="theme-color"
      v-for="(color, index) in data"
      :key="index"
      :style="{ backgroundColor: color }"
      @click="handeSetting(color)"
    >
      <SvgIcon name="g" color="#fff" style="margin: 0;" v-if="theme === color" size="16" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import SvgIcon from '@/components/svgIcon/index.vue'
  import { Divider } from 'ant-design-vue'
  export default defineComponent({
    name: 'themeItem',
    components: {
      SvgIcon,
      Divider
    },
    props: {
      theme: {
        type: String,
        default: () => '#fffffe'
      }, 
      colorList: {
        type: Array,
        default: () => ['#fffffe']
      }
    },
    emits: ['handeSetting'],
    setup(props, { emit }) {
      const value = ref<String>(props.theme)
      const data: string[] = props.colorList as string[]

      const handeSetting = (color: string) => {
        emit('handeSetting', color)
      }

      return {
        value,
        data,
        handeSetting,
    
      }
    }
  })
</script>
<style lang="less" scoped>
.theme-color-wrap{
    display: grid;
    grid-template-columns: repeat(8, minmax(0px, 1fr));
    gap: 0px;
  .theme-color {
    width: 20px;
    height: 20px;
    line-height: 20px;
    grid-column: span 1 / span 1;
    cursor: pointer;
    text-align: center;
    border-radius: 3px;
    color: @white;
    margin: 5px;
  }
}
</style>