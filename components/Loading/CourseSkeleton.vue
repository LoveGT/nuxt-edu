<template>
  <n-grid :x-gap="20" :cols="4">
    <n-gi  v-for="i in 8" :key="i">
      <n-card class="mb-5">
        <template #cover>
          <n-skeleton height="150px" width="100%" />
        </template>
        <n-skeleton  height="30px" width="50%" class="my-2" /> 
        <n-skeleton text style="width: 50%" />
      </n-card>
    </n-gi>
  </n-grid>
  
</template>
<script setup>
import {
  NCard,
  NSkeleton,
  NGrid,
  NGi
} from "naive-ui"
</script>