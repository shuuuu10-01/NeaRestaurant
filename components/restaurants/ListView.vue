<template>
  <v-container 
    v-show="getList"
    width="90%"
  >
    <v-row 
      class="list d-flex flex-wrap"
    >
      <v-col
        v-for="item in getList"
        :key="item.num"
        class="align-self-start"
      >
        <restaurant-card :item="item"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RestaurantCard from './RestaurantCard.vue'

export default {
  components: {
    RestaurantCard  
  },
  computed: {
    getList () {
      return this.$store.getters['restaurants/list']
    }
  }
}
</script>

