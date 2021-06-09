<template>
  <p v-if="text"><v-icon>{{ icon }}</v-icon> {{ text }}</p>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
