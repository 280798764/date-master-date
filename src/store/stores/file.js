/* 文件上传接口 */
import ajax from '@/utils/ajax'

const actions = {
  'a:file/fileUpload' ({commit}, {file, cmd}) {
    return ajax.apiFileUpload(file, cmd)
  },
  'a:file/fileUploadToQiNiu' ({commit}, file) {
    return ajax.apiUploadQiNiu2(file)
  }
}

export default {
  actions
}
