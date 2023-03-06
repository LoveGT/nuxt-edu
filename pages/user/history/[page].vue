<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-03-02 15:41:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-06 15:08:42
-->
<template>
  <div>
    <UiTab>
      <UiTabItem
        v-for="item in tabs"
        :key="item.value"
        :active="type === item.value"
        @click="handleClick(item.value)"
        >{{ item.label }}</UiTabItem
      >
    </UiTab>
    <LoadingGroup :pending="pending" :error="error" :is-empty="!rows.length">
      <div class="px-3">
        <UserHistoryList v-for="item in rows" :key="item.id" :item="item"/>
      </div>
      <div class="flex justify-center items-center mt-5 pb-10">
        <n-pagination
          size="large"
          :item-count="total"
          v-model:page="page"
          v-model:page-size="limit"
          :on-update:page="onUpdatePage"
        />
      </div>
    </LoadingGroup>
  </div>
</template>
<script setup name="Search">
import { NPagination } from "naive-ui";
const route = useRoute();
const type = ref(route.query.tab || 'course');

useHead({ title: '学习记录' });

const tabs = [
  {
    label: "课程",
    value: "course",
  },
  {
    label: "专栏 ",
    value: "column",
  },
];

const handleClick = (t) => {
  navigateTo({
    params: {
      ...route.params,
      page: 1
    },
    query: {
      ...route.query,
      tab: t
    },
  });
};

const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    onUpdatePage
  } = await usePage(({ page, limit }) => useUserHistoryApi(() => ({
      page,
      type: type.value,
    }))
  );
</script>
