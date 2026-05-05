<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(() => 'posts' + route.path, async () => {
  return await queryCollection('content').path(route.path).first()
})

useLlmsAlternate(() => {
  const path = data.value?.path
  return path && path !== '/' ? `/raw${path}.md` : null
})
</script>

<template>
  <ContentRenderer
    v-if="data"
    :value="data"
  />
</template>
