<template>
  <div class="border-b p-5">
    <div class="cursor-pointer text-gray-600" @click="onDetail">
      <n-tag v-if="item.is_top" :bordered="false" type="success" size="small">置顶</n-tag>
      {{ item.desc.text }}
    </div>
    <div class="mt-3 cursor-pointer max-w-[500px]">
      <n-image 
        v-for="(it, i) in item.desc.images" 
        :key="i" 
        :src="it"
        :width="item.desc.images.length === 1 ? 300 : 150"
        :height="item.desc.images.length === 1 ? 200 : 100"
        class="mr-3 mb-2 rounded"
        preview-disabled
        >
      </n-image>
    </div>
    <div class="flex mt-5">
      <n-button secondary strong size="tiny" class="mr-3" 
        :type="item.isSupport ? 'primary' : 'tertiary'"
        :loading="loading"
        @click="onSupport(item)">
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
      <n-button size="tiny" type="error" class="mr-3"
        @click="onDelete(item)" 
        :loading="delLoading">
        删除
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { NImage, NTag, NButton, NIcon, createDiscreteApi } from 'naive-ui';
import { ThumbsUpSharp, ChatboxEllipsesOutline } from '@vicons/ionicons5';
const props =defineProps({
  item: Object
})

const { loading, onSupport } = useHandleSupportPost()

const emit = defineEmits(['delete'])
const delLoading = ref(false)
const onDelete = (item) => {
  const { message, dialog } = createDiscreteApi(['message', 'dialog'])
  dialog.warning({
    content: '是否要删除该帖子？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      delLoading.value = true
      emit('delete', {
        id: props.item.id,
        success() {
          message.success('删除成功')
          delLoading.value = false
        },
        fail() {
          message.error('删除失败')
          delLoading.value = false
        }
      })
    }
  })
}
const onDetail = () => {
  navigateTo(`/post_detail/` + props.item.id)
}
</script>