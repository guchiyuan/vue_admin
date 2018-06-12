<template>
  <div class="dwxx">
    <!--工具条-->
    <div class="toolbar-top">
      <!-- <span>单位信息表</span> -->
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="单位名称" clearable></el-input>
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
          <span>{{scope.row.dwdm}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dwmc" label="单位名称" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.dwmc}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="xmddm" label="项目点代码" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.xmddm}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="xmdmc" label="项目点名称" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.xmdmc}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cpdm" label="产品代码" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.cpdm}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="sfjmg" label="加密狗" sortable
        :formatter="formatterSfjmg">
        <!-- <template slot-scope="scope">
          <span v-if="!scope.row.editing">{{scope.row.sfjmg}}</span>
        </template> -->
      </el-table-column>

      <el-table-column prop="sfsq" label="是否授权" sortable
      :formatter="formatterSfsq">
        <!-- <template slot-scope="scope">        
          <span>{{scope.row.sfsq}}</span>
        </template> -->
      </el-table-column>

      <el-table-column prop="jzsj" label="截止时间" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.jzsj}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="csr" label="初审人" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.csr" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.csr}}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column prop="fsr" label="复审人" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.fsr" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.fsr}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="sqshr" label="授权审核人" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.sqshr" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.sqshr}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="lrr" label="录入人" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.lrr" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.lrr}}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column prop="bz" label="备注" sortable>
        <template slot-scope="scope">
          <el-input v-if="scope.row.editing" size="small" v-model="scope.row.bz" placeholder="请输入内容" @change="handleChange(scope.$index, scope.row)"
            @blur="handleBlur">
          </el-input>
          <span v-if="!scope.row.editing">{{scope.row.bz}}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row, tablePage)">删除</el-button>
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

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false"
      top="1vh">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="单位代码" prop="dwdm">
               <el-autocomplete
                class="inline-input"
                v-model="editForm.dwdm"
                :fetch-suggestions="queryXzqdm"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.dwdm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="dwmc">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.dwmc"
                :fetch-suggestions="queryXzqmc"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.dwmc" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="项目点代码" prop="xmddm">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.xmddm"
                :fetch-suggestions="queryXzqdm"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.xmddm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目点名称" prop="xmdmc">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.xmdmc"
                :fetch-suggestions="queryXzqmc"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.xmdmc" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="初审人" prop="csr">
              <el-input  v-model="editForm.csr" auto-complete="off" clearable  placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复审人" prop="fsr">
              <el-input v-model="editForm.fsr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="授权审核人" prop="sqshr">
              <el-input v-model="editForm.sqshr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入人" prop="lrr">
              <el-input v-model="editForm.lrr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="产品代码" prop="cpdm">
              <el-autocomplete
                class="inline-input"
                v-model="editForm.cpdm"
                :fetch-suggestions="queryCpdm"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
                >
              </el-autocomplete>
              <!-- <el-input v-model="editForm.cpdm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加密狗" prop="sfjmg">
              <el-input v-model="editForm.sfjmg" auto-complete="off" clearable  placeholder="0：不使用，1：使用" ></el-input>
            </el-form-item>
          </el-col>
          </el-row>


        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="是否授权" prop="sfsq">
              <el-input v-model="editForm.sfsq" auto-complete="off" clearable  placeholder="0：否，1：是" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止时间" prop="jzsj">
            <el-date-picker
              v-model="editForm.jzsj"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <!-- <el-input v-model="editForm.jzsj" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
          </el-form-item>
          </el-col>
        </el-row>

         

          <el-form-item label="备注" prop="bz">
            <el-input type="textarea" v-model="editForm.bz" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
          </el-form-item>




        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>



    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false"
      top="1vh">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="单位代码" prop="dwdm">
               <el-autocomplete
                class="inline-input"
                v-model="addForm.dwdm"
                :fetch-suggestions="queryXzqdm"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.dwdm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位名称" prop="dwmc">
              <el-autocomplete
              class="inline-input"
              v-model="addForm.dwmc"
              :fetch-suggestions="queryXzqmc"
              placeholder="请输入内容"
              @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.dwmc" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="项目点代码" prop="xmddm">
              <el-autocomplete
              class="inline-input"
              v-model="addForm.xmddm"
              :fetch-suggestions="queryXzqdm"
              placeholder="请输入内容"
              @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.xmddm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目点名称" prop="xmdmc">
              <el-autocomplete
              class="inline-input"
              v-model="addForm.xmdmc"
              :fetch-suggestions="queryXzqmc"
              placeholder="请输入内容"
              @select="handleSelectXzqdm"
              >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.xmdmc" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="初审人" prop="csr">
              <el-input v-model="addForm.csr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="复审人" prop="fsr">
              <el-input v-model="addForm.fsr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="授权审核人" prop="sqshr">
              <el-input v-model="addForm.sqshr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="录入人" prop="lrr">
              <el-input v-model="addForm.lrr" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg">
          <el-col :span="12">
            <el-form-item label="产品代码" prop="cpdm">
              <el-autocomplete
                class="inline-input"
                v-model="addForm.cpdm"
                :fetch-suggestions="queryCpdm"
                placeholder="请输入内容"
                @select="handleSelectXzqdm"
                >
              </el-autocomplete>
              <!-- <el-input v-model="addForm.cpdm" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="加密狗" prop="sfjmg">
              <el-input v-model="addForm.sfjmg" auto-complete="off" clearable  placeholder="0：不使用，1：使用" ></el-input>
            </el-form-item>
          </el-col>

          </el-row>


        <el-row type="flex" class="row-bg">
          <el-col :span="12">
           <el-form-item label="是否授权" prop="sfsq">
              <el-input v-model="addForm.sfsq" auto-complete="off" clearable  placeholder="0：否，1：是" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截止时间" prop="jzsj">
              <el-date-picker
                v-model="addForm.jzsj"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <!-- <el-input v-model="addForm.jzsj" auto-complete="off" clearable  placeholder="请输入内容" ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

          

          <el-form-item label="备注" prop="bz">
            <el-input type="textarea" v-model="addForm.bz" auto-complete="off" clearable  placeholder="请输入内容" ></el-input>
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
const ADDRESS_CPDJ = '/api/product/cpdj'
const ADDRESS_SUGGESTIONS = '/api/suggestionscpdj'

