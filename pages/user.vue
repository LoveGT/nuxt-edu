<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-03-02 15:16:12
 * @LastEditors: 
 * @LastEditTime: 2023-03-06 15:12:02
-->
<template>
  <div>
    <n-grid :x-gap="20">
      <n-gi :span="5">
          <ul class="center-menu">
            <li :class="{ active: item.name === activeName }"
              v-for="item in menus" 
              :key="item.title"
              @click="navigate(item)"
              >
              {{ item.title }}
            </li>
            <li>购买记录</li>
          </ul>
      </n-gi>
      <n-gi :span="19">
        <div class="bg-white rounded mb-10 min-h-[75vh]">
          <nuxt-page :page-key="pageKey"></nuxt-page>
        </div>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup>
import { NGi, NGrid } from 'naive-ui';
const route = useRoute()
const pageKey = computed(() => route.fullPath)

const activeName = computed(() => route.name)
const menus = [{ 
  title: "学习记录",
  name: 'user-history-page'
},{ 
  title: '购买记录',
  name: 'user-buy-page'
},{ 
  title: '我的考试',
  name: 'user-test-page'
},{ 
  title: '我的帖子',
  name: 'user-post-page'
},{ 
  title: '优惠券记录',
  name: 'user-coupon-page'
},{ 
  title: '我的收藏',
  name: 'user-collection-page'
},{ 
  title: '修改资料',
  name: 'user-edit'
},{ 
  title: '其他设置'
},]

const navigate = (item) => {
  navigateTo({
    name: item.name,
    params: {
      page: 1
    }
  })
}

definePageMeta({
  middleware: ['auth']
})
</script>

<style scoped>
.center-menu {
  @apply list-none bg-white rounded;
}
.center-menu li {
  @apply px-5 py-3 text-sm cursor-pointer hover:(bg-blue-50);
}
.center-menu .active {
  @apply font-bold text-blue-500 bg-gray-200;
}
</style>