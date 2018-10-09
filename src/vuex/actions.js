const actions = {
  setAuthKey ({ commit }, val) {
    commit('setAuthKey', val)
  },
  showToast ({ commit }, obj) {
    commit('showToast', obj)
  },
  closeToast ({ commit }) {
    commit('closeToast')
  },
  showLoading ({ commit }, obj) {
    commit('showLoading', obj)
  },
  closeLoading ({ commit }) {
    commit('closeLoading')
  },
  setFlowEntranceIndex ({ commit }, val) {
    commit('setFlowEntranceIndex', val)
  },
  setMyFlowIndex ({ commit }, val) {
    commit('setMyFlowIndex', val)
  },
  setDoneFlowIndex ({ commit }, val) {
    commit('setDoneFlowIndex', val)
  },
  setMsgTabIndex ({ commit }, val) {
    commit('setMsgTabIndex', val)
  },
  setMyFlow ({ commit }, data) {
    commit('setMyFlow', data)
  },
  setDoneFlow ({ commit }, data) {
    commit('setDoneFlow', data)
  },
  setWorkplaceType({ commit }, type) {
    commit('setWorkplaceType', type)
  },
  setDocmentTitle({ commit }, title) {
    commit('setDocmentTitle', title)
  }
}

export default actions
