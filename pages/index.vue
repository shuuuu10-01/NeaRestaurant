<template>
  <div class="index">
    <carousel v-show="restaurants !== []" />
  </div>
</template>

<script>
import Carousel from '../components/restaurants/Carousel.vue'
import SearchConditions from '../components/restaurants/SearchConditions.vue'
export default {
  components: { Carousel, SearchConditions },
  computed: {
    restaurants () {
      return this.$store.getters['restaurants/list']
    },
    position () {
      return this.$store.getters['geolocation/position']
    }
  },
  async mounted () {
    this.$store.dispatch('geolocation/fetchPosition')
    .then(() => {
      this.$store.dispatch('restaurants/fetchAPI', this.position)
    })
    .catch(() => {
      this.$store.dispatch('restaurants/fetchAPI', this.position)
    })
    console.info(this.restaurants)
  }
}
</script>

<style scoped>
.index {
  width: 100%;
  margin: auto;
}
</style>
