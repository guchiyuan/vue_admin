<template>
<div class="navibar">
  <el-menu unique-opened :default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <div class="title">
      南京国图<br>授权管理系统      
    </div>

    <el-submenu v-if="admin" index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>系统表维护</span>
      </template>

      <el-menu-item index="/dwxx"><i class="el-icon-document"></i>单位信息表</el-menu-item>
      <el-menu-item index="/cplx"><i class="el-icon-document"></i>产品类型表</el-menu-item>
      <el-menu-item index="/jsxx"><i class="el-icon-document"></i>角色信息表</el-menu-item>
    </el-submenu>

     <!-- <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>角色成员管理</span>
      </template>
      <el-menu-item index="/jscyxx">角色成员信息表</el-menu-item>
    </el-submenu> -->
    <el-menu-item index="/jscyxx">
        <i class="el-icon-document"></i>
        <span slot="title">角色成员管理</span>
    </el-menu-item>

    <el-menu-item index="/djxx">
        <i class="el-icon-document"></i>
        <span slot="title">登记信息管理</span>
    </el-menu-item>

     <!-- <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>登记信息管理</span>
      </template>

      <el-menu-item index="/djxx">登记信息录入</el-menu-item>
     
    </el-submenu> -->
    
  </el-menu>

</div>


</template>

<script>

export default {
  name: 'Navi',
  data(){
    return{
      roleInfo:'',
      admin:true,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key);
        console.log(keyPath);
        // let route = '/dwxx';
        // this.handleSelect(route)
        
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        
        console.log(keyPath);
        this.$router.push(key);

    }
  },
  mounted(){
    this.roleInfo = JSON.parse(sessionStorage.getItem("roleInfo"));    
    if (this.roleInfo.role === '3') {
      this.admin = false
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


