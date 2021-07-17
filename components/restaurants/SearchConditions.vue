<template>
  <div>
    <v-btn icon class="icon">
      <v-icon
        large
        @click="drawer= !drawer"
      >
        mdi-magnify
      </v-icon>
    </v-btn>
    <div class="menu">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="100%"
        height="100%"
      >
        <icon-text icon="mdi-walk" text="お店の検索範囲（現在地から）" class="text"/>
        <div class="slider">
          <v-slider
            v-model="range"
            :tick-labels="ticksLabels"
            min="1"
            max="5"
            ticks="always"
            tick-size="4"
            width="90%"
          ></v-slider>
        </div>
        <icon-text icon="mdi-store" text="お店のジャンル" class="text"/>
        <v-checkbox
          v-model="all"
          label="すべて"
          color="blue"
          hide-details
          class="mx-3"
          @click="setAll"
          :disabled="favo"
        ></v-checkbox>
        <div class="genre">
          <v-checkbox
            v-model="genre"
            append-icon="mdi-glass-mug-variant"
            label="居酒屋"
            color="primary"
            value="G001"
            hide-details
            class="mx-3"
            :disabled="favo"
          ></v-checkbox>
          <v-checkbox
            v-model="genre"
            label="和食"
            color="secondary"
            value="G004"
            hide-details
            class="mx-3"
            append-icon="mdi-food-variant"
            :disabled="favo"
          ></v-checkbox>
          <v-checkbox
            v-model="genre"
            label="洋食"
            color="success"
            value="G005"
            hide-details
            class="mx-3"
            append-icon="mdi-pasta"
            :disabled="favo"
          ></v-checkbox>
          <v-checkbox
            v-model="genre"
            label="中華"
            color="warning"
            value="G007"
            hide-details
            class="mx-3"
            append-icon="mdi-food-croissant"
            :disabled="favo"
          ></v-checkbox>
          <v-checkbox
            v-model="genre"
            label="焼肉"
            color="error"
            value="G008"
            hide-details
            class="mx-3"
            append-icon="mdi-food-turkey"
            :disabled="favo"
          ></v-checkbox>
          <v-checkbox
            v-model="genre"
            label="ラーメン"
            color="yellow"
            value="G013"
            hide-details
            append-icon="mdi-noodles"
            class="mx-3"
            :disabled="favo"
          ></v-checkbox>
        </div>
        <v-checkbox
            v-model="favo"
            label="お気に入り"
            color="#FBC02D"
            hide-details
            prepend-icon="mdi-star"
            class="mx-3 my-10"
          ></v-checkbox>
        <v-btn
        　@click="close"
          class="close-button"
        >
          閉じる
        </v-btn>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import IconText from './IconText.vue'
export default {
  components: { IconText },
  data () {
    return {
      drawer: false,
      range: 4,
      ticksLabels: [
        '300m',
        '500m',
        '~1km',
        '~2km',
        '~3km'
      ],
      basic: [
        'G001',
        'G004',
        'G005',
        'G007',
        'G008',
        'G013',
      ],
      genre: [],
      all: true,
      favo: false,
      b_range: 0,
      b_genre: [],
      b_all: false
    }
  },
  created() {
    this.genre = this.basic
  },
  computed: {
    getPosition() {
      return this.$store.getters['geolocation/position']
    }
  },
  watch: {
    genre() {
      if (this.genre.length == 6) {
        this.all = true
      } else {
        this.all = false
      }
      this.$store.dispatch('restaurants/changeGenre', this.genre)
    },
    range() {
      this.$store.dispatch('restaurants/changeRange', this.range)
    },
    favo() {
      if (this.favo) {
        this.all = true
        this.setAll()
      }
      this.$store.dispatch('restaurants/changeFavo', this.favo)
    },
    drawer() {
      this.b_range = this.range
      this.b_all = this.all
      this.b_genre = this.genre
    }
  },
  methods: {
    setAll() {
      if (this.all) {
        this.genre = this.basic
      } else {
        this.genre = []
      }
    },
    close() {
      this.drawer = false
      if (this.favo || this.checkUpdate()) return true
      
      let data = this.getPosition
      data.start = null
      this.$store.dispatch('restaurants/fetchAPI', data)
    },
    checkUpdate() {
      return this.b_range === this.range && this.b_all === this.all && this.b_genre === this.genre
    }
  }
}
</script>

<style scoped>
.menu {
  position: absolute;
  width: 100%;
  height: 80%;
}
.icon {
  position: absolute;
  top: 7px;
  left: 7px;
  z-index: 10;
}
.slider {
  width: 90%;
  margin: auto;
}
.text {
  margin-top: 10px;
  text-align: left;
  color: black;
}
.text p{
  color: black;
}
.genre {
  width: 95%;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.close-button {
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>
