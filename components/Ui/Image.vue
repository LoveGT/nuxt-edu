<template>
  <img :src="src" alt="" v-bind="$attrs" :style="{'object-fit': objectFit}" @error="onImageError">
</template>

<script setup>
defineProps({
  src: String,
  objectFit: {
    type: String,
    default: 'cover'
  }
})

const onImageError = (e) => {
  e.target.src = "/fail.png"
}
</script>
