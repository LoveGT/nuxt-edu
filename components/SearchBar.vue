<template>
  <n-drawer v-model:show="drawer" placement="top" :on-after-leave="removeKeydownEvent" :on-after-enter="addKeydownEvent">
    <div class="h-full flex justify-center items-center">
      <n-input-group class="flex justify-center items-center">
        <n-input
          :style="{ width: '500px' }"
          v-model:value="keyword"
          size="large"
          placeholder="请输入关键词"
        />
        <n-button
          type="primary"
          size="large"
          ghost
          :disabled="!keyword"
          @click="handleSearch"
        >
          搜索
        </n-button>
      </n-input-group>
    </div>
  </n-drawer>
</template>

<script setup>
import { NDrawer, NInputGroup, NInput, NButton } from "naive-ui";
const drawer = ref(false);
const keyword = ref();
const open = () => {
  keyword.value = "";
  drawer.value = true;
};
const close = () => (drawer.value = false);
const handleSearch = () => {
  setTimeout(() => {
    close();
  }, 100);
  navigateTo({
    name: "search-type-page",
    params: {
      type: "course",
      page: 1,
    },
    query: {
      keyword: keyword.value,
    },
  });
};
const handleEnterEvent = (e) => {
  if(e.key === 'Enter' && keyword.value) {
    handleSearch()
  }
};
const addKeydownEvent = () => document.addEventListener('keydown', handleEnterEvent)
const removeKeydownEvent = () => document.removeEventListener('keydown', handleEnterEvent)
defineExpose({
  open,
});
</script>
