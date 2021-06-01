<template>
  <hooper v-bind="options" style="height: 90%; margin: auto;">
    <slide 
      v-for="item in getList"
      :key="item.num"
    >
      <restaurant-card :item="item"/>
    </slide>
  </hooper>
</template>

<script>
import RestaurantCard from './RestaurantCard.vue'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css' // hooperのcssを適用

export default {
  data () {
    return {
      options: {
        vertical: true,
        itemsToShow: 1,
        centerMode: true,
        progress: true
      }
    }
  },
  components: {
    RestaurantCard,
    Hooper,
    Slide
  },
  computed: {
    getList () {
      return this.$store.getters['restaurants/list']
    }
  }
}
</script>

