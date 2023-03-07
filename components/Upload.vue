<template>
  <div style="width: 100%">
    <ClientOnly>
      <n-upload
        accept="image/png,image/jpeg,image/gif"
        :action="action"
        :headers="headers"
        v-model:file-list="fileList"
        :data="data"
        list-type="image-card"
        :max="1"
        :on-error="onError"
        :on-finish="onSuccess"
        :multiple="max > 1"
      >
        <n-button>上传文件</n-button>
      </n-upload>
    </ClientOnly>
  </div>
</template>
<script setup>
import { createDiscreteApi, NUpload } from 'naive-ui';

const {
   action,
   headers
} = useUploadConfig()

const props = defineProps({
  modelValue:[String,Array],
  data: {type: Object},
  max:{
        type:Number,
        default:1
    }
})

const fileList = ref([])
// 初始化fileList
function initFileList(){
    if(typeof props.modelValue == "string"){
        fileList.value = props.modelValue ? [{
            id: props.modelValue,
            name: props.modelValue,
            status: 'finished',
            url: props.modelValue
        }] : []
    } else {
        fileList.value = props.modelValue.map(url=>{
            return {
                id: url,
                name: url,
                status: 'finished',
                url: url
            }
        })
    }
}
initFileList()

// 监听fileList变化
const stopWatch = watch(()=> fileList, (newVal) => {
  updateModelValue()
}, {
  deep: true
})
const onError = (e) => { 
  const { message } = createDiscreteApi(['message'])
  message.error('上传失败')
}
const onSuccess = (...e) => {
  const { file, event } = e[0]
  const response = JSON.parse(event.target.response)
  file.url = response.data
  return file
 }

const emit = defineEmits(['update:modelValue'])
function updateModelValue(){
    let urls = []
    fileList.value.forEach(o=>{
        if(o.status === "finished" && o.url){
            urls.push(o.url)
        }
    })
    emit("update:modelValue", props.max === 1 ? (urls[0] || "") : urls) 
}

onBeforeUnmount(() => stopWatch())
</script>