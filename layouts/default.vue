<template>
  <v-app>
    <Header />
    <search-conditions v-if="$route.name === 'index'"/>
    <nuxt class="main"/>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import SearchConditions from '../components/restaurants/SearchConditions.vue'
export default {
  components: {
    Header,
    Footer,
    SearchConditions
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP');

.main {
  text-align: center;
  height: 100%;
  max-width: 1000px;
}
.v-application{
    font-family: 'Noto Sans JP', sans-serif !important;
}

.v-application ul, .v-application ol {
  padding-left: 0px;
}
</style>
