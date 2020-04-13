import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import userManage from './modules/userManage'
import videoManage from './modules/videoManage'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    userManage,
    videoManage
  },
  getters
})

export default store
