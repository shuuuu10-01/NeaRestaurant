<template>
  <div>
    NeaRestaurant
  </div>
</template>

<script>
export default {
  computed: {
    restaurants () {
      return this.$store.getters['restaurants/list']
    },
    position () {
      return this.$store.getters['geolocation/position']
    }
  },
  async mounted () {
    console.info(this.restaurants)
    await this.fetchAPI()
    await this.fetchPosition()
    console.info(this.restaurants)
  },
  methods: {
    fetchAPI () {
      const data = [3, 4, 5]
      return this.$store.dispatch('restaurants/fetchAPI', data)
    },
    fetchPosition () {
      return this.$store.dispatch('geolocation/fetchPosition')
    }
  }
}
</script>
