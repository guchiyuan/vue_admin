<template>
  <el-container class="container" id="app">
    <el-aside width="200px">
      <navi></navi>
    </el-aside>
    <el-container>
      <el-header>
        <header-view></header-view>
      </el-header>
      <el-main>
        <router-view/>  
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import Navi from '@/components/Navi'
import HeaderView from '@/components/Header'

export default {
  name: 'App',
  components:{
    Navi,
    HeaderView
  }
}
</script>

<style lang="stylus" scoped>
  .el-header
    padding 0 0
  .el-main
    padding 0 0
    position fixed
    top 60px
    bottom 0
    left 200px
    right 0

</style>

