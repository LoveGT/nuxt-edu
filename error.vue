<template>
  <div class="pt-[80px]">
    <n-result status="500" title="500 服务器错误" :description="error.message">
      <template #footer>
        <n-button @click="handleError">回到首页</n-button>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { NResult, NButton } from "naive-ui";
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
