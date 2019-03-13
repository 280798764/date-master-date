/* demo page one 接口备注 */
import ajax from '@/utils/ajax'

const actions = {
  /*  */
  'a:device/getMachineType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineType',
      parameters: params
    })
  },
  /* 获取品牌 */
  'a:device/getBrandList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/brandManage/getBrandList',
      parameters: params
    })
  },
  /* 获取大类 */
  'a:device/getMainTypeListNoPage' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/getMainTypeListNoPage',
      parameters: params
    })
  },
  /* 获取设备类型 */
  'a:device/getMachineTypeByMainCode' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineTypeByMainCode',
      parameters: params
    })
  },
  /* 获取途径 */
  'a:device/getMachineObtainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineObtainType',
      parameters: params
    })
  },
  /* // 获取设备制造商/使用权/所有权 */
  'a:device/getFacNameAndId' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getFacNameAndId',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:device/getMachineList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineList',
      ...parameters
    })
  },
  /* 读取详情 */
  'a:device/getMachineById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineById',
      parameters: params
    })
  },
  /* 修改 */
  'a:device/updateMachineById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/updateMachineById',
      parameters: params
    })
  },
  /* 新建 */
  'a:device/saveMachine' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/saveMachine',
      parameters: params
    })
  },
  /* 删除 */
  'a:device/deleteMachineById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/deleteMachineById',
      parameters: params
    })
  },
  /* 设备大类 */
  'a:device/getIboxMainTypeList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/getIboxMainTypeListNoPage',
      parameters: params
    })
  },
  /* 设备小类 */
  'a:device/getIboxTypeList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/getIboxTypeListNoPage',
      parameters: params
    })
  },
  /* 初始化seafile */
  'a:device/initToken' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/initToken',
      parameters: params
    })
  },
  /* 初始化ldap */
  'a:device/initLdapUser' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/initLdapUser',
      parameters: params
    })
  },
  /* 初始化 */
  'a:device/initParamsConfig' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/initParamsConfig',
      parameters: params
    })
  }
}

export default {
  actions
}
