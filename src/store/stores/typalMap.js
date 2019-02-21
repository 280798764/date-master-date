/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 列表 */
  'a:typalMap/getMapTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/getMapTypeList',
      ...parameters
    })
  },
  /* 删除 */
  'a:typalMap/deleteMapType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/deleteMapType',
      parameters: params
    })
  },
  /* 新增或者新建 */
  'a:typalMap/saveOrUpdataMapType' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/saveOrUpdataMapType',
      parameters: params
    })
  },
  /* 详情 */
  'a:typalMap/getMapById' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/getMapById',
      parameters: params
    })
  },
  /* 名称是否存在 */
  'a:typalMap/getMapTypeByName' ({commit}, params) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/getMapTypeByName',
      parameters: params
    })
  }
}

export default {
  actions
}
