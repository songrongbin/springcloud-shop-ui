<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align='start'>
      <img :src="avatar">
<!--      <el-button type="primary">-->
<!--        {{dropdownType}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--      </el-button>-->
      <el-dropdown-menu slot="dropdown"  >
        <el-dropdown-item v-for="item in dropdownArray"
                          v-text="item.name"
                          :key="item.code"
                          :command="item.code"
        ></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

<!--    <el-dropdown @command="handleCommand" menu-align='start'>-->

<!--      <el-dropdown-menu slot="dropdown">-->
<!--        <el-dropdown-item command="home">首页</el-dropdown-item>-->
<!--        <el-dropdown-item command="signout">退出</el-dropdown-item>-->
<!--      </el-dropdown-menu>-->
<!--    </el-dropdown>-->
  </div>
</template>

<script>
import {signout} from '@/api/getData'
import {baseImgPath} from '@/config/env'
// import {mapActions, mapState} from 'vuex'

export default {
  data () {
    return {
      baseImgPath,
      avatar: './assets/images/avatar.gif',
      dropdownArray: [{code: 'home', name: '首页'}, {code: 'signOut', name: '退出'}],
      dropdownType: '首页'
    }
  },
  created () {
    // if (!this.adminInfo.id) {
    // this.getAdminData()
    // }
  },
  computed: {
    // ...mapState(['adminInfo'])
  },
  methods: {
    // ...mapActions(['getAdminData']),
    async handleCommand (command) {
      if (command === 'home') {
        this.$router.push('/manage')
      } else if (command === 'signout') {
        const res = await signout()
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '退出成功'
          })
          this.$router.push('/')
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }
    }
  }
}
</script>

<style lang="less">
  //@import '../style/mixin';

  .header_container {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
