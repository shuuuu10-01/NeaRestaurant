<template>
  <footer>
    <a href="http://webservice.recruit.co.jp/"><img src="http://webservice.recruit.co.jp/banner/hotpepper-m.gif" alt="ホットペッパー Webサービス" width="88" height="35" border="0" title="ホットペッパー Webサービス"></a>
    <p>© {{ getYear() }} shuuuu </p>
  </footer>
</template>

<script>
export default {
  methods: {
    getYear() {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  text-align: center;
}
</style>
