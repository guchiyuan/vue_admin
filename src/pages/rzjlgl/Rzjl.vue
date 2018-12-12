<template>
<div class="rzjl">
  <!--工具条-->
  <div class="toolbar-top">
    <el-form :inline="true" :model="filters">
      <el-select @change="onSelectedSearchField" v-model="searchField" placeholder="请选择">
        <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-form-item>
        <el-input v-show="showInput" v-model="filters.name" placeholder="请填入内容" clearable></el-input>
        <el-select v-show="showSelect" v-model="timePeriod" placeholder="请选择">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getFilterData" icon="el-icon-search" circle></el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-table v-loading="listLoading" :data="tablePage" border :max-height="height" @row-dblclick="handleDbclickRow" @row-click="handleClickRow"
    @selection-change="selsChange">
    <el-table-column type="selection" width="50">
    </el-table-column>
    <el-table-column prop="sqr" label="申请人" width=100>
      <template slot-scope="scope">
        <span>{{scope.row.sqr}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="sqrdw" label="申请人单位">
      <template slot-scope="scope">
        <span>{{scope.row.sqrdw}}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column prop="lxdh" label="联系电话" width=110>
      <template slot-scope="scope">
        <span>{{scope.row.lxdh}}</span>
      </template>
    </el-table-column> -->
     <el-table-column prop="cpmc" label="产品名称">
      <template slot-scope="scope">
        <span>{{scope.row.cpmc}}</span>
      </template>
    </el-table-column>

    <el-table-column prop="xzqdm" label="行政区代码">
      <template slot-scope="scope">
        <span>{{scope.row.xzqdm}}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column prop="sqsl" label="授权数量" width=80>
      <template slot-scope="scope">
        <span>{{scope.row.sqsl}}</span>
      </template>
    </el-table-column> -->
     <!-- <el-table-column prop="yxdz" label="邮箱地址">
      <template slot-scope="scope">
        <span>{{scope.row.yxdz}}</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="sqsj" label="申请时间" width=110 sortable>
      <template slot-scope="scope">
        <span>{{scope.row.sqsj}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="bljssj" label="办理结束时间" width=110>
      <template slot-scope="scope">
        <span>{{scope.row.bljssj}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="bljg" label="办理结果" width=100>
      <template slot-scope="scope">
        <span>{{scope.row.bljg}}</span>
      </template>
    </el-table-column>
     <!-- <el-table-column prop="bz" label="备注">
      <template slot-scope="scope">
        <span>{{scope.row.bz}}</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="zzblr" label="最终办理人" width=100>
      <template slot-scope="scope">
        <span>{{scope.row.zzblr}}</span>
      </template>
    </el-table-column>

     <el-table-column label="更多" width=160>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleDetails(scope.$index, scope.row)">详细信息</el-button>
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

     <!--详细信息-->
    <el-dialog title="详细信息" :visible.sync="detailsFormVisible" :close-on-click-modal="false"
      top="1vh">
      <el-form :model="detailsForm" label-width="100px" ref="detailsForm">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="申请人：" prop="sqr">
              <span>{{detailsForm.sqr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人单位：" prop="sqrdw">
              <span>{{detailsForm.sqrdw}}</span>              
            </el-form-item>
          </el-col>
        </el-row>

         <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="产品名称：" prop="cpmc">
              <span>{{detailsForm.cpmc}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区代码：" prop="xzqdm">
              <span>{{detailsForm.xzqdm}}</span>
            </el-form-item>
          </el-col>
        </el-row>

         <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="初审人：" prop="csr">
              <span>{{detailsForm.csr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="初审时间：" prop="cssj">
              <span>{{detailsForm.cssj}}</span>     
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="复审人：" prop="fsr">
              <span>{{detailsForm.fsr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复审时间：" prop="fssj">
              <span>{{detailsForm.fssj}}</span>           
            </el-form-item>
          </el-col>
        </el-row>

         <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="申请时间：" prop="sqsj">
              <span>{{detailsForm.sqsj}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理结束：" prop="bljssj" width=200>
              <span>{{detailsForm.bljssj}}</span>             
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="最终办理人：" prop="zzblr">
              <span>{{detailsForm.zzblr}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="办理结果：" prop="bljg">
              <span>{{detailsForm.bljg}}</span>             
            </el-form-item>
          </el-col>
        </el-row>

        
      </el-form>
    </el-dialog>
</div>
</template>


<script>
import axios from 'axios'
const ADDRESS_RZJL = '/test/get_log';
const ADDRESS_DELETERZJL = '/test/delete_log';
export default {
  name: 'Rzjl',
  data() {
    return {
      filters: {
        name: ''
      },
      searchField:'',
      searchOptions: [{
        value: '申请人',
        label: '申请人'
      }, {
        value: '申请人单位',
        label: '申请人单位'
      }, {
        value: '产品名称',
        label: '产品名称'
      }, {
        value: '申请时间',
        label: '申请时间'
      }],

      timeOptions: [{
        value: '一个月内',
        label: '一个月内'
      }, {
        value: '三个月内',
        label: '三个月内'
      }, {
        value: '一年内',
        label: '一年内'
      }, {
        value: '全部',
        label: '全部'
      }],

      timePeriod:'',

      showSelect: false,
      showInput: true,

      pageSize: Math.floor((window.innerHeight - 230) / 71),
      currentPage: 1,
      tableData: [],
      total: 0,
      listLoading: false,
      sels: [], //列表选中列

      detailsFormVisible: false,
      detailsForm:{
        
      }
      
    }
  },
  computed: {
    tablePage() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    height() {
      return (this.pageSize + 1) * 71
    }
  },
  methods: {
    getFilterDataSucc(res) {
        this.listLoading = false;
        res = res.data;
        if (res.code === '0000' && res.data) {
          this.tableData = res.data;
          this.total = res.data.length;
        }
        this.filterData = [];

        console.log(this.tableData);

      if (this.searchField === '申请时间') {
        switch (this.timePeriod) {
          case '一个月内':
            this.tableData.map((item) => {
              var currentDate = new Date().getTime();
              var sqsjDate = new Date(Date.parse(item.sqsj.replace(/-/g, "/"))).getTime();
              var days = parseInt((currentDate - sqsjDate) / (1000 * 60 * 60 * 24));
              console.log(days);

              if (days < 31) {
                this.filterData.push(item);
              }
            });

            break;

          case '三个月内':
            this.tableData.map((item) => {
              var currentDate = new Date().getTime();
              var sqsjDate = new Date(Date.parse(item.sqsj.replace(/-/g, "/"))).getTime();
              var days = parseInt((currentDate - sqsjDate) / (1000 * 60 * 60 * 24));
              console.log(days);

              if (days < 93) {
                this.filterData.push(item);
              }
            });
            break;

          case '一年内':
            this.tableData.map((item) => {
              var currentDate = new Date().getTime();
              var sqsjDate = new Date(Date.parse(item.sqsj.replace(/-/g, "/"))).getTime();
              var days = parseInt((currentDate - sqsjDate) / (1000 * 60 * 60 * 24));
              console.log(days);

              if (days < 366) {
                this.filterData.push(item);
              }
            });

            break;
          case '全部':
            this.filterData = this.tableData;
          break;
        }
        this.tableData = this.filterData;
        this.total = this.tableData.length;
      }

        


        if (this.filters.name !== '') {
          switch (this.searchField) {
            case '申请人':
              this.tableData.map((item) => {
                if (item.sqr.indexOf(this.filters.name) !== -1) {
                  this.filterData.push(item);
                }
              });
              break;
            case '申请人单位':
              this.tableData.map((item) => {
                if (item.sqrdw.indexOf(this.filters.name) !== -1) {
                  this.filterData.push(item);
                }
              });
              break;
            case '产品名称':
              this.tableData.map((item) => {
                if (item.cpmc.indexOf(this.filters.name) !== -1) {
                  this.filterData.push(item);
                }
              });
              break;
            // case '申请时间':
            //   this.showSelect=true;
            //   this.showInput=false;
              // this.tableData.map((item) => {
              //   if (item.sqsj.indexOf(this.filters.name) !== -1) {
              //     this.filterData.push(item);
              //   }
              // });
              // break;

            default:
              break;
          }




          // this.filterData.map((item) => {
          //   this.tableData = [];
          //   this.tableData.push(item);
          // });

          this.tableData = this.filterData;

          console.log(this.filterData);
          // this.tableData = this.filterData;
          console.log(this.filterData.length);
          // this.tableData = this.filterData.slice(0,this.filterData.length);
          this.total = this.tableData.length;
          console.log(this.tableData);

        }

      },


    getFilterData() {
      this.listLoading = true;
       //解决除首页外搜索问题 
      this.currentPage = 1;
      // axios.get('/test/dwxx.json').then(this.getFilterDataSucc);
      axios.get(ADDRESS_RZJL).then(this.getFilterDataSucc);

    },

    handleDbclickRow (){},
    handleClickRow (){},
    selsChange (sels){
      this.sels = sels;
      console.log(this.sels);
           
    },
    batchDelete (){
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
        axios.post(ADDRESS_DELETERZJL, {
          'index': deleteIndex,
        }).then((res) => {
          console.log(res);
          if (res.data.code === '0000') {
            console.log('00001111');
            
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            });
          }
          //当前页不存在数据时，定位到前一页
          if (this.tablePage.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.getRzjl();

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
    handleCurrentChange (curr){
      for (let i = 0; i < this.tablePage.length; i++) {
        let item = this.tablePage[i];
        if (item.editing) {
          item.editing = false;
        }
      }

      this.currentPage = curr;
    },
    onSelectedSearchField() {
      if (this.searchField === "申请时间") {
        this.showSelect = true;
        this.showInput = false;
      } else {
        this.showSelect = false;
        this.showInput = true;
      }
      this.filters.name = '';
    },
    getRzjl() {
      
      this.listLoading = true;
      axios.get(ADDRESS_RZJL)
        .then(this.getRzjlSucc)
    },
    getRzjlSucc(res) {
      this.listLoading = false;
      console.log(res);
      res = res.data;
      if (res.code === '0000' && res.data) {
          this.tableData = res.data;
          this.total = res.data.length;
      }
    },

    handleDetails(index, row){
      this.detailsFormVisible = true;
      this.detailsForm = Object.assign({}, row);
      console.log(row);
      console.log(this.detailsForm);
          
    }
  },
  mounted() {
    this.getRzjl();    
  }
}

</script>

<style lang="stylus" scoped>
.rzjl
  padding .2rem
  .toolbar-top
    .el-form
      height .8rem
    span
      font-size .44rem
      margin-left .2rem
      display inline-block
  .el-table
    margin-top .2rem
    width 100%
    .el-button
      margin-left .2rem
  .toolbar-bottom
    background #eee
    padding .1rem
    .el-pagination
      float right 
  .el-form-item >>> label
    text-align left
    
</style>

