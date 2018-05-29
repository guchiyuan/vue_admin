<template>
<div class="navibar">
  <el-menu unique-opened default-active="" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <div class="title">
      南京国图<br>授权管理系统      
    </div>

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
        
        switch (key) {
          case '1-1':
            this.$router.push('/dwxx');
            
            break;
          case '1-2':
            this.$router.push('/cplx')
            
            break;
          case '1-3':
            this.$router.push('/jsxx')
            
            break;
        }

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


