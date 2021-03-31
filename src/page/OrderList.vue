<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="filter-container">
      <el-input v-model="query.orderCode" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编码"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchRecord">查找</el-button>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="orderCode"
          label="订单编号"
          width="100">
        </el-table-column>
        <el-table-column
          property="userName"
          label="用户"
          width="100">
        </el-table-column>
        <el-table-column
          property="statusName"
          label="订单状态">
        </el-table-column>
        <el-table-column
          property="orderAmount"
          label="订单金额">
        </el-table-column>
        <el-table-column
          property="couponAmount"
          label="优惠券金额">
        </el-table-column>
        <el-table-column
          property="discountAmount"
          label="折扣金额">
        </el-table-column>
        <el-table-column
          property="shoppingAmount"
          label="运费金额">
        </el-table-column>
        <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewOrderDetail(scope.row)">查看详情</el-button>
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

    <!-- 订单详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="订单详情" width="700">
      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="订单编码">
          <span>{{ orderDetail.orderCode }}</span>
        </el-form-item>
        <el-form-item label="用户名称">
          <span>{{ orderDetail.userName }}</span>
        </el-form-item>
        <el-form-item label="供应商名称">
          <span>{{ orderDetail.supplierName }}</span>
        </el-form-item>
<!--        <el-form-item v-for="orderGoods in orderDetail.orderGoodsList">-->
<!--          <el-form :model="orderGoods">-->
<!--            <el-form-item label="商品编码">-->
<!--              <span>{{ orderGoods.goodsCode }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品名称">-->
<!--              <span>{{ orderGoods.goodsName }}</span>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import headTop from '../components/headTop'
import {getOrderList, getOrderDetail} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        id: 0,
        orderCode: 'O100000',
        userId: 1,
        userName: 'andy',
        orderAmount: 100,
        couponAmount: 1,
        discountAmount: 1,
        shoppingAmount: 1,
        status: 1,
        statusName: '未支付'
      }],
      orderDetail: {
        orderCode: '',
        userName: '',
        orderGoodsList: []
      },
      query: {
        orderCode: ''
      },
      currentRow: null,
      offset: 0,
      limit: 10,
      count: 0,
      currentPage: 1,
      detailDialogVisible: false
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
    async searchRecord () {
      await this.getOrders()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getOrders()
    },
    async viewOrderDetail (row) {
      const detailResult = await getOrderDetail({id: row.id})
      if (detailResult.code === 0) {
        this.detailDialogVisible = true
        this.orderDetail = detailResult.data
      }
    },
    async getOrders () {
      const listResult = await getOrderList({pageNum: this.offset, pageSize: this.limit, orderCode: this.query.orderCode})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.offset = listResult.data.pageNum
        this.limit = listResult.data.pageSize
        this.currentPage = listResult.data.pages
        this.tableData = listResult.data.list
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
