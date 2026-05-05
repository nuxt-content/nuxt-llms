<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'AlternateGetter' })

const slug = ref('post-from-getter')
useLlmsAlternate(() => `/raw/${slug.value}.md`)
</script>

<template>
  <div>getter</div>
</template>
