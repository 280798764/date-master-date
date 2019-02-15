/* 登录 */
import ajax from '@/utils/ajax'

const actions = {
  /* 列表 */
  'a:typalMap/getMapTypeList' ({commit}, parameters = {}) {
    return ajax.api({
      cmd: 'ime-sys/bigmapTypeManage/getMapTypeList',
      ...parameters
    })
  }
}

export default {
  actions
}
