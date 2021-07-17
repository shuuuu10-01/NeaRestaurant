<template>
  <hooper
    ref="carousel"
    @slide="updateCarousel"
    v-bind="options"
    v-show="list !== []"
    style="height: 100%; margin: auto;"
  >
    <slide 
      v-for="item in list"
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
      },
      list: [],
      scroll_end: false
    }
  },
  components: {
    RestaurantCard,
    Hooper,
    Slide
  },
  watch: {
    getList() {
      if (!this.scroll_end) {
        this.$refs.carousel.slideTo(0);
      }
      this.list = this.getList
    }
  },
  computed: {
    getList () {
      return this.$store.getters['restaurants/list']
    },
    position () {
      return this.$store.getters['geolocation/position']
    },
    getFavo() {
      return this.$store.getters['restaurants/favo']
    }
  },
  methods: {
    async updateCarousel(payload) {
      if (this.scroll_end || this.getList === [] || this.getList.length - 1 !== payload.currentSlide || this.getFavo) {
        return false
      }

      let data = this.position
      data.start = this.getList.length+1
      this.scroll_end = true
      await this.$store.dispatch('restaurants/fetchAPI', data)
      this.scroll_end = false
      if (this.list.length !== this.getList.length) {
        this.list = this.getList
      }
    }
  }
}
</script>

