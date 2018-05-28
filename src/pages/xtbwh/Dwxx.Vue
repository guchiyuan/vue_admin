<template>
  <div class="dwxx">
    <!--工具条-->
    <el-button class="tool-btn" type="primary" icon="el-icon-plus" @click="handleAddDwxx" circle></el-button>
    <el-button class="tool-btn" type="primary" icon="el-icon-edit" @click="handleEditBtn" circle></el-button>

    <el-table :data="tablePage" :highlight-current-row="editable" border :max-height="height" @row-dblclick="handleDbclickRow" @row-click ="handleClickRow">
      <el-table-column prop="dwdm" label="单位代码">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.dwdm" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
          <span>{{scope.row.dwdm}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dwmc" label="单位名称">
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.dwmc" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
          <span>{{scope.row.dwmc}}</span>
        </template>
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
      editable:false,
      addDwxxFormVisible: true//新增界面是否显示
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
    },
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    handleDbclickRow(index,row) {
      return {"editable":true}
    },
    handleClickRow(index,row) {
      console.log(index);
      console.log(row);
      
    },
    handleEditBtn (){
      this.editable = !this.editable;
    },
    handleAddDwxx (){
      this.currentPage = Math.floor(this.total/this.pageSize) + 1;
      this.editable = true;    
      this.tablePage.push([]);
      this.addDwxxFormVisible = false;

    }
  },
  mounted () {
    this.getDwxx()
  }
}
</script>

<style lang="stylus" scoped>
.dwxx
  .tool-btn
    float right
    margin .2rem
  .el-table
    width 100%
    .el-input
      display none
    .current-row
      span
        display none
      .el-input
        display inline
// .editable
//   span
//     display none
//   .el-input
//     display inline
</style>

