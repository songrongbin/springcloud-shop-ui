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
          property="deptCode"
          label="部门编号"
          width="220">
        </el-table-column>
        <el-table-column
          property="deptName"
          label="部门名称"
          width="220">
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
import {getDeptList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        deptCode: 'admin',
        deptName: 'Andy'
      }, {
        userCode: 'admin',
        userName: 'Andy'
      }, {
        userCode: 'admin',
        userName: 'Andy'
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
      this.getUsers()
    },
    async getDepts () {
      const usersResult = await getDeptList({pageNum: this.offset, pageSize: this.limit})
      if (usersResult.code === 0) {
        this.count = usersResult.data.total
        this.offset = usersResult.data.pageNum
        this.limit = usersResult.data.pageSize
        this.currentPage = usersResult.data.pages
        this.tableData = []
        usersResult.data.list.forEach(item => {
          const tableData = {}
          tableData.deptName = item.deptName
          tableData.deptCode = item.deptCode
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
