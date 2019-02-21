/* 设备大类管理 */
import ajax from '@/utils/ajax'

const actions = {
  /* 获取品牌 */
  'a:equipmenMall/getBrandList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/brandManage/getBrandList',
      parameters: params
    })
  },
  /* 设备大类名称 */
  'a:equipmenMall/getIboxMainTypeListNoPage' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxMainTypeManage/getIboxMainTypeListNoPage',
      parameters: params
    })
  },
  /* 获取列表 */
  'a:equipmenMall/getIboxTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/getIboxTypeList',
      ...parameters
    })
  },
  /* 详情 */
  'a:equipmenMall/getIboxTypeById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/getIboxTypeById',
      parameters: params
    })
  },
  /* 修改 */
  'a:equipmenMall/updataIboxType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/updataIboxType',
      parameters: params
    })
  },
  /* 新建 */
  'a:equipmenMall/saveIboxType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/saveIboxType',
      parameters: params
    })
  },
  /* 删除 */
  'a:equipmenMall/deleteIboxType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/iboxTypeManage/deleteIboxType',
      parameters: params
    })
  }
}

export default {
  actions
}
