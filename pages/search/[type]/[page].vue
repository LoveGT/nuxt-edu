<template>
  <div>
    <h5 class="text-lg my-3">"{{ title }}"的搜索相关结果</h5>
    <UiTab>
      <UiTabItem
        v-for="item in tabs"
        :key="item.value"
        :active="type === item.value"
        @click="handleClick(item.value)"
        >{{ item.label }}</UiTabItem
      >
    </UiTab>
    <LoadingGroup :pending="pending" :error="error">
      <n-grid :x-gap="20" :cols="4">
        <n-gi v-for="(item, index) in rows" :key="index">
          <CourseList :item="item"></CourseList>
        </n-gi>
      </n-grid>
      <div class="flex justify-center items-center mt-5 mb-10">
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
import { NGrid, NGi, NPagination } from "naive-ui";
const route = useRoute();
const title = ref(route.query.keyword);
const type = ref(route.params.type);

useHead({ title });

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
      type: t,
    },
    query: {
      ...route.query,
    },
  });
};

const page = ref(parseInt(route.params.page));
const limit = ref(10);
const { data, pending, error, refresh } = await useSearchListApi({
  page: page.value,
  keyword: encodeURIComponent(title.value),
  type: type.value,
});
const rows = computed(() => data.value?.rows ?? []);
const total = computed(() => data.value?.count ?? 0)

const onUpdatePage = (page)  => {
  navigateTo({
    params: {
      ...route.params,
      page: page
    },
    query: {
      ...route.query
    }
  })
}
definePageMeta({
  middleware: ["search"],
});
</script>
