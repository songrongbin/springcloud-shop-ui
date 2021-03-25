<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="query.deptCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入部门编码"/>
      <el-input v-model="query.deptName" clearable class="filter-item" style="width: 200px;" placeholder="请输入部门名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="viewAdd">添加</el-button>
    </div>
    <div class="table_container">

      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          property="deptCode"
          label="部门编号"
          width="100">
        </el-table-column>
        <el-table-column
          property="deptName"
          label="部门名称"
          width="100">
        </el-table-column>
        <el-table-column
          property="sort"
          label="排序"
          width="100">
        </el-table-column>
        <el-table-column
          property="createByName"
          label="创建人"
          width="100">
        </el-table-column>
        <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewDetail(scope.row)">部门详情</el-button>
            <el-button type="primary" @click="deleteRecord(scope.row)">删除部门</el-button>
            <el-button type="primary" @click="viewEdit(scope.row)">编辑部门信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="count">
        </el-pagination>
      </div>
    </div>

    <!-- 部门详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="部门详情" width="700">
      <el-form :data="detail" label-position="right">
        <el-form-item label="部门编码：" label-width="100px">
          <span>{{ detail.deptCode }}</span>
        </el-form-item>
        <el-form-item label="部门名称：" label-width="100px">
          <span>{{ detail.deptName }}</span>
        </el-form-item>
        <el-form-item label="上级部门：" label-width="100px">
          <span>{{ detail.pidName }}</span>
        </el-form-item>
        <el-form-item label="序号：" label-width="100px">
          <span>{{ detail.sort }}</span>
        </el-form-item>
        <el-form-item label="创建人：" label-width="100px">
          <span>{{ detail.createByName }}</span>
        </el-form-item>
      </el-form>
      <div class="filter-container" style="float:right">
        <el-button class="filter-item"  type="primary" icon="el-icon-search" @click="closeDetail">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 部门编辑和添加 -->
    <el-dialog :visible.sync="editDialogVisible" title="部门编辑" width="700">
      <el-form :data="editInfo" label-position="right">
        <el-form-item label="部门编码" label-width="100px">
          <el-input v-model="editInfo.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" label-width="100px">
          <el-input v-model="editInfo.deptName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" label-width="100px">
          <el-select v-model="editInfo.pid" placeholder="请选择">
            <el-option
              v-for="item in deptSelect"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号" label-width="100px">
          <el-input v-model="editInfo.sort"></el-input>
        </el-form-item>
      </el-form>
      <div class="filter-container" style="float:right">
        <el-button class="filter-item"  type="primary" icon="el-icon-search" @click="doEdit">{{editButtonName}}</el-button>
        <el-button class="filter-item"  type="primary" icon="el-icon-search" @click="closeEdit">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {getDeptList, getDeptDetail, doAddDept, doEditDept, doDeleteDept, getDeptSelectList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        deptCode: 'admin',
        deptName: 'Andy',
        sort: 0,
        createByName: ''
      }],
      detail: {
        id: 0,
        deptCode: '',
        deptName: '',
        pidName: '',
        sort: 0,
        createByName: ''
      },
      editInfo: {
        id: 0,
        deptCode: '',
        deptName: '',
        pid: '',
        sort: 0,
        createBy: ''
      },
      query: {
        deptCode: '',
        deptName: ''
      },
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1,
      detailDialogVisible: false,
      editDialogVisible: false,
      editButtonName: '编辑',
      deptSelect: [{
        code: 'admin',
        name: 'admin'
      }],
      createBySelect: []
    }
  },
  components: {
    headTop
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        await this.getDepts()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getDepts()
    },
    async viewDetail (row) {
      const detailResult = await getDeptDetail({id: row.id})
      if (detailResult.code === 0) {
        this.detailDialogVisible = true
        this.detail = detailResult.data
      }
    },
    async closeDetail () {
      this.detailDialogVisible = false
    },
    async closeEdit () {
      this.editDialogVisible = false
    },
    async doEdit () {
      if (this.editInfo.id == null || this.editInfo.id === 0) {
        const result = await doAddDept(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          await this.getDepts()
        }
      } else {
        const result = await doEditDept(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          await this.getDepts()
        }
      }
    },
    async deleteRecord (row) {
      this.$confirm('删除操作不能恢复，您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const result = doDeleteDept({id: row.id})
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getDepts()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async viewAdd () {
      this.editDialogVisible = true
      this.editInfo.id = 0
      this.editButtonName = '添加'
      await this.getDeptSelect()
    },
    async viewEdit (row) {
      const detailResult = await getDeptDetail({id: row.id})
      if (detailResult.code === 0) {
        this.editDialogVisible = true
        this.editInfo = detailResult.data
        this.editInfo.id = row.id
        this.editButtonName = '编辑'
        await this.getDeptSelect()
      }
    },
    async search () {
      await this.getDepts()
    },
    async getDepts () {
      const result = await getDeptList({pageNum: this.offset, pageSize: this.limit, deptCode: this.query.deptCode, deptName: this.query.deptName})
      if (result.code === 0) {
        this.count = result.data.total
        this.offset = result.data.pageNum
        this.limit = result.data.pageSize
        this.currentPage = result.data.pages
        this.tableData = result.data.list
      }
    },
    async getDeptSelect () {
      const result = await getDeptSelectList({})
      if (result.code === 0) {
        this.deptSelect = result.data
      }
    }
  }
}
</script>

<style lang="less">
  @import '../style/mixin';

  .table_container {
    padding: 20px;
  }
</style>
