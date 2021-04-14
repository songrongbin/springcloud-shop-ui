<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="query.permissionCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入权限编码"/>
      <el-input v-model="query.permissionName" clearable class="filter-item" style="width: 200px;" placeholder="请输入权限名称"/>
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
          property="permissionCode"
          label="权限编码"
          width="220">
        </el-table-column>
        <el-table-column
          property="permissionName"
          label="权限名称"
          width="220">
        </el-table-column>
        <el-table-column
          property="permissionType"
          label="权限类型"
          :formatter="permissionTypeFormat">
        </el-table-column>
        <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewRecordDetail(scope.row)">权限详情</el-button>
            <el-button type="primary" @click="deleteRecord(scope.row)">删除权限</el-button>
            <el-button type="primary" @click="viewEditRecord(scope.row)">编辑权限信息</el-button>
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

    <!-- 权限详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="权限详情" width="700">
      <el-form :data="detail" label-position="right">
        <el-form-item label="权限编码：" label-width="100px">
          <span>{{ detail.permissionCode }}</span>
        </el-form-item>
        <el-form-item label="权限名称：" label-width="100px">
          <span>{{ detail.permissionName }}</span>
        </el-form-item>
        <el-form-item label="权限类型：" label-width="100px">
          <template slot-scope="scope">
            {{ scope.row.permissionType === 1 ? '模块' : scope.row.permissionType === 2 ? '菜单' : scope.row.permissionType === 3 ? '权限' : ''}}
          </template>
        </el-form-item>
        <el-form-item label="URL：" label-width="100px">
          <span>{{ detail.url }}</span>
        </el-form-item>
        <el-form-item label="URL：" label-width="100px">
          <span>{{ detail.urlClass }}</span>
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

    <!-- 权限编辑和添加 -->
    <el-dialog :visible.sync="editDialogVisible" title="权限编辑" width="700">
      <el-form :data="editInfo" label-position="right">
        <el-form-item label="权限编码" label-width="100px">
          <el-input v-model="editInfo.permissionCode"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" label-width="100px">
          <el-input v-model="editInfo.permissionName"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" label-width="100px">
          <el-select v-model="editInfo.permissionType" placeholder="请选择">
            <el-option
              v-for="item in permissionTypeSelect"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父权限" label-width="100px">
          <el-select v-model="editInfo.pid" placeholder="请选择">
            <el-option
              v-for="item in pidSelect"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" label-width="100px">
          <el-input v-model="editInfo.url"></el-input>
        </el-form-item>
        <el-form-item label="URL" label-width="100px">
          <el-input v-model="editInfo.urlClass"></el-input>
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
import {getPermissionList, getPermissionDetail, deletePermission, addPermission, editPermission, getPermissionPidSelectList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        permissionCode: 'sys:user:view',
        permissionName: '用户查看',
        permissionType: '1'
      }],
      detail: {
        id: 0,
        permissionCode: '',
        permissionName: '',
        permissionType: '1',
        url: '',
        urlClass: '',
        sort: 0,
        createByName: ''
      },
      editInfo: {
        id: 0,
        permissionCode: '',
        permissionName: '',
        permissionType: '1',
        url: '',
        urlClass: '',
        sort: 0
      },
      query: {
        permissionCode: '',
        permissionName: '',
        permissionType: '1'
      },
      permissionTypeSelect: [{
        code: 1,
        name: '模块'
      }, {
        code: 2,
        name: '菜单'
      }, {
        code: 3,
        name: '权限'
      }],
      pidSelect: [{
        code: 7,
        name: '用户管理'
      }],
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
        await this.getPermissions()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async viewRecordDetail (row) {
      const detailResult = await getPermissionDetail({id: row.id})
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
        const result = deletePermission({id: row.id})
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getPermissions()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async viewEditRecord (row) {
      const detailResult = await getPermissionDetail({id: row.id})
      if (detailResult.code === 0) {
        this.editDialogVisible = true
        this.editInfo = detailResult.data
        this.editInfo.id = row.id
        this.editButtonName = '编辑'
        await this.getPidSelect()
        await this.getPermissions()
      }
    },
    async searchRecord () {
      await this.getPermissions()
    },
    viewAddRecord () {
      this.editDialogVisible = true
      this.editInfo.id = 0
      this.editInfo.permissionCode = ''
      this.editInfo.permissionName = ''
      this.editInfo.permissionType = 0
      this.editInfo.url = ''
      this.editInfo.sort = ''
      this.editInfo.pid = ''
      this.editButtonName = '添加'
      this.getPidSelect()
    },
    async doEdit () {
      if (this.editInfo.id == null || this.editInfo.id === 0) {
        const result = await addPermission(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          await this.getPermissions()
        }
      } else {
        const result = await editPermission(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          await this.getPermissions()
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
      this.getPermissions()
    },
    async getPermissions () {
      const listResult = await getPermissionList({pageNum: this.currentPage, pageSize: this.limit, permissionCode: this.query.permissionCode, permissionName: this.query.permissionName})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.limit = listResult.data.pageSize
        this.currentPage = listResult.data.pageNum
        this.tableData = listResult.data.list
      }
    },
    permissionTypeFormat (row, column) {
      if (row.permissionType === 1) {
        return '模块'
      } else if (row.permissionType === 2) {
        return '菜单'
      } else if (row.permissionType === 3) {
        return '权限'
      }
      return ''
    },
    async getPidSelect () {
      const result = await getPermissionPidSelectList({})
      if (result.code === 0) {
        this.pidSelect = result.data
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
