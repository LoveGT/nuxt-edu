<template>
  <div class="tab">
    <slot />
  </div>
</template>

<style>
.tab {
  @apply w-full flex overflow-auto bg-white mb-4 rounded;
}
</style>