<template>
  <div>
    <v-btn icon class="top-icon">
      <v-icon
        large
        @click="$router.push('/')"
      >
        mdi-arrow-left
      </v-icon>
    </v-btn>
    <v-card v-show="!loading" width="95%" class="my-5 mx-auto card">
      <v-img height="450px" :src="data.photo.pc.l" />
      <div class="favo">
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
      <div class="content">
        <h2>{{ data.name }}</h2>
        <icon-text icon="mdi-map-marker" :text="data.address + get_distance()"/>
        <icon-text icon="mdi-walk" :text="data.mobile_access"/>
        <icon-text icon="mdi-calendar-range" :text="data.open"/>
        <icon-text icon="mdi-web" :text="data.urls.pc" url="true"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import IconText from './IconText.vue'
export default {
  components: { IconText },
  data() {
    return {
      nowFavo: false,
      loading: true,
      data: {}
    }
  },
  async created() {
    await this.getData()
    this.nowFavo = this.favo()
    this.loading = false
    console.log(this.data)
  },
  computed: {
    getPosition() {
      return this.$store.getters['geolocation/position']
    }
  },
  methods: {
    async getData() {
      const data = this.$store.getters['restaurants/one'](this.$route.params.id)
      if (data) {
        this.data = data[0]
        return true
      }

      const apiData = await this.searchAPI()
      if (apiData.length !== 0) {
        this.data = apiData[0]
        return true
      }
      alert('お店が見つかりませんでした。')
      this.$router.push('/')
      return false
    },
    searchAPI() {
      return new Promise((resolve, reject) => {
        axios.get(process.env.BASE_URL + "gourmet/v1/", {
          params: {
            key: process.env.API_KEY,
            id: this.$route.params.id,
            format: "json"
          }
        })
        .then(response => {
          if (response.data.results.shop) {
            resolve(response.data.results.shop);
          } else {
            alert("店舗が見つかりませんでした。\n" + response.data.results.error[0].message)
            reject(false);
          }
        })
        .catch(error => {
          console.info(error);
          reject(false)
        });
      })
    },
    get_distance() {
      const R = Math.PI / 180;
      const positions = {
        lat1: this.getPosition.latitude * R,
        lng1: this.getPosition.longitude * R,
        lat2: this.data.lat * R,
        lng2: this.data.lng * R
      }
      const distance = 
        String(Math.round(10 * 6371 * Math.acos(Math.cos(positions.lat1) * Math.cos(positions.lat2) * Math.cos(positions.lng2 - positions.lng1) + Math.sin(positions.lat1) * Math.sin(positions.lat2)))/10)
      
      return　"　およそ " + distance + "km 先";
    },
    favo () {
      const list = this.getLocalStrage() 
      if (list.length === 0) { return false }

      const targetId = this.$route.params.id
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
        list.push(this.data)
      } else {
        const targetId = this.$route.params.id
        list.some(function(v, i) {
          if (v.id == targetId) list.splice(i,1);
        })
      }
      window.localStorage.setItem("favolist", JSON.stringify(list));
      this.nowFavo = this.favo()
    },
  }
}
</script>

<style scoped>
.card {
  text-align: left;
}
.content {
  position: relative;
  width: 95%;
  padding-bottom: 10px;
}
h2 {
  font-size: 20px;
  padding: 16px;
  font-weight: 570;
}
.top-icon {
  position: absolute;
  top: 7px;
  left: 7px;
  z-index: 10;
}
.icon {
  position: absolute;
  top: 10px;
  right: 7px;
  z-index: 10;
}
.favo {
  position: relative;
  width: 100%;
}
</style>
