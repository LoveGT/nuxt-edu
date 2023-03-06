<template>
  <div class="border-b p-5">
    {{ item }}
    <div class="cursor-pointer text-gray-600">
      <n-tag v-if="item.is_top" :bordered="false" tye="success" size="small">置顶</n-tag>
      {{ item.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer max-w-[500px]">
      <n-image 
        v-for="(it, i) in item.desc.images" 
        :key="i" 
        :src="it"
        :width="it.desc.images.length === 1 ? 300 : 150"
        :height="it.desc.images.length === 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"
        >
      </n-image>
    </div>
    <div class="flex mt-5">
      <n-button secondary strong size="tiny" class="mr-3">
        <template #icon>
          <n-icon>
            <ThumbsUpSharp /> 
          </n-icon>
        </template>
        点赞 {{ item.support_count || '' }}
      </n-button>
      <n-button secondary strong size="tiny" class="mr-3">
        <template #icon>
          <n-icon>
            <ChatboxEllipsesOutline  /> 
          </n-icon>
        </template>
        评论 {{ item.comment_count || '' }}
      </n-button>
      <n-button text size="tiny" class="mr-3">
        作者 {{ item.user.name || '' }}
      </n-button>
      <n-button size="tiny" type="error">
        删除
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { NImage, NTag, NButton, NIcon } from 'naive-ui';
import { ThumbsUpSharp, ChatboxEllipsesOutline } from '@vicons/ionicons5';
defineProps({
  item: Object
})
</script>