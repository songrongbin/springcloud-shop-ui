import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/login'
import Manage from '../page/Manage'
import Home from '../page/Home'
import UserList from '../page/UserList'
import RoleList from '../page/RoleList'
import DeptList from '../page/DeptList'
import PermissionList from '../page/PermissionList'
import UserGroupList from '../page/UserGroupList'
import SupplierList from '../page/SupplierList'
import OrderList from '../page/OrderList'
import GoodsList from '../page/GoodsList'
import BrandList from '../page/BrandList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      component: Manage,
      name: '',
      children: [{
        path: '',
        component: Home,
        meta: []
      }, {
        path: '/userList',
        component: UserList,
        meta: ['用户管理', '用户列表']
      }, {
        path: '/roleList',
        component: RoleList,
        meta: ['用户管理', '角色列表']
      }, {
        path: '/deptList',
        component: DeptList,
        meta: ['用户管理', '部门列表']
      }, {
        path: '/permissionList',
        component: PermissionList,
        meta: ['用户管理', '权限列表']
      }, {
        path: '/userGroupList',
        component: UserGroupList,
        meta: ['用户管理', '用户组列表']
      }, {
        path: '/supplierList',
        component: SupplierList,
        meta: ['供应商管理', '供应商列表']
      }, {
        path: '/orderList',
        component: OrderList,
        meta: ['订单管理', '订单列表']
      }, {
        path: '/goodsList',
        component: GoodsList,
        meta: ['商品管理', '商品列表']
      }, {
        path: '/brandList',
        component: BrandList,
        meta: ['供应商管理', '品牌列表']
      }
      // , {
      //   path: '/addShop',
      //   component: addShop,
      //   meta: ['添加数据', '添加商铺']
      // }, {
      //   path: '/addGoods',
      //   component: addGoods,
      //   meta: ['添加数据', '添加商品']
      // }, {
      //   path: '/userList',
      //   component: userList,
      //   meta: ['数据管理', '用户列表']
      // }, {
      //   path: '/shopList',
      //   component: shopList,
      //   meta: ['数据管理', '商家列表']
      // }, {
      //   path: '/foodList',
      //   component: foodList,
      //   meta: ['数据管理', '食品列表']
      // }, {
      //   path: '/orderList',
      //   component: orderList,
      //   meta: ['数据管理', '订单列表']
      // }, {
      //   path: '/adminList',
      //   component: adminList,
      //   meta: ['数据管理', '管理员列表']
      // }, {
      //   path: '/visitor',
      //   component: visitor,
      //   meta: ['图表', '用户分布']
      // }, {
      //   path: '/newMember',
      //   component: newMember,
      //   meta: ['图表', '用户数据']
      // }, {
      //   path: '/uploadImg',
      //   component: uploadImg,
      //   meta: ['文本编辑', 'MarkDown']
      // }, {
      //   path: '/vueEdit',
      //   component: vueEdit,
      //   meta: ['编辑', '文本编辑']
      // }, {
      //   path: '/adminSet',
      //   component: adminSet,
      //   meta: ['设置', '管理员设置']
      // }, {
      //   path: '/sendMessage',
      //   component: sendMessage,
      //   meta: ['设置', '发送通知']
      // }, {
      //   path: '/explain',
      //   component: explain,
      //   meta: ['说明', '说明']
      // }
      ]
    }
  ]
})
