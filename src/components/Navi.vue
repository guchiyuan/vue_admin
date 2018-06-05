<template>
<div class="navibar">
  <el-menu unique-opened default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <div class="title">
      南京国图<br>授权管理系统      
    </div>

    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>系统表维护</span>
      </template>

      <el-menu-item index="/dwxx">单位信息表</el-menu-item>
      <el-menu-item index="/cplx">产品类型表</el-menu-item>
      <el-menu-item index="/jsxx">角色信息表</el-menu-item>
    </el-submenu>

     <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>角色成员管理</span>
      </template>
      <el-menu-item index="/jscyxx">角色成员信息表</el-menu-item>
      <!-- <el-menu-item index="/admin_sq">管理员</el-menu-item>
      <el-menu-item index="/check_sq">用户认证审核</el-menu-item>
      <el-menu-item index="/register_sq">授权登记录入</el-menu-item>
      <el-menu-item index="/create_sq">授权制作</el-menu-item> -->
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
  name: 'Navi',
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        
        console.log(keyPath);
        this.$router.push(key);

    }
  }
}

</script>

<style lang="stylus" scoped>
  .navibar
    .title
      font-size .44rem
      text-align center
      color #fff
      padding .4rem .4rem
      line-height .66rem
    .el-menu
      position absolute
      width 4rem
      top 0
      bottom 0
    
    
</style>


