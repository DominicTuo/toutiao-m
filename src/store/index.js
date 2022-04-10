import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// 定义一个Token的全局常量,防止存取的语法错误
const TOKEN_KEY = 'TOKEN_KEY'

export default new Vuex.Store({
  state: {
    // 定义一个对象,用户存储用户的信息（Token等信息）
    // user : JSON.parse(localStorage.getItem(TOKEN_KEY))
    user : getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser(state,payload){
      state.user = payload
      // 将获取到的数据放入本地存储中，实现数据的持久化
      // localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
