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
  <n-form-item :show-label="false" path="username">
    <n-input v-model:value="form.username" :placeholder="type==='login'? '用户名/手机号/邮箱': '用户名'"/>
  </n-form-item>
  <n-form-item :show-label="false" path="password">
    <n-input v-model:value="form.password" type="password" placeholder="请输入密码"/>
  </n-form-item>
  <n-form-item v-show="type !== 'login'" :show-label="false" path="repassword">
    <n-input v-model:value="form.repassword" type="password" placeholder="请确认密码"/>
  </n-form-item>
  <div class="flex justify-between w-full mb-2">
    <n-button quaternary type="primary" size="tiny" @click="changeType">
      {{ type === 'login' ? '注册' : '登录' }}
    </n-button>
    <nuxt-link to="/forget">
      <n-button quaternary type="primary" size="tiny">忘记密码</n-button>
    </nuxt-link>
  </div>
  <div>
    <n-button type="primary" class="w-full" @click="onSubmit" :loading="loading">
      {{ type === 'login' ? '登录' : '注册' }}
    </n-button>
  </div>
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
  NButton,
  createDiscreteApi
} from 'naive-ui';

const route = useRoute()

const type = ref('login')
const title = ref('登录')
useHead(title)

const formRef = ref(null)
const form = reactive({
  username: '',
  password: '',
  repassword: ''
})

const rules = computed(() => {
  let r = {
    username: [{
      required: true,
      message: type.value === 'login' ? '用户名/手机号/邮箱必填' : '用户名必填'
    }],
    password: [{
      required: true,
      message: '密码必填'
    }]
  }
  if(type.value !== 'login') {
    r.repassword =  [{
      required: true,
      message: '确认密码必填'
    }, {
      validator: (rule, value) => {
        return value === form.password
      },
      message: '两次密码输入不一致',
      trigger: ['input', 'blur']
    }]
  }
  return r
})

const changeType = () => {
  type.value = type.value ==='login' ? 'reg' : 'login'
  title.value = type.value === 'login' ? '登录' : '注册'
  route.meta.title = title.value
  form.username = ''
  form.password = ''
  form.repassword = ''
  formRef.value.restoreValidation()
}
const loading = ref(false)
const onSubmit = () => {
  formRef.value?.validate(async (errors) => {
    if(errors) return
    loading.value = true
    const { data,error } = type.value === 'login' ? await useLoginApi(form) : await useRegApi(form)
    loading.value = false

    if (error.value) return
    
    const { message } = createDiscreteApi(['message'])
    message.success(type.value === 'login' ?'登录成功' : '注册成功')

    if(type.value === 'login') {
      // 将用户登录成功返回的token存储在cookie中，用户登录成功的标识
      const token = useCookie('token')
      token.value = data.value.token
      const user = useUser()
      user.value = data.value
      // 跳转
      navigateTo(route.query.from || "/", { replace: true })
    } else {
      changeType()
    }
  })
  .catch((err) => {
    console.log(err);
  })
}
// 回车登录
useEnterEvent(() => onSubmit())

definePageMeta({
  layout: "login",
  middleware: ['only-visitor']
})
</script>

<style lang="scss" scoped>

</style>