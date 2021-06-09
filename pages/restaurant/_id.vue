<template>
  <v-card v-if="!loading" width="95%" class="my-5 mx-auto card">
    <v-img height="450px" :src="data.photo.pc.l" />
    <div class="content">
      <h2 class="text">{{ data.name }}</h2>
      <p v-if="data.catch" class="text">
        <v-icon dense>mdi-map-marker</v-icon> {{ data.address }}
      </p>
      <p class="text ">
        <v-icon dense>mdi-calendar-range</v-icon>  {{ data.open }}
      </p>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: true,
      data: {}
    }
  },
  async created() {
    await this.getData()
    this.loading = false
    console.log(this.data)
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
          console.info(response)
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
    }
  }
}
</script>

<style scoped>
.card {
  text-align: left;
}
.text {
  width: 95%;
  padding-bottom: 10px;
}
h2 {
  font-size: 20px;
  padding: 16px;
  font-weight: 570;
}
p {
  font-size: 14px;
  color: gray;
  padding-left: 16px;
  margin-bottom: 0px
}
</style>
