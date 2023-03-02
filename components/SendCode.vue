<template>
  <n-button type="primary" ghost :loading="loading" :disabled="time > 0 || !phone" @click="onSend">
    {{ text }}
  </n-button>
</template>

<script setup>
import {
  NButton,
  createDiscreteApi
} from 'naive-ui';

const props = defineProps(['phone'])
const loading = ref(false)
const time = ref(0)
const timer = ref(null)
const text = computed(() => {
  if (loading.value) {
    return "发送中..."
  }
  if (time.value) {
    return `${time.value} s`
  }
  return `获取验证码`
})
const onSend = async () => {
  loading.value = true
  const { data, error } = await useGetCaptchaApi(props.phone)
  loading.value = false

  if (error.value) return

  time.value = 60
  if(time.value) clearInterval(timer.value)
  timer.value = setInterval(() => {
    time.value--
    if(time.value <= 0) {
      clearInterval(timer.value)
    }
  },1000)

  const msg = data.value === 'ok' ? '发送成功' : `当前是演示模式，您的验证码是${data.value}`
  const { message } = createDiscreteApi(['message'])
  message.success(msg)
} 
</script>

<style lang="scss" scoped>

</style>