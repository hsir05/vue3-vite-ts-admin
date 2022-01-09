<template>
    <MenuFoldOutlined v-if="foldout" @click.stop="$emit('update:foldout', false)" />
    <MenuUnfoldOutlined v-else @click.stop="$emit('update:foldout', true)" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { bool } from "vue-types";

export default defineComponent({
  name: "HeaderTrigger",
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  props: {
    foldout: bool().isRequired,
  },
  emits: ["update:foldout"],
});
</script>
