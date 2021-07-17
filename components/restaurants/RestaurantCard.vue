<template>
  <v-card
    class="mx-4 my-5 card"
    hover
    rounded
  >
    <v-img :height="height" :src="item.photo.pc.l" />
    <div class="under">
      <h2 class="text">{{ item.name }}</h2>
      <p v-show="item.catch" class="text">{{ item.catch }}</p>
      <icon-text icon="mdi-walk" :text="item.mobile_access" />
      <icon-text icon="mdi-map-marker" :text="get_distance()" />
      <v-btn
        outlined
        class="next"
        @click="$router.push('restaurant/' + item.id)"
      >
        詳しくは<v-icon>mdi-arrow-right</v-icon>
      </v-btn>
      <v-btn
        icon
        class="icon"
        v-show="!nowFavo"
        @click="setStorage(true)"
      >
        <v-icon large>mdi-star</v-icon>
      </v-btn>
      <v-btn 
        icon
        class="icon"
        v-show="nowFavo"
        color="#FBC02D"
        @click="setStorage(false)"
      >
        <v-icon large>mdi-star</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import IconText from './IconText.vue'
export default {
  components: { IconText },
  data () {
    return {
      nowFavo: false,
      height: String(window.innerHeight * 0.5)+'px'
    }
  },
  props: {
    item: Object
  },
  async created () {
    this.nowFavo = this.favo()
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  computed: {
    getPosition() {
      return this.$store.getters['geolocation/position']
    },
  },
  watch: {
    item() {
      this.nowFavo = this.favo()
    }
  },
  methods: {
    handleResize() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      this.height = String(window.innerHeight * 0.5)+'px';
    },
    favo () {
      const list = this.getLocalStrage() 
      if (list.length === 0) { return false }

      const targetId = this.item.id
      const include = list.some(function(v, i) {
        if (v.id === targetId) return true
      })
      return include
    },
    getLocalStrage() {
      const list = JSON.parse(localStorage.getItem('favolist'))
      if (list === null) {
        localStorage.setItem("favolist", JSON.stringify([]))
        return []
      }
      return list
    },
    setStorage(boolen) {
      let list = this.getLocalStrage()
      if (boolen) {
        list.push(this.item)
      } else {
        const targetId = this.item.id
        list.some(function(v, i) {
          if (v.id == targetId) list.splice(i,1);
        })
      }
      window.localStorage.setItem("favolist", JSON.stringify(list));
      this.nowFavo = this.favo()
    },
    get_distance() {
      const R = Math.PI / 180;
      const positions = {
        lat1: this.getPosition.latitude * R,
        lng1: this.getPosition.longitude * R,
        lat2: this.item.lat * R,
        lng2: this.item.lng * R
      }
      const distance = 
        String(Math.round(10 * 6371 * Math.acos(Math.cos(positions.lat1) * Math.cos(positions.lat2) * Math.cos(positions.lng2 - positions.lng1) + Math.sin(positions.lat1) * Math.sin(positions.lat2)))/10)
      
      return　"およそ " + distance + "km 先";
    }
  }
}
</script>

<style scoped>
.card {
  text-align: left;
  position: relative;
}
.icon {
  position: absolute;
  top: 7px;
  right: 7px;
  z-index: 7;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.under {
  position: relative;
}
.under .next{
  position: absolute;
  bottom: 7px;
  right: 7px;
}
</style>
