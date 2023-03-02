<template>
  <div>
      考试列表 {{ $route.params.page }}
      <n-button @click="test">测试权限验证</n-button>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui';

const test = () => {
  useHasAuth(() => {
    console.log('已经登录并且绑定手机号了');
  })
}
useHead({
  title: '考试列表'
})
</script>

<style scoped>

</style>