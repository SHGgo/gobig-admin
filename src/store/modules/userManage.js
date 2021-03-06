import { search, insertUserContent, uploadUserFigure, uploadUserContent, deleteUserContent } from '@/api/userManage'
import { searchFix } from '@/utils/search-param'

const getDefaultState = () => ({
  showTable: [],
  keyWord: '',
  condition: '',
  userInfo: null, // userInfo是指向table改变的元素的指针
  dialogInfoVisible: false
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
  },
  SET_DIALOG(state, dialogInfoVisible) {
    state.dialogInfoVisible = dialogInfoVisible
  }
}

const actions = {
  /**
   *
   * @param {JSON} data
   * @returns {Promise}
   */
  search({ commit, state }, { pageStart = 0, pageItemNum = 10 }) {
    const json = searchFix(state.keyWord, state.condition, pageStart, pageItemNum)
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
  insert({ commit, state }, { json, formData }) {
    return new Promise((resolve, reject) => {
      insertUserContent(json).then(response => {
        formData.set('uid', response.data.user.uid)
      }).then(() => {
        uploadUserFigure(formData).catch((error) => {
          reject(error)
        })
        resolve()
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
  update({ state }, { json, formData }) {
    return new Promise((resolve, reject) => {
      uploadUserContent(json).then(() => {
        if (formData) {
          formData.set('uid', json.uid)
          uploadUserFigure(formData)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ state }, json) {
    return new Promise((resolve, reject) => {
      deleteUserContent(json).then(() => {
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
