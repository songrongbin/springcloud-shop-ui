<template>
  <div class="fillcontain">
    <head-top></head-top>
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
          label="权限类型">
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
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {getPermissionList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        permissionCode: 'sys:user:view',
        permissionName: '用户查看',
        permissionType: '1'
      }],
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getPermissions()
    },
    async getPermissions () {
      const listResult = await getPermissionList({pageNum: this.offset, pageSize: this.limit})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.offset = listResult.data.pageNum
        this.limit = listResult.data.pageSize
        this.currentPage = listResult.data.pages
        this.tableData = []
        listResult.data.list.forEach(item => {
          const tableData = {}
          tableData.permissionCode = item.permissionCode
          tableData.permissionName = item.permissionName
          tableData.permissionType = item.permissionType
          this.tableData.push(tableData)
        })
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
