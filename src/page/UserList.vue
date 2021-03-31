<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="filter-container">
      <el-input v-model="query.userCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户编码"/>
      <el-input v-model="query.userName" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名称"/>
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
          property="userCode"
          label="用户编号"
          width="100">
        </el-table-column>
        <el-table-column
          property="userName"
          label="用户姓名"
          width="100">
        </el-table-column>
        <el-table-column
          property="deptName"
          label="部门名称"
          width="100">
        </el-table-column>
        <el-table-column
          property="phone"
          label="电话">
        </el-table-column>
        <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewRecordDetail(scope.row)">用户详情</el-button>
            <el-button type="primary" @click="deleteRecord(scope.row)">删除用户</el-button>
            <el-button type="primary" @click="viewEditRecord(scope.row)">编辑用户</el-button>
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
    <el-dialog :visible.sync="detailDialogVisible" title="用户详情" width="700">
      <el-form :data="detail" label-position="right">
        <el-form-item label="用户编码：" label-width="100px">
          <span>{{ detail.userCode }}</span>
        </el-form-item>
        <el-form-item label="用户名称：" label-width="100px">
          <span>{{ detail.userName }}</span>
        </el-form-item>
        <el-form-item label="用户邮箱：" label-width="100px">
          <span>{{ detail.email }}</span>
        </el-form-item>
        <el-form-item label="电话：" label-width="100px">
          <span>{{ detail.phone }}</span>
        </el-form-item>
        <el-form-item label="部门：" label-width="100px">
          <span>{{ detail.deptName }}</span>
        </el-form-item>
        <el-form-item label="用户组：" label-width="100px">
          <span>{{ detail.userGroupName }}</span>
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
    <el-dialog :visible.sync="editDialogVisible" title="用户编辑" width="700">
      <el-form :data="editInfo" label-position="right">
        <el-form-item label="用户编码" label-width="100px">
          <el-input v-model="editInfo.userCode"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" label-width="100px">
          <el-input v-model="editInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" label-width="100px">
          <el-input v-model="editInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="部门" label-width="100px">
          <el-select v-model="editInfo.deptId" placeholder="请选择">
            <el-option
              v-for="item in deptSelect"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户组" label-width="100px">
          <el-select v-model="editInfo.userGroupId" placeholder="请选择">
            <el-option
              v-for="item in userGroupSelect"
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
import {getUserList, getUserDetail, deleteUser, addUser, editUser, getDeptSelectList, getUserGroupSelectList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        userCode: 'admin',
        userName: 'admin',
        deptName: '数据部',
        phone: '18899998888'
      }],
      detail: {
        id: 0,
        userCode: '',
        userName: '',
        sort: 0,
        deptName: '',
        userGroupName: '',
        createByName: ''
      },
      editInfo: {
        id: 0,
        userCode: '',
        userName: '',
        deptId: 0,
        userGroupId: 0,
        sort: 0
      },
      query: {
        userCode: '',
        userName: ''
      },
      deptSelect: [{
        code: '1',
        name: 'admin'
      }],
      userGroupSelect: [{
        code: '1',
        name: 'admin'
      }],
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
        await this.getUsers()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async viewRecordDetail (row) {
      const detailResult = await getUserDetail({id: row.id})
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
        const result = deleteUser({id: row.id})
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getUsers()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async viewEditRecord (row) {
      const detailResult = await getUserDetail({id: row.id})
      if (detailResult.code === 0) {
        this.editDialogVisible = true
        this.editInfo = detailResult.data
        this.editInfo.id = row.id
        this.editButtonName = '编辑'
        await this.getDeptSelect()
        await this.getUserGroupSelect()
      }
    },
    async searchRecord () {
      await this.getUsers()
    },
    viewAddRecord () {
      this.editDialogVisible = true
      this.editInfo.id = 0
      this.editButtonName = '添加'
      this.getDeptSelect()
      this.getUserGroupSelect()
    },
    async doEdit () {
      if (this.editInfo.id == null || this.editInfo.id === 0) {
        const result = await addUser(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          await this.getUsers()
        }
      } else {
        const result = await editUser(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          await this.getUsers()
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
      this.getUsers()
    },
    async getUsers () {
      const usersResult = await getUserList({pageNum: this.offset, pageSize: this.limit, userCode: this.query.userCode, userName: this.query.userName})
      if (usersResult.code === 0) {
        this.count = usersResult.data.total
        this.offset = usersResult.data.pageNum
        this.limit = usersResult.data.pageSize
        // this.currentPage = usersResult.data.pages
        this.tableData = usersResult.data.list
      }
    },
    async getDeptSelect () {
      const result = await getDeptSelectList({})
      if (result.code === 0) {
        this.deptSelect = result.data
      }
    },
    async getUserGroupSelect () {
      const result = await getUserGroupSelectList({})
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
