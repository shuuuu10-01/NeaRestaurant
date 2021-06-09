<template>
  <div>
    <p v-if="text && !url"><v-icon>{{ icon }}</v-icon> {{ text }}</p>
    <a v-if="text && url" :href="text"><v-icon>{{ icon }}</v-icon> 店舗サイトへ</a>
  </div>
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
    },
    url: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
p, a {
  font-size: 14px;
  color: gray;
  padding-left: 16px;
  padding-bottom: 8px;
  text-decoration: none;
  margin-bottom: 0;
}
</style>