export default {
  name: 'Dwxx',
  data() {
    return {
      pageSize: Math.floor((window.innerHeight - 230) / 53),
      // pageSize: 20,
      currentPage: 1,
      tableData: [],
      total: 0,
      listLoading: false,
      sels: [], //列表选中列
      filters: {
        name: ''
      },
      filterData: [],
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        dwdm: [{
          required: true,
          message: '请输入单位代码',
          trigger: 'change'
        }],
        dwmc: [{
          required: true,
          message: '请输入单位名称',
          trigger: 'change'
        }]
      },
      //编辑界面数据
      editForm: {
        dwdm: '',
        dwmc: '',
        xmddm: '',
        xmdmc: '',
        cpdm: '',
        sfjmg: '',
        sfsq: '',
        jzsj: '',
        csr: '',
        fsr: '',
        sqshr: '',
        lrr: '',
        bz: ''
      },

      addFormVisible: false, //编辑界面是否显示
      addLoading: false,
      addFormRules: {
        dwdm: [{
          required: true,
          message: '请输入单位代码',
          trigger: 'change'
        }],
        dwmc: [{
          required: true,
          message: '请输入单位名称',
          trigger: 'change'
        }]
      },
      //编辑界面数据
      addForm: {
        dwdm: '',
        dwmc: '',
        xmddm: '',
        xmdmc: '',
        cpdm: '',
        sfjmg: '',
        sfsq: '',
        jzsj: '',
        csr: '',
        fsr: '',
        sqshr: '',
        lrr: '',
        bz: ''
      },

      //附带输入建议的input
      xzqdms: [],
      xzqmcs: [],
      cpdms:  []

    }
  },
  computed: {
    tablePage() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    height() {
      return (this.pageSize + 1) * 59
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


      if (this.filters.name !== '') {
        this.tableData.map((item) => {
          if (item.dwmc.indexOf(this.filters.name) !== -1) {
            this.filterData.push(item);
          }
        });

        this.filterData.map((item) => {
          this.tableData = [];
          this.tableData.push(item);
        });

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

      // axios.get('/api/dwxx.json').then(this.getFilterDataSucc);
      axios.get(ADDRESS_CPDJ).then(this.getFilterDataSucc);

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

    getDjxx() {
      this.listLoading = true;
      // axios.get('/api/djxx.json')
      //   .then(this.getDjxxSucc)
      axios.get(ADDRESS_CPDJ)
        .then(this.getDjxxSucc)
    },
    getDjxxSucc(res) {
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
    handleDbclickRow(row) {
      // this.tableData.map(function(item){  
      //   item.editing = false
      // });
      // row.editing = true;
      // console.log(row.editing);

    },
    handleClickRow() {

    },
    handleBlur() {
      // this.tableData.map(function(item){  
      // item.editing = false
      // });
    },
    handleEditBtn() {
      this.editing = !this.editing
    },
    handleAdd() {
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

      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);

    },

    handleCancel(index, row) {
      this.getDjxx();
      row.editing = !row.editing;
      this.$message({
        type: 'info',
        message: '已取消编辑'
      });

    },

    // handleSave(index, row) {
    //   row.editing = !row.editing;
    //   //调用接口后回调消息
    //   this.$message({
    //     showClose: true,
    //     message: '保存成功！',
    //     type: 'success'
    //   });
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
        axios.post(ADDRESS_CPDJ, {
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
          console.log(this.tablePage);
          //当前页不存在数据时，定位到前一页
          if (this.tablePage.length === 0) {
            this.currentPage = this.currentPage - 1;
          }
          this.getDjxx();
          
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

    selsChange(sels) {
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
        axios.post(ADDRESS_CPDJ, {
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
          this.getDjxx();

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



     addSubmit() {
       this.$refs.addForm.validate((valid) => {
         if (valid) {
           this.$confirm('确认提交新增吗？', '提示', {}).then(() => {
             this.addForm.xw = '1';
             console.log(this.addForm);
             axios.post(ADDRESS_CPDJ, {
                 'xw': this.addForm.xw,
                 'dwdm': this.addForm.dwdm,
                 'dwmc': this.addForm.dwmc,
                 'xmddm': this.addForm.xmddm,
                 'xmdmc': this.addForm.xmdmc,
                 'cpdm': this.addForm.cpdm,
                 'sfjmg': this.addForm.sfjmg,
                 'sfsq': this.addForm.sfsq,
                 'jzsj': this.addForm.jzsj,
                 'csr': this.addForm.csr,
                 'fsr': this.addForm.fsr,
                 'sqshr': this.addForm.sqshr,
                 'lrr': this.addForm.lrr,
                 'bz': this.addForm.bz
               })
               .then((res) => {
                 console.log(res);
                 if (res.data.code === '0000') {
                   this.$message({
                     showClose: true,
                     message: '新增产品登记信息成功！',
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
                 this.currentPage = 1;
                 this.getDjxx();

               }).catch(() => {
                 this.$message({
                   showClose: true,
                   message: '新增产品登记信息失败！',
                   type: 'info'
                 });
               });
           });
         }
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

              axios.post(ADDRESS_CPDJ, {
                  'xw': this.editForm.xw,
                  'index': this.editForm.index,
                  'dwdm': this.editForm.dwdm,
                  'dwmc': this.editForm.dwmc,
                  'xmddm': this.editForm.xmddm,
                  'xmdmc': this.editForm.xmdmc,
                  'cpdm': this.editForm.cpdm,
                  'sfjmg': this.editForm.sfjmg,
                  'sfsq': this.editForm.sfsq,
                  'jzsj': this.editForm.jzsj,
                  'csr': this.editForm.csr,
                  'fsr': this.editForm.fsr,
                  'sqshr': this.editForm.sqshr,
                  'lrr': this.editForm.lrr,
                  'bz': this.editForm.bz
                })
                .then((res) => {
                  console.log(res);
                  if (res.data.code === '0000') {
                    this.$message({
                      showClose: true,
                      message: '编辑产品登记信息成功！',
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
                  this.getDjxx();

                }).catch(() => {
                  this.$message({
                    showClose: true,
                    message: '编辑产品登记信息失败！',
                    type: 'info'
                  });
                });
            });
          }
        });
      },


    formatterSfjmg(row, column) {
      switch (row.sfjmg) {
        case "0":
          return "不使用"
          break;
        case "1":
          return "使用"
          break;
        default:
          break;
      }
    },

    formatterSfsq(row, column) {
      switch (row.sfsq) {
        case "0":
          return "否"
          break;
        case "1":
          return "是"
          break;
        default:
          break;
      }
    },

    //附带输入建议的input
    queryXzqdm(queryString, cb) {
      var xzqdms = this.xzqdms;
      var results = queryString ? xzqdms.filter(this.createFilter(queryString)) : xzqdms;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    queryXzqmc(queryString, cb) {
      var xzqmcs = this.xzqmcs;
      var results = queryString ? xzqmcs.filter(this.createFilter(queryString)) : xzqmcs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    queryCpdm(queryString, cb) {
      var cpdms = this.cpdms;
      var results = queryString ? cpdms.filter(this.createFilter(queryString)) : cpdms;
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
      if (res.code === '0000' && res.data.xzqdm) {
        this.xzqdms = res.data.xzqdm;
      }

      if (res.code === '0000' && res.data.xzqmc) {
        this.xzqmcs = res.data.xzqmc;
      }

      if (res.code === '0000' && res.data.cpdm) {
        this.cpdms = res.data.cpdm;
      }
    },


    //----------------------------------------------------------------------------------------//

    handleSelectXzqdm() {

    },

    rowStyle(row) {
      return 'color:green'
    }
  },
  mounted() {
    this.getDjxx();
    this.loadSuggestions();

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
>>>.el-dialog
  .el-form-item__label
    font-size 13px
  .el-input
    width 90%
  .el-autocomplete
    width 100%
// .editing
//   span
//     display none
//   .el-input
//     display inline
</style>

