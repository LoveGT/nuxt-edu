<template>
  <img
    v-for="(item, index) in data"
    :key="index"
    :src="item.src"
    alt=""
    class="mb-6 w-[100%] h-[100px] rounded cursor-pointer mt-6"
    @click="$commonOpen(item)"
  />
</template>

<script setup>
defineProps({
  data: Array,
});
</script>

<style lang="scss" scoped></style>
