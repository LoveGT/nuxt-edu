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
      <div class="p-3">
        <n-grid :x-gap="20" :cols="2">
          <n-gi v-for="item in rows " :key="item.id">
              <UserCouponList :item="item"/>
          </n-gi>
        </n-grid>
        
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
import { NGi, NGrid, NPagination } from 'naive-ui';

useHead({ title: '优惠券记录'})

const {
    page,
    limit,
    pending,
    error,
    refresh,
    rows,
    total,
    onUpdatePage
  } = await usePage(({ page, limit }) => useUserCouponApi(page))
</script>
