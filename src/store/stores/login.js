/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 01 登录 */
  'a:login/login' ({commit}, parameters) {
    return ajax.api({
      cmd: 'memberCenter/user/login',
      parameters
    })
  },
  /* 02 获取图片验证码 */
  'a:login/getVerifyImage' ({commit}, parameters) {
    return ajax.api({
      cmd: 'memberCenter/verifyImage/getImage',
      parameters
    })
  },
  /* 02 获取菜单 */
  'a:login/getModuleDTO' ({commit}, parameters, userToken) {
    return ajax.api({
      cmd: 'ime-sys/machineAuthorityManage/getModuleList',
      parameters,
      userToken: sessionStorage.getItem('userToken')
    })
  }
}

export default {
  actions
}
