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
            <Select clearable v-model="params.mainTypeCode">
              <Option v-for="item in mainTypeListNoPage" :value="item.id" :key="item.id">{{item.mainTypeName}}</Option>
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
            <Select clearable v-model="params.mainTypeCode">
              <Option v-for="item in iboxMainTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>设备小类</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.symgMachineTypeId">
              <Option v-for="item in iboxTypeList" :value="item.typeId" :key="item.typeId">{{item.typeName}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">

          <label>设备制造商</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.madeFactoryId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
          </div>
          <label>所有权</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.orgNameId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
          </div>
          <label>使用权</label>
          <div class="select-wrapper">
            <Select clearable v-model="params.userNameId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
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
        <div class="func-btn btn-create" @click="createAccount('create')">批量导入</div>
        <div class="func-btn btn-create" @click="searchAccount('create')">初始化</div>
        <div class="func-btn btn-create" @click="edit('create')">新建</div>
      </section >
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>设备列表</span>
      </div>
      <section class="table-wrapper">
        <section class="list-wrapper custom-scroll scroll">
          <custom-table :thead="thead" :tbody="tbody" :scroll="true">
            <template slot="item" slot-scope="props">
              <!--<td><div class="icon"><img class="imgIcon" :src="props.item.icon + '?imageView2/1/w/105/h/60'"></div></td>-->
              <td><div>{{props.item.genreName}}</div></td>
              <td><div>{{props.item.typeName}}</div></td>
              <td><div>{{props.item.equserialno}}</div></td>
              <td><div>{{props.item.madeFactoryName}}</div></td>
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
                  <div class="btn btn-detail" @click.stop="readRecord(props.item.equId)">初始seafile</div>
                  <div class="btn btn-detail" @click.stop="readRecord(props.item.equId)">初始Ldap</div>
                  <div class="btn btn-detail" @click.stop="edit('edit', props.item.equId)">编辑</div>
                  <div class="btn btn-delete" @click.stop="deleteMachineById(props.item.equId, props.item.serNo, props.item.equserialno)">删除</div>
                </div>
              </td>
            </template>
          </custom-table>
          <div style="margin: 20px auto" class="pageStyle">
            <div class="left">
              <span>跳转至</span>
              <input type="text" v-model.trim="pageNo" v-on:blur="jumpTo" v-on:keyup.enter="jumpTo">
              <span>页</span>
            </div>
            <Page :total="pageInfo.totalElements" :page-size="10" :current="pageInfo.pageNo" @on-change="changepage" class="Page"/>
            <div class="total-pages">
              <span>共</span>
              <span class="count">{{pageInfo.totalPages}}</span>
              <span>页</span>
            </div>
          </div>
          <!--<pagination v-if="pageInfo.totalElements" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
        </section>
      </section>

    </div>
  </section>
</template>

<script>
// import dialogUpDown from './DialogUpDown.vue'
import mixinsTable from '@/utils/mixinsTable'
// import mixinsInfo from '@/utils/mixinsInfo'
// import { DOMAIN } from '@/utils/config'
const thead = ['大类', '小类', '序列号', '设备制造商', '所有权', '使用权', 'MAC', 'UKEY', '设备密码', '获取类型', 'iport类型', 'vpn更新', '是否上线', '最新初始化时间', '注册时间', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      pageNo: '',
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
      }
    }
  },
  mounted () {
    this.get()
    this.getTableList(this.cmd, this.params)
    // this.getMachineList()
    this.getBrandList()
    this.getMainTypeListNoPage()
    this.getMachineTypeByMainCode()
    this.getMachineObtainType()
    this.getIboxMainTypeList()
    this.getIboxTypeList()
    this.getFacNameAndId()
  },
  methods: {
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
      this.$router.push('/device/detail')
      sessionStorage.setItem('editId', id)
      sessionStorage.setItem('editType', type)
    },
    obtainType (code) {
      let obtainArr = this.machineObtainType.filter(item => {
        return item.code === code
      })
      return obtainArr[0].name
    },
    // 删除
    deleteMachineById (equId, serNo, equserialno) {
      this.deleteParams.equId = equId
      this.deleteParams.serNo = serNo
      this.$Modal.confirm({
        title: '提示',
        content: `确认删除【序列号：${equserialno}】的设备吗?`,
        onOk: () => {
        }
      })
      /* this.$store.dispatch('a:device/deleteMachineById', this.deleteParams).then(
        res => {
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      ) */
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
    getIboxTypeList () {
      this.$store.dispatch('a:device/getIboxTypeList', {}).then(
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
    getMachineTypeByMainCode () {
      this.$store.dispatch('a:device/getMachineTypeByMainCode', {}).then(
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
</style>
