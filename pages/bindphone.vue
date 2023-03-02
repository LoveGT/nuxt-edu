<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-02-25 17:41:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-27 14:33:50
-->
<template>
  <n-form :model="form" ref="formRef" :rules="rules" label-width="80" :inline="false" size="large" class="w-[340px]">
   <n-form-item :show-label="false" path="phone">
     <n-input v-model:value="form.phone" placeholder="手机号"/>
   </n-form-item>
   <n-form-item :show-label="false" path="code">
    <n-input-group>
     <n-input v-model:value="form.code" placeholder="验证码"/>
     <send-code :phone="form.phone"></send-code>
    </n-input-group>
   </n-form-item>
  </n-form>
  <div>
    <n-button type="primary" class="w-full" @click="onSubmit" :loading="loading">
     绑定
    </n-button>
  </div>
 </template>

<script setup>
import {
  NForm,
  NFormItem,
  NInput,
  NInputGroup,
  NButton,
createDiscreteApi,
} from 'naive-ui';

useHead('绑定手机号')
const route = useRoute()

const formRef = ref(null)
const form = reactive({
  phone: '',
  code: '',
})

const rules = {
  phone: [
    {
      required: true,
      message: '手机号必填'
    }
  ],
  code: [{
    required: true,
    message: '验证码必填'
  }]
}
const loading = ref(false)
const onSubmit = () => {
  formRef.value?.validate(async (errors) => {
    if(errors) return
    
    loading.value = true

    const { data, error } = await useBindPhoneApi(form)
    if(error.value) return

    const { message } = createDiscreteApi(['message'])
    message.success('绑定成功')

    navigateTo(route.query.from || '/', { replace: true })
  })
  .catch((err) => {
    console.log(err);
  })
}
// 回车登录
useEnterEvent(() => onSubmit())

definePageMeta({
  title: '绑定手机号',
  layout: "login"
})
</script>