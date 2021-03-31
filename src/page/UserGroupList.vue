<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="query.groupCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户组编码"/>
      <el-input v-model="query.groupName" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户组名称"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchRecord">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="viewAddRecord">添加</el-button>
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
          property="groupCode"
          label="用户组编号"
          width="220">
        </el-table-column>
        <el-table-column
          property="groupName"
          label="用户组名称"
          width="220">
        </el-table-column>
        <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewRecordDetail(scope.row)">用户组详情</el-button>
            <el-button type="primary" @click="deleteRecord(scope.row)">删除用户组</el-button>
            <el-button type="primary" @click="viewEditRecord(scope.row)">编辑用户组信息</el-button>
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

    <!-- 用户组详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="部门详情" width="700">
      <el-form :data="detail" label-position="right">
        <el-form-item label="用户组编码：" label-width="100px">
          <span>{{ detail.groupCode }}</span>
        </el-form-item>
        <el-form-item label="用户组名称：" label-width="100px">
          <span>{{ detail.groupName }}</span>
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
        <el-form-item label="用户组编码" label-width="100px">
          <el-input v-model="editInfo.groupCode"></el-input>
        </el-form-item>
        <el-form-item label="用户组名称" label-width="100px">
          <el-input v-model="editInfo.groupName"></el-input>
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
import {getUserGroupList, getUserGroupDetail, deleteUserGroup, addUserGroup, editUserGroup} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        id: 0,
        groupCode: 'UG0001',
        groupName: '采销组'
      }],
      detail: {
        id: 0,
        groupCode: '',
        groupName: '',
        sort: 0,
        createByName: ''
      },
      editInfo: {
        id: 0,
        groupCode: '',
        groupName: '',
        sort: 0
      },
      query: {
        groupCode: '',
        groupName: ''
      },
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1,
      detailDialogVisible: false,
      editDialogVisible: false,
      editButtonName: '编辑'
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
        await this.getUserGroups()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async viewRecordDetail (row) {
      const detailResult = await getUserGroupDetail({id: row.id})
      if (detailResult.code === 0) {
        this.detailDialogVisible = true
        this.detail = detailResult.data
      }
    },
    deleteRecord (row) {
      this.$confirm('删除操作不能恢复，您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const result = deleteUserGroup({id: row.id})
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
    async viewEditRecord (row) {
      const detailResult = await getUserGroupDetail({id: row.id})
      if (detailResult.code === 0) {
        this.editDialogVisible = true
        this.editInfo = detailResult.data
        this.editInfo.id = row.id
        this.editButtonName = '编辑'
        await this.getUserGroups()
      }
    },
    async searchRecord () {
      await this.getUserGroups()
    },
    viewAddRecord () {
      this.editDialogVisible = true
      this.editInfo.id = 0
      this.editButtonName = '添加'
    },
    async doEdit () {
      if (this.editInfo.id == null || this.editInfo.id === 0) {
        const result = await addUserGroup(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          await this.getUserGroups()
        }
      } else {
        const result = await editUserGroup(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          await this.getUserGroups()
        }
      }
    },
    closeDetail () {
      this.detailDialogVisible = false
    },
    closeEdit () {
      this.editDialogVisible = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getUserGroups()
    },
    async getUserGroups () {
      const result = await getUserGroupList({pageNum: this.offset, pageSize: this.limit, groupCode: this.query.groupCode, groupName: this.query.groupName})
      if (result.code === 0) {
        this.count = result.data.total
        this.offset = result.data.pageNum
        this.limit = result.data.pageSize
        // this.currentPage = result.data.pages
        this.tableData = result.data.list
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
