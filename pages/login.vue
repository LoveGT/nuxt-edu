<template>
 <n-form :model="form" ref="formRef" label-width="80" :inline="false" size="large" class="w-[340px]">
  <n-form-item :show-label="false" path="username">
    <n-input v-model:value="form.username" placeholder="请输入用户名"/>
  </n-form-item>
  <n-form-item :show-label="false" path="password">
    <n-input v-model:value="form.password" type="password" placeholder="请输入密码"/>
  </n-form-item>
  <n-form-item v-show="type !== 'login'" :show-label="false" path="repassword">
    <n-input v-model:value="form.repassword" type="password" placeholder="请确认密码"/>
  </n-form-item>
  <div class="flex justify-between w-full mb-2">
    
  </div>
  <n-form-item>
    <n-button type="primary" class="w-full" @click="onSubmit">登录</n-button>
  </n-form-item>
  <div class="flex justify-center items-center w-full text-xs mt-5 text-gray-600">
    注册即同意
    <n-button quaternary type="primary" size="tiny">《服务协议》</n-button>
    和
    <n-button quaternary type="primary" size="tiny">《隐私政策》</n-button>
  </div>
 </n-form>
 
</template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NButton
} from 'naive-ui';
const type = ref('login')
const title = ref('登录')
useHead(title)
const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  repassword: ''
})
const onSubmit = () => {

}
definePageMeta({
  layout: "login"
})
</script>

<style lang="scss" scoped>

</style>