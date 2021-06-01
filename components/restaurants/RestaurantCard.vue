<template>
  <v-card
    class="mx-4 my-5 card"
    hover
    rounded
  >
    <v-img height="500px" :src="item.photo.pc.l" />
    <h2 class="text">{{ item.name }}</h2>
    <p v-if="item.catch" class="text">{{ item.catch }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style scoped>
.card {
  text-align: left;
}
.text {
  width: 95%;
}
h2 {
  font-size: 16px;
  padding: 16px;
  font-weight: 570;
}
p {
  font-size: 14px;
  color: gray;
  padding-left: 16px;
  padding-bottom: 10px;
}
</style>
