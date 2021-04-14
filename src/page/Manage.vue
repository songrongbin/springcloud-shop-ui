<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.url"
          >
            <template slot="title">
              <i v-bind:class="[item.urlClass]"></i><span>{{ item.permissionName }}</span>
            </template>
            <el-menu-item
              :index="subItem.url + ''"
              v-for="subItem in item.permissionList"
              :key="subItem.url">
              <span slot="title">{{ subItem.permissionName }}</span>
            </el-menu-item>
          </el-submenu>

<!--          <el-submenu index="7">-->
<!--            <template slot="title"><i class="el-icon-warning"></i>订单管理</template>-->
<!--            <el-menu-item index="orderList">订单列表</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="3">-->
<!--            <template slot="title"><i class="el-icon-plus"></i>供应商管理</template>-->
<!--            <el-menu-item index="supplierList">供应商列表</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="3">-->
<!--            <template slot="title"><i class="el-icon-plus"></i>商品管理</template>-->
<!--            <el-menu-item index="goodsList">商品列表</el-menu-item>-->
<!--            <el-menu-item index="brandList">品牌列表</el-menu-item>-->
<!--            <el-menu-item index="categoryList">品类列表</el-menu-item>-->
<!--            <el-menu-item index="addGoods">添加商品</el-menu-item>-->
<!--          </el-submenu>-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>用户管理</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="roleList">角色列表</el-menu-item>
            <el-menu-item index="permissionList">权限列表</el-menu-item>
            <el-menu-item index="deptList">部门列表</el-menu-item>
            <el-menu-item index="userGroupList">用户组列表</el-menu-item>
          </el-submenu>
<!--          <el-submenu index="6">-->
<!--            <template slot="title"><i class="el-icon-setting"></i>系统设置</template>-->
<!--            <el-menu-item index="adminSet">管理员设置</el-menu-item>-->
<!--            &lt;!&ndash; <el-menu-item index="sendMessage">发送通知</el-menu-item> &ndash;&gt;-->
<!--          </el-submenu>-->
<!--          <el-submenu index="4">-->
<!--            <template slot="title"><i class="el-icon-star-on"></i>图表</template>-->
<!--            <el-menu-item index="visitor">用户分布</el-menu-item>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="5">-->
<!--            <template slot="title"><i class="el-icon-edit"></i>编辑</template>-->
<!--            &lt;!&ndash; <el-menu-item index="uploadImg">上传图片</el-menu-item> &ndash;&gt;-->
<!--            <el-menu-item index="vueEdit">文本编辑</el-menu-item>-->
<!--          </el-submenu>-->
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getUserMenuList} from '@/api/getData'

export default {
  data () {
    return {
      menuList: [{
        url: '',
        urlClass: '',
        permissionName: '用户管理',
        permissionList: [{
          url: 'userList',
          urlClass: '',
          permissionName: '用户列表'
        }]
      }]
    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        await this.getMenuList()
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async getMenuList () {
      const result = await getUserMenuList()
      if (result.code === 0) {
        this.menuList = result.data
      }
    }
  }
}
</script>
