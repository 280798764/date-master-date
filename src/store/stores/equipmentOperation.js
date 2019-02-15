/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 变更来源 */
  'a:equipmentOperation/getResourceList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machinesHistory/getResourceList',
      parameters: params
    })
  },
  /* 是否在线 */
  'a:equipmentOperation/getOnlineList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machinesHistory/getOnlineList',
      parameters: params
    })
  },
  /* 获取类型 */
  'a:equipmentOperation/getUseTypeList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machinesHistory/getUseTypeList',
      parameters: params
    })
  },
  /* 所有权/使用权 */
  'a:equipmentOperation/getFacNameAndId' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getFacNameAndId',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:equipmentOperation/getHistoryList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machinesHistory/getHistoryList',
      parameters: params
    })
  }
}

export default {
  actions
}
