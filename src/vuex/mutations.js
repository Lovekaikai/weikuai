const mutations = {
  setAuthKey(state, val) {
    state.authKey = val
  },
  showToast(state, data) {
    state.toast = data
  },
  closeToast(state) {
    state.toast.show = false
  },
  showLoading(state, data) {
    state.loading = data
  },
  closeLoading(state) {
    state.loading.show = false
  },
  setFlowEntranceIndex(state, val) {
    state.flowEntranceIndex = val
  },
  setMyFlowIndex(state, val) {
    state.myFlowTabIndex = val
  },
  setDoneFlowIndex(state, val) {
    state.doneFlowTabIndex = val
  },
  setMsgTabIndex(state, val) {
    state.msgTabIndex = val
  },
  setMyFlow(state, data) {
    state.myFlowData = data
  },
  setDoneFlow(state, data) {
    state.doneFlowData = data
  },
  setWorkplaceType(state, type) {
    state.workplaceType = type
  },
  setDocmentTitle(state, title) {
    state.documentTitle = title
  }
}

export default mutations
