<template>
  <div class="rounded border mb-5">
    <div class="bg-gray-50 p-3">
      <span class="mb-2 text-xs text-gray-400">学习进度</span>
      <n-progress type="line" :percentage="item.progress" :show-indicator="false"></n-progress>
    </div>
    <div class="p-2 flex">
      <n-tag size="small" v-if="$route.query.tab !== 'column' ">{{ t[item.type] }}</n-tag>
      <span class="ml-2 text-gray-700">{{ item.title }}</span>
      <n-button type="primary" size="tiny" class="ml-auto">继续观看</n-button>
    </div>
  </div>
</template>
<script setup>
import { NProgress, NButton, NTag } from "naive-ui"

defineProps({
  item: Object
})
const t = {
  audio: "音频",
  video: "视频",
  media: "图文",
  column: "专栏",
  book: "电子书",
  course: '课程'
}
</script>