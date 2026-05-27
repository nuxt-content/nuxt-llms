<script setup lang="ts">
defineOptions({ name: 'AlternateEmpty' })
useLlmsAlternate(null)
useLlmsAlternate('')
useLlmsAlternate(() => undefined)
</script>

<template>
  <div>empty</div>
</template>
