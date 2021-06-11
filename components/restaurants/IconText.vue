<template>
  <div>
    <p v-show="text && !url"><v-icon>{{ icon }}</v-icon> {{ text }}</p>
    <a v-show="text && url" :href="text"><v-icon>{{ icon }}</v-icon> 店舗サイトへ</a>
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
  font-size: 1.2vw;
  color: gray;
  padding-left: 16px;
  padding-bottom: 8px;
  text-decoration: none;
  margin-bottom: 0;
}
</style>
