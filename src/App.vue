<template>
  <div class="container" id="app">
    <navi></navi>
    <router-view/>
  </div>
</template>

<script>
import Navi from '@/components/Navi'

export default {
  name: 'App',
  components:{
    Navi
  }
}
</script>

<style lang="stylus" scoped>
  .container
    overflow hidden

</style>

