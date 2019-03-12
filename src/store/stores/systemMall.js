/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 获取品牌 */
  'a:systemMall/getBrandList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/brandManage/getBrandList',
      parameters: params
    })
  },
  /* 地图类别名称 */
  'a:systemMall/getMainTypeList' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/getMapList',
      parameters: params
    })
  },
  /* 大类 */
  'a:systemMall/getMachineType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/machineManage/getMachineType',
      parameters: params
    })
  },
  /* 参数 */
  'a:systemMall/paramVersion' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-config/paramVersion/getAll',
      parameters: params
    })
  },
  /* --- */
  'a:systemMall/getAll' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-config/paramVersion/getAll',
      parameters: params
    })
  },
  /* 修改 */
  'a:systemMall/updataType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/typeManage/updataType',
      parameters: params
    })
  },
  /* 新建 */
  'a:systemMall/saveType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/typeManage/saveType',
      parameters: params
    })
  },
  /* 列表 */
  'a:systemMall/getTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/typeManage/getTypeList',
      ...parameters
    })
  }
}

export default {
  actions
}
