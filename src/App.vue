<template>
  <div id="app">
    <router-view />
    <FootGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script type="text/javascript">
import FootGuide from './components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  components: { FootGuide },
  data () {
    return {}
  },
  mounted () {
    this.getAddress()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  }
}
</script>

<style lang="stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
