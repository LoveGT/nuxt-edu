<!--
 * @Descripttion: 
 * @version: 
 * @Author: tanchongzheng
 * @Date: 2023-03-02 15:41:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-06 15:11:18
-->
<template>
  <LoadingGroup :pending="pending" :error="error" :is-empty="!rows.length">
      <div class="px-3">
        <UserTestList v-for="item in rows" :key="item.id" :item="item"/>
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
</template>
<script setup>
import { NPagination } from 'naive-ui';

useHead({ title: '考试记录'})

const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    onUpdatePage
  } = await usePage(({ page, limit }) => useUserTestApi(page))
</script>
