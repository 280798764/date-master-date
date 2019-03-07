/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 获取品牌 */
  'a:systemBig/getBrandList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/brandManage/getBrandList',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:systemBig/getMainTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/getMainTypeList',
      ...parameters
    })
  },
  /* 详情 */
  'a:systemBig/getMainTypeById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/getMainTypeById',
      parameters: params
    })
  },
  /* 修改 */
  'a:systemBig/updataMainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/updataMainType',
      parameters: params
    })
  },
  /* 新建 */
  'a:systemBig/saveMainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/saveMainType',
      parameters: params
    })
  },
  /* 删除 */
  'a:systemBig/deleteMainTypeById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/mainTypeManage/deleteMainTypeById',
      parameters: params
    })
  }
}

export default {
  actions
}
