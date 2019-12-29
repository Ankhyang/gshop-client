<template>
  <div id="app">
    <router-view/>
    <FootGuide/>
  </div>
</template>

<script type="text/javascript">
import FootGuide from './components/FooterGuide/FooterGuide'
export default {
  components: {FootGuide},
  data () {
    return {}
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
