<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center">
      <img src="../../assets/exception/500.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，服务器出错了</h1>
       <Button type="primary" @click="goHome">回到首页</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { useRouter } from 'vue-router';
  const router = useRouter();
  function goHome() {
    router.push('/');
  }
</script>

<style lang="less" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 20px 0;
    height: 100%;
    .text-center {
      h1 {
        color: #666;
        padding: 20px 0;
      }
    }

    img {
      width: 350px;
      margin: 0 auto;
    }
  }
</style>
