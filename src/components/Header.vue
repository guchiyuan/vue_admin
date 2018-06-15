<template>
  <div class="header">
    <el-dropdown trigger="click" @command="handleCommand">
      <i class="el-icon-setting"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="goToApply">申请系统</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="userTitle">管理员</span>
  </div>
</template>


<script>
import axios from 'axios'
const ADDRESS_LOGOUT = '/api/logout'

export default {
  methods:{
    handleCommand (command) {
      // alert(command);
      if (command==='goToApply') {
        window.location.href = './checkAdminPanel.html'
      }

       if (command==='logout') {
        axios.get(ADDRESS_LOGOUT).then((res)=>{
          console.log(res);
          
          // if (res.code === '0000') {
            window.location.href = '/'
          // } else {
          //   this.$message({
          //     type: 'warning',
          //     message: '退出登录失败！'
          //   });
          // }
        });
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position absolute
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


