<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-02-24 16:01:56
 * @LastEditors: 
 * @LastEditTime: 2023-03-06 15:01:40
-->
<template>
  <div>
    <template v-if="loading">
      <slot name="loading">
       <LoadingSkeleton />
      </slot>
    </template>
    <template v-else-if="error">
      <n-result
        class="mt-10"
        status="500"
        title="页面走丢了"
        :description="error?.data?.data || '页面走丢了'"
      >
        <template #footer>
          <n-button @click="$router.go(-1)">返回上一页</n-button>
        </template>
      </n-result>
    </template>
    <template v-else-if="isEmpty">
      <Empty />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
import { NResult, NButton } from "naive-ui";
const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  error: {
    type: [String, Boolean, Symbol],
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  }
});

const loading = ref(false);

const stop = watchEffect(() => {
  if (props.pending && !loading.value) {
    loading.value = true;
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 200);
  }
});

onBeforeUnmount(() => stop());
</script>
