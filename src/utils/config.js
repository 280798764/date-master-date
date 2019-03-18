/* oncall 项目地址（config示例） */
import tld from 'tldjs'

const HOST = window.location.host

const config = {
  'prod': {
    // 个性化后端域名
    service: '//service.isesol.com',
    // 产能旧版域名
    apiCN: '//cnservice.isesol.com',
    origin: '//imedata.isesol.com',
    api: '//api.isesol.com',
    // fileFTP: '//oncall.isesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/',
    uploadPath: '//imedata.isesol.com' // 上传文件 导入
  },
  'pre': {
    // 个性化后端域名
    service: '//service.preisesol.com',
    // 产能旧版域名
    apiCN: '//cnservice.preisesol.com',
    origin: '//imedata.preisesol.com',
    api: '//api.preisesol.com',
    // fileFTP: '//oncall.preisesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/',
    uploadPath: '//imedata.preisesol.com' // 上传文件 导入
  },
  'test': {
    // 个性化后端域名
    service: '//service.i5sesol.com',
    // 产能旧版域名
    apiCN: '//cnservice.i5sesol.com',
    origin: '//imedata.i5sesol.com',
    api: '//api.i5sesol.com',
    // fileFTP: '//oncall.i5sesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/',
    uploadPath: '//imedata.i5sesol.com' // 上传文件 导入
  },
  'dev': {
    // 个性化后端域名
    service: 'http://service.isesoldev.com',
    // 产能旧版域名
    apiCN: 'http://cnservice.isesoldev.com',
    origin: '//imedata.isesoldev.com',
    api: 'http://api.isesoldev.com',
    // fileFTP: '//oncall.isesoldev.com/oncallapi',
    qiNiu: '//upload.qiniu.com/',
    uploadPath: '//imedata.isesoldev.com' // 上传文件 导入
  }
}

// 获取域名
function createDomain (host) {
  let DOMAIN = {}
  let topDomain = tld.getDomain(host)
  // console.log('topDomain', topDomain)
  if (topDomain === 'isesol.com') {
    DOMAIN = config['prod']
  } else if (topDomain === 'preisesol.com') {
    DOMAIN = config['pre']
  } else if (topDomain === 'i5sesol.com') {
    DOMAIN = config['test']
  } else {
    DOMAIN = config['dev']
  }
  DOMAIN.tld = topDomain
  // DOMAIN.apiPath = DOMAIN.api + '/cgi'
  // 个性化后端接口
  DOMAIN.apiPathUncode = DOMAIN.service + '/B2C/services/invokeSrv/isesolService'
  // 个性化验证码获取
  DOMAIN.imgPath = DOMAIN.service + '/B2C/services/invokeSrv/verifyImage'
  // 标准CGI接口
  DOMAIN.apiPath = DOMAIN.api + '/cgi'
  // 产能旧版接口
  DOMAIN.apiCNOldPath = DOMAIN.apiCN + '/factorycenter/fcService'
  return DOMAIN
}

export const DOMAIN = createDomain(HOST)
export const TOKEN_NAME = 'token'
