const dingtalk = {
  getDingtalkCorpId(obj) {
    let result = ''
    if (obj && obj.$route && obj.$route.query && obj.$route.query.corpid) {
      result = obj.$route.query.corpid
    }
    return result
  },
  getDingtalkAgentId(obj) {
    let result = ''
    if (obj && obj.$route && obj.$route.query && obj.$route.query.agentid) {
      result = obj.$route.query.agentid
    }
    return result
  },
  getDingAuthCode(corpId, onSuccess, onFail) {
    if (isMobile) {
      dd.ready(() => {
        dd.runtime.permission.requestAuthCode({
          corpId: corpId,
          onSuccess: onSuccess,
          onFail : onFail
        })
      })
    } else {
      DingTalkPC.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: onSuccess,
        onFail : onFail
      }) 
    }
  },
  async dingtalkLogin(obj, postData) {
    let data = await obj.goAjax('get', 'admin/base/dingtalk', postData)
    if (data) {
      _g.setLoginResult(data)
      if (obj.$route.query.redirectUrl) {
        router.replace(obj.$route.query.redirectUrl)
      }
    }
  }
}

module.exports = dingtalk
