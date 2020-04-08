import { search } from '@/api/userManage'
import { userManageSearchFix } from '@/utils/search-param'

const getDefaultState = () => ({
  showTable: null,
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
