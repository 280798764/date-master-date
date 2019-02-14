/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 获取品牌 */
  'a:device/getMachineTypeByMainCode' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineTypeByMainCode',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:device/getMainTypeList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/getMainTypeList',
      parameters: params
    })
  },
  /* 详情 */
  'a:device/getMainTypeById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/getMainTypeById',
      parameters: params
    })
  }
}

export default {
  actions
}
