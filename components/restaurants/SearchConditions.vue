<template>
  <div>
    <v-icon
      class="icon"
      large
      @click="drawer= !drawer"
    >
      mdi-magnify
    </v-icon>
    <div class="menu">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        width="100%"
        height="100%"
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>Foo</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Bar</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>Fizz</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-btn
        　@click="drawer= !drawer"
        >
          閉じる
        </v-btn>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  }
}
</script>

<style scoped>
.menu {
  position: absolute;
  width: 100%;
  height: 100%;
}
.icon {
  position: fixed;
  top: 7px;
  left: 7px;
  z-index: 10;
}
</style>
