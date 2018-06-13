<template>
  <div class="dwxx">
    <!--工具条-->
    <div class="toolbar-top">
      <!-- <span>单位信息表</span> -->
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="单位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getFilterData" icon="el-icon-search" circle></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd" icon="el-icon-plus" circle></el-button>
        </el-form-item>
      </el-form>

      <!-- <el-button class="tool-btn" type="primary" icon="el-icon-edit" @click="handleEditBtn" circle></el-button> -->
    </div>
    <!-- :highlight-current-row="editing" -->
    <el-table v-loading="listLoading" :data="tablePage" border :max-height="height" @row-dblclick="handleDbclickRow" @row-click="handleClickRow"
      :header-row-style="rowStyle" @selection-change="selsChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="dwdm" label="单位代码" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.dwdm" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.dwdm}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dwmc" label="单位名称" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.dwmc" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.dwmc}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="xzqjb" label="行政区级别" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.xzqjb" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.xzqjb}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-show="!scope.row.editing" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button v-show="scope.row.editing" size="mini" type="primary" @click="handleSave(scope.$index, scope.row)">保存</el-button>
          <el-button v-show="scope.row.editing" size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
          <el-button v-show="!scope.row.editing" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, tablePage)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--工具条-->
    <el-col :span="24" class="toolbar-bottom">
      <!-- @click="batchRemove" :disabled="this.sels.length===0" -->
      <el-button plain @click="batchDelete" type="danger" :disabled="this.sels.length===0" icon="el-icon-delete">批量删除</el-button>
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage"
        :total="total">
      </el-pagination>
    </el-col>

  
  </div>
</template>


<script>
import axios from 'axios'

const ADDRESS_DWXX = 'api/systable/dwxx'

export default {
  name: 'Dwxx',
  data() {
    return {
      pageSize: Math.floor((window.innerHeight - 230)/53),
      // pageSize: 20,
      currentPage:1,
      tableData: [],
      total: 0,
      listLoading: false,
      sels: [],//列表选中列
      filters: {
					name: ''
        },
      filterData:[],

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
    getFilterDataSucc(res) {
      this.listLoading = false;      
      res = res.data;
      if (res.code === '0000' && res.data) {
        this.tableData = res.data;
        this.total = res.data.length;
      }
      this.filterData = [];

      // console.log(this.tableData);
      

      if (this.filters.name !== '') {    
          this.tableData.map((item) => {
            if (item.dwmc.indexOf(this.filters.name) !== -1) {
              this.filterData.push(item);         
          }
        });

        console.log(this.filterData);
        this.tableData = this.filterData;
        console.log(this.filterData.length);
        // this.tableData = this.filterData.slice(0,this.filterData.length);
        this.total = this.tableData.length;
        console.log(this.tableData);
        
      } 

    },


    getFilterData (){
      this.listLoading = true;
      //解决除首页外搜索问题 
      this.currentPage = 1;
      // axios.get('/api/dwxx.json').then(this.getFilterDataSucc);
      axios.get(ADDRESS_DWXX).then(this.getFilterDataSucc);
      
    },

    handleCurrentChange(curr) {
      console.log(this.tablePage);
      for (let i = 0; i < this.tablePage.length; i++) {
        let item = this.tablePage[i];
        if (item.editing) {
          item.editing = false;
        } 
      }

      this.currentPage = curr;
      console.log(this.tableData);
      
    },

    getDwxx () {
      this.listLoading = true;
      // axios.get('/api/dwxx.json')
      // .then(this.getDwxxSucc)
      axios.get(ADDRESS_DWXX)
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
    
    },
    handleClickRow () {
      
    },
    handleBlur () {
      
    },
    handleEditBtn (){
      this.editing = !this.editing
    },
    handleAdd (){
      console.log(this.tablePage);
      if(this.tablePage[this.tablePage.length - 1].dwdm === ''){
        this.$message({
              message: '亲，您还有新数据没填写完整！',
              type: 'warning'
            });
      } else {
        this.currentPage = Math.floor(this.total/this.pageSize) + 1;
        this.tablePage.map((item) => {  
          item.editing = false
        });
        this.tablePage.push({"dwdm":"","dwmc":"","editing":true});
      }
      
    },
    handleEdit(index, row) {
      row.editing = !row.editing;
      this.tablePage.map((item) => {
        item.editing = false
      });
      row.editing = true;
      console.log(index);
      console.log(row);

      this.editFormVisible = true;
			this.editForm = Object.assign({}, row);

    },

    handleCancel(index,row){
      row.editing = !row.editing;
      this.$message({
          type: 'info',
          message: '已取消编辑'
        });

      //当前页不存在数据时，定位到前一页
      if (this.tablePage.length === 1) {
        this.currentPage = this.currentPage - 1;
      }
      this.getDwxx();       
       
    },

     handleSave(index, row) {
       row.editing = !row.editing;
       
       if (!row.index) {
         this.$confirm('是否保存新增数据?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           //调用接口后回调消息
           axios.post(ADDRESS_DWXX, {
             'dwdm': row.dwdm,
             'dwmc': row.dwmc,
             'xzqjb': row.xzqjb,
             'xw': '1'
           }).then((res) => {
             if (res.data.code === '0000') {
               this.$message({
                 showClose: true,
                 message: '新增成功！',
                 type: 'success'
               });
             } else {
               this.$message({
                 showClose: true,
                 message: res.data.msg,
                 type: 'info'
               });
             }
             this.getDwxx();
             this.currentPage = 1;
           }).catch(() => {
             this.$message({
               showClose: true,
               message: '新增失败！',
               type: 'info'
             });
           })
         }).catch(() => {

         });

       } else {
         this.$confirm('是否保存修改?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           //调用接口后回调消息

           axios.post(ADDRESS_DWXX, {
             'index': row.index,
             'dwdm': row.dwdm,
             'dwmc': row.dwmc,
             'xzqjb': row.xzqjb,
             'xw': '0'
           }).then((res) => {
             console.log(res);
             
             if (res.data.code === '0000') {
               this.$message({
                 showClose: true,
                 message: '修改成功！',
                 type: 'success'
               });
             } else {
               this.$message({
                 showClose: true,
                 message: res.data.msg,
                 type: 'info'
               });
               this.getDwxx();
             }
           }).catch(() => {

           })
         }).catch(() => {

         });
       }
     },


     handleDelete(index, row, rows) {
      console.log(rows);
      this.$confirm('是否删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用接口
        let deleteIndex = [];
        deleteIndex.push(row.index);
        axios.post(ADDRESS_DWXX, {
          'index': deleteIndex,
          'xw': '2'
        }).then((res) => {
          if (res.data.code === '0000') {
            rows.splice(index, 1);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'info'
            });
          }
          //当前页不存在数据时，定位到前一页
          if (this.tablePage.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.getDwxx();

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    selsChange (sels){
      this.sels = sels;
      console.log(sels);
      
    },

    batchDelete() {
      console.log(this.sels);

      this.$confirm('是否删除这些数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deleteIndex = [];
        this.sels.map((sel) => {
          deleteIndex.push(sel.index);
        });
        console.log(deleteIndex);
        axios.post(ADDRESS_DWXX, {
          'index': deleteIndex,
          'xw': '2'
        }).then((res) => {
          if (res.data.code === '0000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'info'
            });
          }

          this.getDwxx();

          this.currentPage = 1;

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
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
  padding .2rem
  .toolbar-top
    .el-form
      height .8rem
    span
      font-size .44rem
      margin-left .2rem
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
// .editing
//   span
//     display none
//   .el-input
//     display inline
</style>

