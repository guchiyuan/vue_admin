<template>
  <div class="dwxx">
    <el-table :data="tablePage" border :max-height="height">
      <el-table-column prop="dwdm" label="单位代码">
      </el-table-column>
      <el-table-column prop="dwmc" label="单位名称">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size= "pageSize"
      :current-page="currentPage"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dwxx',
  data() {
    return {
      pageSize:5,
      currentPage:1,
      tableData: [],
      height: window.innerHeight - 100,
      total: 0,
    }
  },
  computed:{
    tablePage () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }

  },
  methods:{
    handleCurrentChange (curr) {
      this.currentPage = curr;
    },
    getDwxx () {
      axios.get('/api/dwxx.json')
      .then(this.getDwxxSucc)
    },
    getDwxxSucc (res) {
      console.log(res);
      res = res.data;
      if (res.code === '0000' && res.data) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
      
  
    }
  },
  mounted () {
    this.getDwxx()
  }
}
</script>

<style lang="stylus" scoped>
.dwxx
  .el-table
    width 100%
  
</style>

