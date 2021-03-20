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
          property="supplierCode"
          label="供应商编号"
          width="220">
        </el-table-column>
        <el-table-column
          property="supplierName"
          label="供应商名称"
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
import {getSupplierList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        supplierCode: 'BINS',
        supplierName: 'bins.com'
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
        await this.getSuppliers()
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
      this.getSuppliers()
    },
    async getSuppliers () {
      const listResult = await getSupplierList({pageNum: this.offset, pageSize: this.limit})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.offset = listResult.data.pageNum
        this.limit = listResult.data.pageSize
        this.currentPage = listResult.data.pages
        this.tableData = []
        listResult.data.list.forEach(item => {
          const tableData = {}
          tableData.supplierName = item.supplierName
          tableData.supplierCode = item.supplierCode
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
