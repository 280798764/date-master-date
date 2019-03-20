/* 这里是页面备注 */
<template>
  <section class="wrapper-box">
    <div class="wrap">
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>设备管理</span>
      </div>
      <!--过滤条件-->
      <section class="filter-wrapper" @keyup.enter="searchTab">
        <div class="filter-line">
          <label>品牌</label>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="params.brand" filterable clearable>
                <Option v-for="item in brandList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
          <label>系统大类</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.mainTypeCode" @on-change="getMallSys">
              <Option v-for="item in mainTypeListNoPage" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>系统小类</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.symgMachineTypeId">
              <Option v-for="item in machineTypeByMainCode" :value="item.symgMachineTypeId" :key="item.symgMachineTypeId">{{item.symgMtName}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">设备序列号</label>
          <input type="text" v-model="params.symgMSerialNo">
          <label>设备大类</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.iboxMainTypeCode" @on-change="getMallEqu">
              <Option v-for="item in iboxMainTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>设备小类</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.iboxTypeId">
              <Option v-for="item in iboxTypeList" :value="item.typeId" :key="item.typeId">{{item.typeName}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label>设备制造商</label>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="params.madeFactoryId" filterable clearable>
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
          <label>所有权</label>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="params.orgNameId" filterable clearable>
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
          <label>使用权</label>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="params.userNameId" filterable clearable>
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">MAC</label><input type="text" v-model="params.mac">
          <label class="app-name-dev special-first">UKEY</label><input type="text" v-model="params.uKey">
          <label>获取途径</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.haveType">
              <Option v-for="item in machineObtainType" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label>iport类型</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.iportType">
              <Option v-for="item in iportNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>vpn更新</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.vpnType">
              <Option v-for="item in vpnNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>是否上线</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.isOnline">
              <Option v-for="item in isOnlineNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <div class="func-btns-wrapper search-reset">
            <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
          </div>
        </div>
      </section>
      <section class="func-btns-wrapper">
        <div class="func-btn btn-create iconfont icon-daoru" @click="beforeUploadFile">批量导入</div>
        <input class="hidden" type="file" id="uploadFileList" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        <div class="func-btn btn-create iconfont icon-chushihualiuchengshitu" @click="initParamsConfig">初始化</div>
        <div class="func-btn btn-create iconfont icon-icon-btn-create" @click="edit('create')">新建</div>
      </section >
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>设备列表</span>
      </div>
      <section class="table-wrapper">
        <section class="list-wrapper custom-scroll scroll">
          <custom-table-checkbox :thead="thead" :tbody="tbody" :scroll="true" :selectAll="selectAllFlag" @selectRecord="selectRecord" @selectAllRecord="selectAllRecord">
            <template slot="item" slot-scope="props">
              <td class="wid-30px"><div><custom-radio-for-table :radioChecked="props.item.selected" @clickRadio="selectRecord(props.item)" style="margin-top: 12px;"></custom-radio-for-table></div></td>
              <td><div>{{props.item.genreName}}</div></td>
              <td><div>{{props.item.typeName}}</div></td>
              <td><div>{{props.item.iboxMainTypeName}}</div></td>
              <td><div>{{props.item.iboxTypeName}}</div></td>
              <td><div>{{props.item.equserialno}}</div></td>
              <td><div>{{props.item.madeFactoryName}}</div></td>
              <td><div>{{props.item.brandName}}</div></td>
              <td><div>{{props.item.propertyName}}</div></td>
              <td><div>{{props.item.userName}}</div></td>
              <td><div>{{props.item.mac}}</div></td>
              <td><div>{{props.item.uKey}}</div></td>
              <td><div>{{props.item.PASSWORDFORSEAFILE}}</div></td>
              <td><div>{{obtainType(props.item.userType)}}</div></td>
              <td><div>{{props.item.iportType === 'stable' ? '稳定版' : props.item.iportType === 'beta' ? '测试版' : ''}}</div></td>
              <td><div>{{props.item.vpnType === 'stable' ? '稳定版' : props.item.vpnType === 'beta' ? '测试版' : ''}}</div></td>
              <td><div>{{props.item.isOnline === '1' ? '是' : '否'}}</div></td>
              <td><div>{{props.item.initTime}}</div></td>
              <td><div>{{props.item.leaveDate}}</div></td>
              <td class="operations-td wid-100px">
                <div class="operations flex-center">
                  <div class="btn btn-detail" @click.stop="initSeafile(props.item.equserialno)">初始seafile</div>
                  <div class="btn btn-detail" @click.stop="initLdapUser(props.item.equserialno)">初始Ldap</div>
                  <div class="btn btn-detail" @click.stop="edit('edit', props.item.equId)">编辑</div>
                  <div class="btn btn-delete" @click.stop="deleteMachineById(props.item.equId, props.item.serNo, props.item.equserialno)">删除</div>
                </div>
              </td>
            </template>
          </custom-table-checkbox>
          <div style="margin: 20px auto" class="pageStyle">
            <Page :total="pageInfo.totalElements" :page-size="10" :current="pageInfoReq.page + 1" @on-change="changepage" class="Page"/>
            <div class="total-pages">
              <span>共</span>
              <span class="count">{{pageInfo.totalPages}}</span>
              <span>页</span>
            </div>
          </div>
        </section>
      </section>
    </div>
    <dialog-list v-if="dlgInfo.showDlg" :dlgInfo="dlgInfo" :params="params" :diffList="diffList" :upFile="upFile" :search="search" @cancel="dlgInfo.showDlg = false" :uploadFileToCloud="uploadFileToCloud"></dialog-list>
  </section>
</template>

<script>
import dialogList from './DialogList.vue'
import mixinsTable from '@/utils/mixinsTable'
// import mixinsInfo from '@/utils/mixinsInfo'
import { DOMAIN } from '@/utils/config'
const thead = ['系统大类', '系统小类', '设备大类', '设备小类', '序列号', '设备制造商', '品牌', '所有权', '使用权', 'MAC', 'UKEY', '设备密码', '获取类型', 'iport类型', 'vpn更新', '是否上线', '最新初始化时间', '注册时间', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      dlgInfo: { // 弹框信息
        showDlg: false,
        type: ''
      },
      selectAllFlag: false, // 单选按钮（全选）
      pageNo: 1,
      cmd: 'a:device/getMachineList',
      params: {
        brand: '',
        haveType: '',
        iportType: '',
        isOnline: '',
        mac: '',
        mainTypeCode: '',
        orgNameId: '',
        symgMSerialNo: '',
        symgMachineTypeId: '',
        uKey: '',
        userNameId: '',
        vpnType: ''
      },
      brandList: [], // 品牌
      mainTypeListNoPage: [], // 系统大类
      machineTypeByMainCode: [], // 系统小类
      iboxMainTypeList: [], // 设备大类
      iboxTypeList: [], // 设备小类
      machineObtainType: [], // 获取途径
      factory: [], // 设备制造商/使用权/所有权
      thead: thead,
      tbody: [],
      iportNewList: [ //  //iport类型列表
        {id: 'stable', name: '稳定版'},
        {id: 'beta', name: '测试版'}
      ],
      vpnNewList: [ // vpn类型列表
        {id: 'stable', name: '稳定版'},
        {id: 'beta', name: '测试版'}
      ],
      isOnlineNewList: [ // 是否上线列表
        {id: '1', name: '是'},
        {id: '0', name: '否'}
      ],
      deleteParams: {
        equId: '',
        serNo: ''
      },
      // 上传的文件
      upFile: {},
      // 上传检验不一样的数组
      diffrentList: [],
      modal1: false,
      diffList: []
    }
  },
  components: {
    dialogList
  },
  mounted () {
    this.get()
    this.getTableList(this.cmd, this.params)
    // this.getMachineList()
    this.getBrandList()
    this.getMainTypeListNoPage()
    this.getMachineTypeByMainCode(this.params.mainTypeCode)
    this.getMachineObtainType()
    this.getIboxMainTypeList()
    this.getIboxTypeList(this.params.iboxMainTypeCode)
    this.getFacNameAndId()
  },
  methods: {
    // 系统大类联动系统小类
    getMallSys () {
      this.params.symgMachineTypeId = ''
      this.getMachineTypeByMainCode(this.params.mainTypeCode)
    },
    // 设备大类联动设备小类
    getMallEqu () {
      this.params.iboxTypeId = ''
      this.getIboxTypeList(this.params.iboxMainTypeCode)
    },
    search () {
      this.getTableList(this.cmd, this.params)
    },
    // 选择记录
    selectRecord (item) {
      // 排除undefind的场合
      if (item.selected || item.selected === false) item.selected = !item.selected
      this.$forceUpdate()
    },
    // 全选或者全不选
    selectAllRecord (flag) {
      this.selectAllFlag = !flag
      this.tbody.forEach(item => {
        item.selected = this.selectAllFlag
      })
    },
    // 初始化
    initParamsConfig () {
      let list = this.tbody.map(item => {
        if (item.selected === true) {
          return item.equserialno
        }
      })
      let list2 = list.filter(item => {
        return item !== undefined
      })
      if (list2.length) {
        this.$store.dispatch('a:device/initParamsConfig', {list: list2}).then(
          res => {
            this.alert('初始化成功!', 'success')
            this.getTableList(this.cmd, this.params)
          },
          rej => {
            this.alert(rej.errorInfo, 'error')
          }
        )
      } else {
        this.alert('请选择需要初始化的数据！', 'info')
      }
      this.selectAllFlag = false
    },
    // 初始化ldap
    initLdapUser (equserialno) {
      this.$store.dispatch('a:device/initLdapUser', {serNo: equserialno}).then(
        res => {
          this.alert('初始化Ldap成功!', 'success')
          this.getTableList(this.cmd, this.params)
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 文件上传之前对比判断
    beforeUploadFile () {
      this.uploadFile()
    },
    // 文件上传事件
    uploadFile () {
      let cmd = DOMAIN.uploadPath + '/imedataapi/isMtExists'
      document.getElementById('uploadFileList').value = ''
      document.getElementById('uploadFileList').click()
      document.getElementById('uploadFileList').onchange = e => {
        let file = e.target.files && e.target.files[0]
        let fileType = file.name && file.name.substring(file.name.lastIndexOf('.'))
        if (file === '' || file === null) {
          this.alert('请选择所要上传的文件！', 'info')
        } else if (fileType !== '.xls' && fileType !== '.xlsx') {
          this.alert('上传文件格式不正确!', 'info')
        } else {
          this.upFile = file
          this.uploadFileToCloud(true, file, cmd)
        }
      }
    },
    sureUpload () {
      this.uploadFileToCloud(false, this.upFile, DOMAIN.uploadPath + '/imedataapi/importMtToData')
    },
    // 文件上传到云
    uploadFileToCloud (isOnce, file, cmd) {
      this.$store.dispatch('a:file/fileUpload', {file, cmd}).then(
        res => {
          if (isOnce) {
            if (res.list.length === 0) {
              this.uploadFileToCloud(false, this.upFile, DOMAIN.uploadPath + '/imedataapi/importMtToData')
            } else {
              this.diffList = res.list
              this.dlgInfo.showDlg = true
            }
          } else {
            this.alert('上传成功！', 'success')
            this.dlgInfo.showDlg = false
            this.getTableList(this.cmd, this.params)
          }
        },
        rej => {
          this.$Modal.error({
            title: '错误',
            content: rej
          })
        }
      )
    },
    // 初始化seafile
    initSeafile (equserialno) {
      this.$store.dispatch('a:device/initToken', {serNo: equserialno}).then(
        res => {
          this.alert('初始化seafile成功!', 'success')
          this.getTableList(this.cmd, this.params)
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 查询
    searchTab () {
      this.pageInfoReq.page = 0
      this.getTableList(this.cmd, this.params)
    },
    jumpTo () {
      this.pageChange()
    },
    pageChange () {
      let pages = Math.ceil(this.pageInfo.totalCount / 10)
      if (this.pageNo > pages || this.pageNo <= 0) {
        this.alert('请输入正确的页码！', 'error')
      } else {
        this.pageInfoReq.page = this.pageNo
        this.pageInfo.page = +this.pageNo
        this.getTableList(this.cmd, this.params, this.pageInfoReq)
      }
    },
    changepage (index) {
      this.pageInfoReq.page = index - 1
      this.getTableList(this.cmd, this.params, this.pageInfoReq)
      this.pageNo = index
    },
    // 编辑/新建
    edit (type, id) {
      if (type === 'create') {
        sessionStorage.setItem('editId', '')
      } else {
        sessionStorage.setItem('editId', id)
      }
      this.$router.push('/device/detail')
      sessionStorage.setItem('editType', type)
      sessionStorage.setItem('backParams', JSON.stringify(this.params))
      sessionStorage.setItem('savePageStart', this.pageInfoReq.page)
    },
    obtainType (code) {
      let obtainArr = this.machineObtainType.filter(item => {
        return item.code === code
      })
      return obtainArr[0].name
    },
    // 删除
    deleteMachineById (equId, serNo, equserialno) {
      this.deleteParams.eduId = equId
      this.deleteParams.serNo = equserialno
      this.$Modal.confirm({
        title: '提示',
        content: `确认删除【序列号：${equserialno}】的设备吗?`,
        onOk: () => {
          this.$store.dispatch('a:device/deleteMachineById', this.deleteParams).then(
            res => {
              this.alert('删除成功！', 'success')
              this.getTableList(this.cmd, this.params)
            },
            rej => {
              this.alert(rej.errorInfo, 'error')
            }
          )
        }
      })
    },
    // 获取
    get () {
      this.$store.dispatch('a:device/getMachineType', {}).then(
        res => {
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取品牌
    getBrandList () {
      this.$store.dispatch('a:device/getBrandList', {}).then(
        res => {
          this.brandList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 设备大类
    getIboxMainTypeList () {
      this.$store.dispatch('a:device/getIboxMainTypeList', {}).then(
        res => {
          this.iboxMainTypeList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 设备小类
    getIboxTypeList (iboxMainTypeCode) {
      this.$store.dispatch('a:device/getIboxTypeList', {iboxMainTypeCode: iboxMainTypeCode}).then(
        res => {
          this.iboxTypeList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取系统大类
    getMainTypeListNoPage () {
      this.$store.dispatch('a:device/getMainTypeListNoPage', {}).then(
        res => {
          this.mainTypeListNoPage = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取系统小类
    getMachineTypeByMainCode (mainTypeCode) {
      this.$store.dispatch('a:device/getMachineTypeByMainCode', {mainTypeCode: mainTypeCode}).then(
        res => {
          this.machineTypeByMainCode = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取途径
    getMachineObtainType () {
      this.$store.dispatch('a:device/getMachineObtainType', {}).then(
        res => {
          this.machineObtainType = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取设备制造商/使用权/所有权
    getFacNameAndId () {
      this.$store.dispatch('a:device/getFacNameAndId', {}).then(
        res => {
          this.factory = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取设备列表
    getMachineList () {
      this.$store.dispatch('a:device/getMachineList', {}).then(
        res => {
          this.tbody = res.content || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/device/Index.less';
  .right {
    color: red;
  }
  .filter-line input , .select-wrapper{
    width: 210px;
  }
  .btn-detail {
    margin-right: 10px;
  }
  .list-wrapper {
    margin-top: 0;
    border: none;
  }
  .func-btns-wrapper {
    margin-bottom: 10px;
  }
  .hidden {
    display: none;
  }
</style>
