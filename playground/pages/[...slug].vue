<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(() => 'posts' + route.path, async () => {
  return await queryCollection('content').path(route.path).first()
})
</script>

<template>
  <ContentRenderer
    v-if="data"
    :value="data"
  />
</template>
