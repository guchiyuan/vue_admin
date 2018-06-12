<template>
  <div class="jscy">
    <!--工具条-->
    <div class="toolbar-top">
      <!-- <span>单位信息表</span> -->
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="角色成员" clearable></el-input>
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
      <el-table-column prop="jscy" label="角色成员" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.jscy}}</span>
        </template>
      </el-table-column>
      <!-- :formatter="formatterJsdm" -->
      <el-table-column prop="jsdm" label="角色代码" sortable
      
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

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, tablePage)">删除</el-button>
          <!-- <el-button v-show="scope.row.editing" size="mini" type="primary" @click="handleSave(scope.$index, scope.row)">保存</el-button>
          <el-button v-show="scope.row.editing" size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button> -->
        </template>
      </el-table-column>
    </el-table>


    <!--工具条-->
    <el-col :span="24" class="toolbar-bottom">
      <el-button plain @click="batchDelete" type="danger" :disabled="this.sels.length===0" icon="el-icon-delete">批量删除</el-button>
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="currentPage"
        :total="total">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑角色成员" :visible.sync="editFormVisible" :close-on-click-modal="false" top="1vh">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="角色成员" prop="jscy">
              <el-input v-model="editForm.jscy" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="editForm.pwd" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item v-show="uneditingJsdm" label="角色代码" prop="jsdm">
          <el-input @focus="handleFocusJsdm" v-model="editForm.jsdm" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item v-show="editingJsdm" label="角色代码" prop="jsdm">
          <el-select style="width:100%" @focus="handleFocusJsdmSelect" v-model="addForm.jsdm" multiple placeholder="请选择">
            <el-option
              v-for="item in jsdms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-input v-model="addForm.jsdm" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
        </el-form-item>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="所属部门" prop="ssbm">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.ssbm"
                :fetch-suggestions="querySsbm"
                placeholder="请输入内容"
                              
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.ssbm" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目组" prop="ssxmz">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.ssxmz"
                :fetch-suggestions="querySsxmz"
                placeholder="请输入内容"
               
                
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.ssxmz" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="editForm.lxdh" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信号" prop="wechat">
              <el-input v-model="editForm.wechat" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="备注" prop="bz">
          <el-input type="textarea" v-model="editForm.bz" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>



     <!--新增界面-->
    <el-dialog title="新增角色成员" :visible.sync="addFormVisible" :close-on-click-modal="false"
                top="1vh">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">

       <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="角色成员" prop="jscy">
              <el-input v-model="addForm.jscy" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="addForm.pwd" auto-complete="off" clearable placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-col>
        </el-row>

         <el-form-item label="角色代码" prop="jsdm">
              <el-select style="width:100%" @focus="handleFocusJsdmSelect" v-model="addForm.jsdm" multiple placeholder="请选择">
                <el-option
                  v-for="item in jsdms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input v-model="addForm.jsdm" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
            </el-form-item>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="所属部门" prop="ssbm">
              <el-autocomplete
                class="inline-input"
                v-model="addForm.ssbm"
                :fetch-suggestions="querySsbm"
                placeholder="请输入内容"
              
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.ssbm" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目组" prop="ssxmz">
              <el-autocomplete
                class="inline-input"
                v-model="addForm.ssxmz"
                :fetch-suggestions="querySsxmz"
                placeholder="请输入内容"
                         
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.ssxmz" auto-complete="off" clearable  placeholder="请输入内容"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="lxdh">
              <el-input v-model="addForm.lxdh" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="微信号" prop="wechat">
              <el-input v-model="addForm.wechat" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-form-item label="备注" prop="bz">
          <el-input type="textarea" v-model="addForm.bz" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
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
const ADDRESS_JSCY = '/api/role/jscy'
const ADDRESS_SUGGESTIONS = '/api/suggestionsjscy'

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
        jsdm:[],
        ssbm:'',
        ssxmz:'',
        lxdh:'',
        wechat:'',
        bz:'',
        pwd:'',
      },

      editingJsdm:false,
      uneditingJsdm:true,

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
          }, {
            validator: function (rule, value, callback) {
              if (/^1[0123456789]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: ['blur','change']
          }]
          },


      //新增界面数据
      addForm: {
        jscy:'',
        jsdm:[],
        ssbm:'',
        ssxmz:'',
        lxdh:'',
        wechat:'',
        bz:'',
        pwd:'',
      },

      optionsJsdm:[{
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }],

       //附带输入建议的input
      ssbms: [],
      ssxmzs: [],
      jsdms:  []
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
      // axios.get('/api/jscy.json').then(this.getFilterDataSucc);
      axios.get(ADDRESS_JSCY).then(this.getFilterDataSucc);
      
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


    getJscy(type) {
      this.listLoading = true;
      // axios.get('/api/jscy.json')
      //   .then(this.getJscySucc)
      axios.get(ADDRESS_JSCY)
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
      //   item.editing = false
      // });
      // row.editing = true;
      // console.log(row.editing);
      
    },
    handleClickRow () {
      
    },
    handleBlur () {
        // this.tableData.map(function(item){  
        // item.editing = false
      // });
    },
    handleEditBtn (){
      this.editing = !this.editing
    },
    handleAdd (){
      this.addForm.jsdm = '';
      this.addFormVisible = true;      
    },
    handleEdit(index, row) {
      row.editing = !row.editing;
      this.tablePage.map((item) => {
        item.editing = false
      });
      row.editing = true;
      console.log(index);
      console.log(row);


      this.addForm.jsdm = ''; 
      this.editFormVisible = true;
      this.editingJsdm = false;      
      this.uneditingJsdm = true;      
			this.editForm = Object.assign({}, row);

    },

    handleCancel(index,row){
      this.getJscy ();
      row.editing = !row.editing;
      this.$message({
          type: 'info',
          message: '已取消编辑'
        });         
       
    },

    //  handleSave(index,row){
    //   row.editing = !row.editing;
    //   //调用接口后回调消息
    //   this.$message({
    //       showClose: true,
    //       message: '保存成功！',
    //       type: 'success'
    //     });
    // },

    handleDelete(index, row, rows) {
      this.$confirm('是否删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用接口
        let deleteIndex = [];
        deleteIndex.push(row.index);
        axios.post(ADDRESS_JSCY, {
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
              type: 'info',
              message: res.data.msg
            });
          }

          //当前页不存在数据时，定位到前一页
          if (this.tablePage.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.getJscy();
          
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
        axios.post(ADDRESS_JSCY, {
          'index': deleteIndex,
          'xw': '2'
        }).then((res) => {
          console.log(res);
          
          if (res.data.code === '0000') {
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
          this.getJscy();

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



  //编辑
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交编辑吗？', '提示', {}).then(() => {
            this.editForm.xw = '0';
            console.log(this.addForm);
  
            console.log(this.editForm);

            if (this.addForm.jsdm.length !== 0) {
              this.editForm.jsdm = this.addForm.jsdm.join(',');
            }

            axios.post(ADDRESS_JSCY, {
                'xw': this.editForm.xw,
                'index': this.editForm.index,
                'jscy': this.editForm.jscy,
                'jsdm': this.editForm.jsdm,
                'ssbm': this.editForm.ssbm,
                'ssxmz': this.editForm.ssxmz,
                'lxdh': this.editForm.lxdh,
                'wechat': this.editForm.wechat,
                'bz': this.editForm.bz,
                'pwd': this.editForm.pwd
              })
              .then((res) => {
                console.log(res);
                if (res.data.code === '0000') {
                  this.$message({
                    showClose: true,
                    message: '编辑角色成员成功！',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'info'
                  });
                }

                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getJscy();

              }).catch(() => {
                this.$message({
                  showClose: true,
                  message: '编辑角色成员失败！',
                  type: 'info'
                });
              });
          });
        }
      });
    },


    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交新增吗？', '提示', {}).then(() => {
            this.addForm.xw = '1';
            console.log(this.addForm);
            axios.post(ADDRESS_JSCY, {
                'xw': this.addForm.xw,
                'jscy': this.addForm.jscy,
                'jsdm': this.addForm.jsdm.join(','),
                'ssbm': this.addForm.ssbm,
                'ssxmz': this.addForm.ssxmz,
                'lxdh': this.addForm.lxdh,
                'wechat': this.addForm.wechat,
                'bz': this.addForm.bz,
                'pwd': this.addForm.pwd
              })
              .then((res) => {
                console.log(res);
                if (res.data.code === '0000') {
                  this.$message({
                    showClose: true,
                    message: '新增角色成员成功！',
                    type: 'success'
                  });
                } else {
                   this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'info'
                  });
                }

                this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getJscy();
                
              }).catch(() => {
                this.$message({
                  showClose: true,
                  message: '新增角色成员失败！',
                  type: 'info'
                });
              });
          });
        }
      });

    },


    
    filterHandler(value, row, column) {
      console.log(value);
      console.log(row);
      console.log(column);
      
      const property = column['property'];
      
      // return row[property] === value;
      if(row[property].indexOf(value) !== -1){
        return true
      } else {
        return false
      }
    },

    // formatterJsdm(row, column) {
    //   switch (row.jsdm) {
    //     case "1":
    //       return "管理员"
    //       break;
    //     case "2":
    //       return "实施人员"
    //       break;
    //     case "3":
    //       return "一审人"
    //       break;
    //     case "4":
    //       return "二审人"
    //       break;
    //     case "5":
    //       return "三审人"
    //       break;
    //     case "6":
    //       return "录入人"
    //       break;
    //     case "7":
    //       return "项目经理"
    //       break;
    //     case "9":
    //       return "普通用户"
    //       break;
    //     default:
    //       break;
    //   }

    // },



    handleFocusJsdm() {
      this.editingJsdm = true;
      this.uneditingJsdm = false;
    },

    handleFocusJsdmSelect(){
      this.addForm.jsdm = [];
    },

        //附带输入建议的input
    querySsbm(queryString, cb) {
      var ssbms = this.ssbms;
      var results = queryString ? ssbms.filter(this.createFilter(queryString)) : ssbms;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySsxmz(queryString, cb) {
      var ssxmzs = this.ssxmzs;
      var results = queryString ? ssxmzs.filter(this.createFilter(queryString)) : ssxmzs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return (suggestion) => {
        return (suggestion.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },


    loadSuggestions() {
      // axios.get('/api/suggestions.json').then(this.getSuggestionsSucc)
      axios.get(ADDRESS_SUGGESTIONS).then(this.getSuggestionsSucc)
    },

    getSuggestionsSucc(res) {
      console.log(res);
      res = res.data;
      if (res.code === '0000' && res.data.ssbm) {
        this.ssbms = res.data.ssbm;
      }

      if (res.code === '0000' && res.data.ssxmz) {
        this.ssxmzs = res.data.ssxmz;
      }

      if (res.code === '0000' && res.data.jsdm) {
        this.jsdms = res.data.jsdm;
      }
    },


    //----------------------------------------------------------------------------------------//



    rowStyle(row) {
      return 'color:green'
    }
  },
  mounted() {
      this.getJscy();
      this.loadSuggestions();    
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
// .editing
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

