<template>
  <div class="jscy">
    <!--工具条-->
    <div class="toolbar-top">
      <!-- <span>单位信息表</span> -->
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="角色成员"></el-input>
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
    <!-- :highlight-current-row="editable" -->
    <el-table v-loading="listLoading" :data="tablePage" border :max-height="height" @row-dblclick="handleDbclickRow" @row-click="handleClickRow"
      :header-row-style="rowStyle" @selection-change="selsChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column prop="jscy" label="角色成员" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.jscy}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="jsdm" label="角色代码" sortable
        :formatter="formatterJsdm"
       :filters="filterJsdm"
       :filter-method="filterHandler">
        <!-- <template slot-scope="scope">
          <span>{{scope.row.jsdm}}</span>
        </template> -->
      </el-table-column>
      <el-table-column prop="ssbm" label="所属部门" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.ssbm}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="ssxmz" label="所属项目组" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.ssxmz}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="lxdh" label="联系电话" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.lxdh}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="wechat" label="微信号" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.wechat}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="bz" label="备注" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.bz}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="pwd" label="密码" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.pwd}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button v-show="scope.row.editable" size="mini" type="primary" @click="handleSave(scope.$index, scope.row)">保存</el-button>
          <el-button v-show="scope.row.editable" size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button> -->
        </template>
      </el-table-column>
    </el-table>


    <!--工具条-->
    <el-col :span="24" class="toolbar-bottom">
      <!-- @click="batchRemove" :disabled="this.sels.length===0" -->
      <el-button plain type="danger" :disabled="this.sels.length===0" icon="el-icon-delete">批量删除</el-button>
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage"
        :total="total">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑角色成员" :visible.sync="editFormVisible" :close-on-click-modal="false"
                top="1vh">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

      <!-- <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="角色成员" prop="jscy">
            <el-input v-model="editForm.jscy" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色成员" prop="jscy">
            <el-input v-model="editForm.jscy" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

        <el-form-item label="角色成员" prop="jscy">
          <el-input v-model="editForm.jscy" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色代码" prop="jsdm">
          <el-input v-model="editForm.jsdm" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" prop="ssbm">
          <el-input v-model="editForm.ssbm" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="项目组" prop="ssxmz">
          <el-input v-model="editForm.ssxmz" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="lxdh">
          <el-input v-model="editForm.lxdh" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="editForm.wechat" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="bz">
          <el-input v-model="editForm.bz" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="editForm.pwd" auto-complete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>


     <!--新增界面-->
    <el-dialog title="新增角色成员" :visible.sync="addFormVisible" :close-on-click-modal="false"
                top="1vh">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

      <!-- <el-row type="flex" class="row-bg">
        <el-col :span="12">
          <el-form-item label="角色成员" prop="jscy">
            <el-input v-model="editForm.jscy" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色成员" prop="jscy">
            <el-input v-model="editForm.jscy" auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->

        <el-form-item label="角色成员" prop="jscy">
          <el-input v-model="addForm.jscy" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色代码" prop="jsdm">
          <el-input v-model="addForm.jsdm" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属部门" prop="ssbm">
          <el-input v-model="addForm.ssbm" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="项目组" prop="ssxmz">
          <el-input v-model="addForm.ssxmz" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话" prop="lxdh">
          <el-input v-model="addForm.lxdh" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="addForm.wechat" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="bz">
          <el-input v-model="addForm.bz" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addForm.pwd" auto-complete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>



  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: 'Jscy',
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
      filterJsdm:[{value:'1',text:'管理员'},{value:'2',text:'审查人员'},{value:'3',text:'登记人员'},{value:'4',text:'制作人员'}],


      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        jscy: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        lxdh: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }]
      },
      //编辑界面数据
      editForm: {
        jscy:'',
        jsdm:'',
        ssbm:'',
        ssxmz:'',
        lxdh:'',
        wechat:'',
        bz:'',
        pwd:'',
      },

      //新增界面
      addFormVisible: false,//编辑界面是否显示
      addLoading: false,
      addFormRules: {
        jscy: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        lxdh: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }]
      },
      //新增界面数据
      addForm: {
        jscy:'',
        jsdm:'',
        ssbm:'',
        ssxmz:'',
        lxdh:'',
        wechat:'',
        bz:'',
        pwd:'',
      }
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

      console.log(this.tableData);
      

      if (this.filters.name !== '') {    
          this.tableData.map((item) => {
            if (item.jscy.indexOf(this.filters.name) !== -1) {
              this.filterData.push(item);         
          }
        });

        console.log(this.filterData);
        // this.tableData = this.filterData;
        console.log(this.filterData.length);
        this.tableData = this.filterData.slice(0,this.filterData.length);
        this.total = this.tableData.length;
        console.log(this.tableData);
        
      } 

    },


    getFilterData (){
      this.listLoading = true;      
      this.currentPage = 1;
      axios.get('/api/jscy.json').then(this.getFilterDataSucc);
      
    },

    handleCurrentChange(curr) {
      console.log(this.tablePage);
      for (let i = 0; i < this.tablePage.length; i++) {
        let item = this.tablePage[i];
        if (item.editable) {
          item.editable = false;
        } 
      }

      this.currentPage = curr;
      console.log(this.tableData);
      
    },


    getJscy(type) {
      this.listLoading = true;
      axios.get('/api/jscy.json')
        .then(this.getJscySucc)
    },

    getJscySucc (res) {
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
    handleAdd (){
      this.editFormVisible = true;      
    },
    handleEdit(index, row) {
      row.editable = !row.editable;
      this.tablePage.map((item) => {
        item.editable = false
      });
      row.editable = true;
      console.log(index);
      console.log(row);

      this.editFormVisible = true;
			this.editForm = Object.assign({}, row);

    },

    handleCancel(index,row){
      this.getJscy ();
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

    selsChange (sels){
      this.sels = sels;
      console.log(sels);
      
    },

  //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            // let para = Object.assign({}, this.editForm);
            // editUser(para).then((res) => {
              this.editLoading = false;
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getJscy();
            // });
          });
        }
      });
    },
    
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },

    formatterJsdm(row,column) {
      switch (row.jsdm) {
        case "1":
          return "管理员"
          break;
        case "2":
          return "审核人员"
          break;
        case "3":
          return "登记人员"
          break;
        case "4":
          return "制作人员"
          break;
        default:
          break;
      }

    },

    rowStyle(row) {
      return 'color:green'
    }
  },
  mounted() {
      this.getJscy();
  },
  // watch: {
  //   "$route.path": function (currentPath) {
  //     console.log(currentPath);

  //     switch (currentPath) {
  //       case "/admin_sq":
  //         this.getJscy(1);

  //         break;
  //       case "/check_sq":
  //         this.getJscy(2);

  //         break;
  //       case "/register_sq":
  //         this.getJscy(3);

  //         break;
  //       case "/create_sq":
  //         this.getJscy(4);

  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // }

}
</script>

<style lang="stylus" scoped>
.jscy
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
    .el-button
      margin-left .2rem
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
  // .el-dialog
  // display flex
  // flex-direction column
  // >.el-dialog__body
  //   overflow auto

</style>

