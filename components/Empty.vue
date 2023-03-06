<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-03-06 14:58:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-06 15:00:30
-->
<template>
  <n-empty :description="desc" size="large" class="py-3"></n-empty>
</template>

<script setup>
import { NEmpty } from 'naive-ui';

defineProps({
  desc: {
    type: String,
    default: "暂无数据"
  }
})
</script>

<style lang="scss" scoped>

</style>