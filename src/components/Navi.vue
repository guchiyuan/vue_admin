<template>
<div class="navibar">
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>系统表维护</span>
      </template>

      <el-menu-item index="1-1">单位信息表</el-menu-item>
      <el-menu-item index="1-2">产品类型表</el-menu-item>
      <el-menu-item index="1-3">角色信息表</el-menu-item>
    </el-submenu>

     <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>角色成员管理</span>
      </template>

      <el-menu-item index="2-1">管理员</el-menu-item>
      <el-menu-item index="2-2">用户认证审核</el-menu-item>
      <el-menu-item index="2-3">授权登记录入</el-menu-item>
      <el-menu-item index="2-4">授权制作</el-menu-item>
    </el-submenu>

     <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>登记信息管理</span>
      </template>

      <el-menu-item index="3-1">登记信息录入</el-menu-item>
     
    </el-submenu>
    
  </el-menu>

</div>


</template>

<script>
export default {
  name:'Navi',
  methods:{
     handleOpen(key, keyPath) {
         console.log(key, keyPath);
       },
       handleClose(key, keyPath) {
         console.log(key, keyPath);
       }
     }

}
</script>

<style lang="stylus" scoped>
  .el-menu
    position absolute
    width 4rem
    top 0
    bottom 0
  .navibar
    float left
    
    
</style>


