<template>
  <v-card
    class="mx-4 my-5 card"
    hover
    rounded
  >
    <v-btn
      icon
      class="icon"
      v-if="!nowFavo"
      @click="setStorage(true)"
    >
      <v-icon large>mdi-star</v-icon>
    </v-btn>
    <v-btn 
      icon
      class="icon"
      v-if="nowFavo"
      color="#FBC02D"
      @click="setStorage(false)"
    >
      <v-icon large>mdi-star</v-icon>
    </v-btn>
    <v-img height="450px" :src="item.photo.pc.l" />
    <h2 class="text">{{ item.name }}</h2>
    <p v-if="item.catch" class="text">{{ item.catch }}</p>
    <div class="under">
      <p><v-icon>mdi-map-marker</v-icon>{{ item.mobile_access }}</p>
      <v-btn
        outlined
        class="next"
        @click="$router.push('restaurant/' + item.id)"
      >
        詳しくはこちら<v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      nowFavo: false
    }
  },
  props: {
    item: Object
  },
  async created () {
    this.nowFavo = this.favo()
  },
  methods: {
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
  padding-bottom: 8px;
}
.under .next{
  position: absolute;
  bottom: 7px;
  right: 7px;
}
</style>
