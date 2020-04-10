import { search, insertUserContent, uploadUserFigure } from '@/api/userManage'
import { userManageSearchFix } from '@/utils/search-param'

const getDefaultState = () => ({
  userInfo: {},
  showTable: [],
  keyWord: '',
  condition: ''
})

const state = getDefaultState()

const mutations = {
  SET_SHOWTABLE(state, showTable) {
    state.showTable = showTable
  },
  SET_KEYWORD(state, keyWord) {
    state.keyWord = keyWord
  },
  SET_CONDITION(state, condition) {
    state.condition = condition
  },
  SET_USERINFO(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  /**
   *
   * @param {JSON} data
   * @returns {Promise}
   */
  search({ commit, state }, { pageStart = 0, pageItemNum = 0 }) {
    const json = userManageSearchFix(state.keyWord, state.condition, pageStart, pageItemNum)
    return new Promise((resolve, reject) => {
      search(json).then(response => {
        const { data } = response
        if (!data) {
          reject('查询失败，请稍后再试')
        }
        commit('SET_SHOWTABLE', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   *
   * @param {JSON} json
   * @param {FormData} formData
   */
  inset({ commit, state }, { json, formData }) {
    return new Promise((resolve, reject) => {
      insertUserContent(json).then(response => {
        formData.set('uid', response.data.user.uid)
      }).then(() => {
        uploadUserFigure(formData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
