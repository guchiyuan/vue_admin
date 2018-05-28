<template>
  <div class="header">
    <el-dropdown>
      <i class="el-icon-setting"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="userTitle">管理员</span>
  </div>
</template>


<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    left 200px
    right 0
    height 1.2rem
    background #eee
    text-align right
    line-height 1.2rem
    padding 0 .4rem
    .userTitle
      font-size .32rem
</style>


