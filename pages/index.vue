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
    }
  },
  async mounted () {
    console.info(this.restaurants)
    await this.fetchAPI()
    console.info(this.restaurants)
  },
  methods: {
    fetchAPI () {
      const data = [3, 4, 5]
      return this.$store.dispatch('restaurants/fetchAPI', data)
    }
  }
}
</script>
