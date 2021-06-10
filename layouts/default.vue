<template>
  <v-app>
    <Header />
    <nuxt class="main"/>
    <Footer />
  </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP');

.main {
  max-width: 1000px;
  text-align: center;
  height: 100%;
}
.v-application{
    font-family: 'Noto Sans JP', sans-serif !important;
}

.v-application ul, .v-application ol {
  padding-left: 0px;
}
</style>
