/* 常用过滤 */
const filters = {
  // 设备管理-start
  // 联网状态
  isOnline (isOnline) {
    switch (isOnline) {
      case '0':
        return '离线'
      case '1':
        return '在线'
      default:
        return ''
    }
  },
  // 申请来源
  applySourceId (applySourceId) {
    switch (applySourceId) {
      case 1:
        return '优尼斯金融'
      case 2:
        return '优尼斯3C'
      case 3:
        return '优尼斯工业'
      case 4:
        return '云科自有'
      case 5:
        return '研究院'
      case 6:
        return '其他'
      default:
        return ''
    }
  },
  // 状态
  operation (operation) {
    switch (operation) {
      case 1:
        return '立即开通'
      case 2:
        return '稍后开通'
      case 3:
        return '冻结'
      default:
        return ''
    }
  },
  // 获取方式
  useType (useType) {
    switch (useType) {
      case '1':
        return '自有'
      case '2':
        return '租赁'
      default:
        return ''
    }
  }
  // // 设备管理-end
}

export default filters
