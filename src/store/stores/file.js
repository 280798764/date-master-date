/* 文件上传接口 */
import ajax from '@/utils/ajax'

const actions = {
  'a:file/fileUpload' ({commit}, {file, cmd}) {
    return ajax.apiFileUpload(file, cmd)
  },
  'a:file/fileUploadToQiNiu' ({commit}, file) { // 系统大类和系统小类的上传在使用
    return ajax.apiUploadQiNiu2(file)
  }
}

export default {
  actions
}
