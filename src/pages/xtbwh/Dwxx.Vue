<template>
  <div class="dwxx">
    <!--工具条-->
    <div class="toolbar-top">
      <span>单位信息表</span>
      <el-button class="tool-btn" type="primary" icon="el-icon-plus" @click="handleAddDwxx" circle></el-button>
      <!-- <el-button class="tool-btn" type="primary" icon="el-icon-edit" @click="handleEditBtn" circle></el-button> -->
    </div>
    <!-- :highlight-current-row="editable" -->
    <el-table v-loading="listLoading" :data="tablePage"  
              border :max-height="height" @row-dblclick="handleDbclickRow" 
              @row-click ="handleClickRow" 
              :header-row-style="rowStyle"
              >
      <el-table-column type="selection" width="50">
			</el-table-column>
      <el-table-column prop="dwdm" label="单位代码" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable"  size="small" v-model="scope.row.dwdm" 
                    placeholder="请输入内容" 
                    @change="handleEdit(scope.$index, scope.row)"
                    @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editable">{{scope.row.dwdm}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dwmc" label="单位名称" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" size="small" v-model="scope.row.dwmc" placeholder="请输入内容" 
                    @change="handleChange(scope.$index, scope.row)" 
                    @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editable">{{scope.row.dwmc}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="!scope.row.editable"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-show="scope.row.editable"
            size="mini"
            type="primary"                        
            @click="handleSave(scope.$index, scope.row)">保存</el-button>
          <el-button
            v-show="scope.row.editable"
            size="mini"
            @click="handleCancel(scope.$index, scope.row)">取消</el-button>
          <el-button
            v-show="!scope.row.editable"            
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   

    <!--工具条-->
		<el-col :span="24" class="toolbar-bottom">
      <!-- @click="batchRemove" :disabled="this.sels.length===0" -->
			<el-button type="danger" >批量删除</el-button>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size= "pageSize"
        :current-page="currentPage"
        :total="total">
      </el-pagination>
		</el-col>

  
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dwxx',
  data() {
    return {
      pageSize: Math.floor((window.innerHeight - 230)/53),
      currentPage:1,
      tableData: [],
      total: 0,
      listLoading: false,
      // unediting:true,
      // editing:false
    }
  },
  computed:{
    tablePage () {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    height () {
      return (this.pageSize + 1) *59
    }

  },
  methods:{
    handleCurrentChange(curr) {
      console.log(this.tablePage);
      for (let i = 0; i < this.tablePage.length; i++) {
        let item = this.tablePage[i];
        if (item.editable) {
          item.editable = false;
        } 
      }

      this.currentPage = curr;
      
      

    },

    getDwxx () {
      this.listLoading = true;
      axios.get('/api/dwxx.json')
      .then(this.getDwxxSucc)
    },
    getDwxxSucc (res) {
      this.listLoading = false;
      console.log(res);
      res = res.data;
      if (res.code === '0000' && res.data) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
    },
    handleChange(index, row) {
      console.log(index);
      console.log(row);
    },
    handleDbclickRow (row) {
      // this.tableData.map(function(item){  
      //   item.editable = false
      // });
      // row.editable = true;
      // console.log(row.editable);
      
    },
    handleClickRow () {
      
    },
    handleBlur () {
        // this.tableData.map(function(item){  
        // item.editable = false
      // });
    },
    handleEditBtn (){
      this.editable = !this.editable
    },
    handleAddDwxx (){
      console.log(this.tablePage);
      if(this.tablePage[this.tablePage.length - 1].dwdm === ''){
        this.$message({
              message: '亲，您还有新数据没填写完整！',
              type: 'warning'
            });
      } else {
        this.currentPage = Math.floor(this.total/this.pageSize) + 1;
        this.tablePage.map((item) => {  
          item.editable = false
        });
        this.tablePage.push({"dwdm":"","dwmc":"","editable":true});
      }
      
    },
    handleEdit(index, row) {
      row.editable = !row.editable;
      this.tablePage.map((item) => {
        item.editable = false
      });
      row.editable = true;
      console.log(index);
      console.log(row);
    },

    handleCancel(index,row){
      this.getDwxx ();
      row.editable = !row.editable;
      this.$message({
          type: 'info',
          message: '已取消编辑'
        });         
       
    },

     handleSave(index,row){
      row.editable = !row.editable;
      //调用接口后回调消息
      this.$message({
          showClose: true,
          message: '保存成功！',
          type: 'success'
        });
    },

    handleDelete (index, row){
     this.$confirm('是否删除此条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用接口
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    rowStyle(row) {
      return 'color:green'
    }
  },
  mounted () {
    this.getDwxx()
  }
}
</script>

<style lang="stylus" scoped>
.dwxx
  .toolbar-top
    padding .36rem 0
    span
      font-size .44rem
      margin-left .2rem
    .tool-btn
      float right
      margin 0 .2rem
  .el-table
    margin-top .2rem
    width 100%
    // .el-input
    //   display none
    // .current-row
    //   span
    //     display none
    //   .el-input
    //     display inline
  .toolbar-bottom
    background #eee
    padding .1rem
    .el-pagination
      float right 
// .editable
//   span
//     display none
//   .el-input
//     display inline
</style>

