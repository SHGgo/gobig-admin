import { search, uploadVideoContent, uploadVideoFile, deleteVideo } from '@/api/videoManage'
import { searchFix } from '@/utils/search-param'

const getDefaultState = () => ({
  showTable: [],
  keyWord: '',
  condition: '',
  videoInfo: null, // videoInfo是指向table改变的元素的指针
  dialogInfoVisible: false,
  progress: 0
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
  SET_VIDEOINFO(state, videoInfo) {
    state.videoInfo = videoInfo
  },
  SET_DIALOG(state, dialogInfoVisible) {
    state.dialogInfoVisible = dialogInfoVisible
  },
  SET_PROGRESS(state, progress) {
    state.progress = progress
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
        console.log(data)
        // TODO: SHOWTABLE
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
      uploadVideoContent(json).then(response => {
        formData.set('vid', response.data.vid)
      }).then(() => {
        uploadVideoFile(formData, (progressEvent) => {
          // TODO:进度条
          state.progress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
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
  update({ state, commit }, { json, formData }) {
    return new Promise((resolve, reject) => {
      uploadVideoContent(json).then(() => {
        if (formData) {
          formData.set('uid', json.uid)
          uploadVideoFile(formData)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ state }, json) {
    return new Promise((resolve, reject) => {
      deleteVideo(json).then(() => {
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
