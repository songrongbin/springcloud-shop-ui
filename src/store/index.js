import Vue from 'vue'
import Vuex from 'vuex'
import {getUserLoginInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
  adminInfo: {
    avatar: 'default.jpg'
  }
}

const mutations = {
  saveAdminInfo (state, loginInfo) {
    state.loginInfo = loginInfo
  }
}

const actions = {
  async getLoginData ({commit}) {
    try {
      const res = await getUserLoginInfo()
      if (res.status === 1) {
        commit('saveLoginInfo', res.data)
      } else {
        throw new Error(res.type)
      }
    } catch (err) {
      console.log(err.message)
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
