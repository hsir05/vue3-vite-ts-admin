<template>
    <section class="Account">
       <div class="tabs">
           <div :class="[
               'tabs-title-item',  activeKey === item.key ? 'tabs-title-item-active' : ''
            ]" v-for="item in typeList" :key="item.key" @click="handleSwitch(item)">
                <p class="tabs-item-title">{{item.title}}</p>
                <p class="tabs-item-des">{{item.desc}}</p>
           </div>
       </div>
       <div class="tabs-content">
           <p class="tabs-content-title">{{typeTitle}}</p>
           <component :is="activeKey === 1 ? Basic : Security "></component>
       </div>
    </section>
</template>    
<script lang="ts" setup>
import { ref  } from "vue";
import Basic from "./basic.vue"
import Security from "./security.vue"

interface TypeItem {
    title: string,
    desc: string,
    key: number
}
  const typeList = [
    {
      title: '基本设置',
      desc: '个人账户信息设置',
      key: 1,
    },
    {
      title: '安全设置',
      desc: '密码，邮箱等设置',
      key: 2,
    },
  ];

const activeKey = ref(1);
const typeTitle = ref('基本设置');

const handleSwitch = (item: TypeItem) => {
    activeKey.value = item.key
    typeTitle.value = item.title
}
</script> 
<style lang="less">
.Account{
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .tabs{
        background-color: @white;
         padding: 10px;
         width: 390px;
         .tabs-title-item{
             padding: 15px;
             cursor: pointer;
         }
        .tabs-item-title{
            font-size: 16px;
            margin-bottom: 5px;
        }
        .tabs-item-des{
            font-size: 14px;
            margin-bottom: 5px;
        }
        .tabs-title-item-active{
            color: #2d8cf0;
            background-color: #f0faff;
        }
        
    }
    .tabs-content{
        padding: 15px 20px;
        width: calc(100% - 390px - 20px);
        margin-left: 15px;
        background-color: @white;
        .tabs-content-title{
            font-size: 16px;
        }
    }
}
</style>