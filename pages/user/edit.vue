<template>
  <div class="p-5">
    <n-form :model="form" ref="formRef" :rules="rules" label-width="80" label-placement="left">
      <n-form-item label="用户名">
        <n-input v-model:value="user.username" disabled/>
      </n-form-item>
      <n-form-item label="头像" path="avatar">
       <Upload v-model="form.avatar" />
      </n-form-item>
      <n-form-item label="昵称" path="nickname">
        <n-input v-model:value="form.nickname" placeholder="请输入昵称"/>
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-radio-group v-model:value="form.sex" name="radiogroup">
          <n-space>
            <n-radio v-for="item in options" :key="item.value" :value="item.value">
              {{ item.value }}
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item class="flex justify-end">
        <n-button type="primary" :loading="loading" @click="onSubmit">提交修改</n-button>
      </n-form-item>
    </n-form>
    
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput, NRadio, NSpace, NRadioGroup, NButton, createDiscreteApi } from 'naive-ui';

const user = useUser()
const formRef = ref(null)
const form = reactive({
  avatar: '',
  nickname: '',
  sex: ''
})

// 初始化表单
if(user.value) {
  form.avatar = user.value.avatar
  form.nickname = user.value.nickname
  form.sex = user.value.sex
}
const rules = {
  nickname: [{
    require: true,
    message: '昵称不能为空'
  }],
  sex: [{
    require: true,
    message: '性别不能为空'
  }]
}
const options = [{
  value:'未知',
},
{
  value:'男',
  
},{
  value:'女',
  
}]
const loading = ref(false)
const onSubmit = () => {
  formRef.value.validate(async (errors)=> {
    if(errors) return
    loading.value = true
    const { error } = await useUpdateInfoApi(form)
    loading.value = false
    if(error.value) return
    const { message } = createDiscreteApi(['message'])
    message.success('修改成功')

    // 刷新用户信息
    useRefreshUserInfo()
  })
}
</script>