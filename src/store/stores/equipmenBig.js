/* 设备大类管理 */
import ajax from '@/utils/ajax'

const actions = {
  /* 获取品牌 */
  'a:equipmenBig/getBrandList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/brandManage/getBrandList',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:equipmenBig/getIboxMainTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/getIboxMainTypeList',
      ...parameters
    })
  },
  /* 详情 */
  'a:equipmenBig/getMainTypeById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/getIboxMainTypeById',
      parameters: params
    })
  },
  /* 修改 */
  'a:equipmenBig/updataIboxMainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/updataIboxMainType',
      parameters: params
    })
  },
  /* 新建 */
  'a:equipmenBig/saveIboxMainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/saveIboxMainType',
      parameters: params
    })
  },
  /* 删除 */
  'a:equipmenBig/deleteIboxMainType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/deleteIboxMainType',
      parameters: params
    })
  }
}

export default {
  actions
}
