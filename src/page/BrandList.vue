<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="filter-container">
      <el-input v-model="query.brandName" clearable class="filter-item" style="width: 200px;" placeholder="请输入品牌名称"/>
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
          property="brandName"
          label="品牌名称"
          width="150">
        </el-table-column>
        <el-table-column
          property="brandDesc"
          label="品牌描述"
          width="150">
        </el-table-column>
        <el-table-column
          property="sort"
          label="排序"
          width="100">
        </el-table-column>
        <el-table-column
          property="status"
          label="状态">
        </el-table-column>
        <el-table-column align="center" label="操作" width="400" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" @click="viewRecordDetail(scope.row)">品牌详情</el-button>
            <el-button type="primary" @click="deleteRecord(scope.row)">删除品牌</el-button>
            <el-button type="primary" @click="viewEditRecord(scope.row)">编辑品牌</el-button>
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

    <!-- 品牌详情 -->
    <el-dialog :visible.sync="detailDialogVisible" title="品牌详情" width="700">
      <el-form :data="detail" label-position="right">
        <el-form-item label="品牌名称：" label-width="100px">
          <span>{{ detail.brandName }}</span>
        </el-form-item>
        <el-form-item label="品牌描述：" label-width="100px">
          <span>{{ detail.brandDesc }}</span>
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

    <!-- 品牌编辑和添加 -->
    <el-dialog :visible.sync="editDialogVisible" title="部门编辑" width="700">
      <el-form :data="editInfo" label-position="right">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input v-model="editInfo.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述" label-width="100px">
          <el-input v-model="editInfo.brandDesc"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片" label-width="100px">
          <el-input v-model="editInfo.picUrl"></el-input>
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
import {getBrandList, getBrandDetail, deleteBrand, addBrand, editBrand} from '@/api/getData'

export default {
  data () {
    return {
      tableData: [{
        brandName: '京东',
        brandDesc: '电商网站',
        status: 1
      }],
      detail: {
        id: 0,
        brandName: '',
        brandDesc: '',
        status: 1,
        sort: 0,
        createByName: ''
      },
      editInfo: {
        id: 0,
        brandName: '',
        brandDesc: '',
        picUrl: '',
        status: 1,
        sort: 0,
        createByName: ''
      },
      query: {
        brandName: ''
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
        await this.getBrands()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async viewRecordDetail (row) {
      const detailResult = await getBrandDetail({id: row.id})
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
        const result = deleteBrand({id: row.id})
        if (result.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getBrands()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async viewEditRecord (row) {
      const detailResult = await getBrandDetail({id: row.id})
      if (detailResult.code === 0) {
        this.editDialogVisible = true
        this.editInfo = detailResult.data
        this.editInfo.id = row.id
        this.editButtonName = '编辑'
        await this.getBrands()
      }
    },
    async searchRecord () {
      await this.getBrands()
    },
    viewAddRecord () {
      this.editDialogVisible = true
      this.editInfo.id = 0
      this.editButtonName = '添加'
    },
    async doEdit (row) {
      if (row.id == null || row.id === 0) {
        const result = await addBrand(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          await this.getBrands()
        }
      } else {
        const result = await editBrand(this.editInfo)
        if (result.code === 0) {
          this.editDialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
          await this.getBrands()
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
      this.getBrands()
    },
    async getBrands () {
      const listResult = await getBrandList({pageNum: this.offset, pageSize: this.limit, brandName: this.query.brandName})
      if (listResult.code === 0) {
        this.count = listResult.data.total
        this.offset = listResult.data.pageNum
        this.limit = listResult.data.pageSize
        // this.currentPage = listResult.data.pages
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
