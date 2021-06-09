<template>
  <Details />
</template>

<script>
import axios from 'axios'
import Details from '../../components/restaurants/Details.vue'
export default {
  components: { Details },
  async created () {
    await this.$store.dispatch('geolocation/fetchPosition')
  }
}
</script>
