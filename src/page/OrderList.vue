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
          property="orderCode"
          label="订单编号"
          width="220">
        </el-table-column>
        <el-table-column
          property="userId"
          label="用户"
          width="220">
        </el-table-column>
        <el-table-column
          property="orderAmount"
          label="订单金额">
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
import {getOrderList} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        orderCode: 'O100000',
        userId: 1,
        orderAmount: 100
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
        await this.getOrders()
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
      this.getOrders()
    },
    async getOrders () {
      const listResult = await getOrderList({pageNum: this.offset, pageSize: this.limit})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.offset = listResult.data.pageNum
        this.limit = listResult.data.pageSize
        this.currentPage = listResult.data.pages
        this.tableData = []
        listResult.data.list.forEach(item => {
          const tableData = {}
          tableData.orderCode = item.orderCode
          tableData.userId = item.userId
          tableData.orderAmount = item.orderAmount
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
