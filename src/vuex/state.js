const state = {
  flowEntranceIndex: 0,
  myFlowTabIndex: 0,
  doneFlowTabIndex: 0,
  msgTabIndex: 0,
  loading: {
    show: false,
    text: 'Loading'
  },
  toast: {
    show: false,
    time: 2000,
    position: 'middle',
    msg: ''
  },
  myFlowData: [],
  doneFlowData: [],
  workplaceType: 10, // 工作台类型：10钉钉工作台，20链接企业现有工作台
  documentTitle: ''
}
export default state
