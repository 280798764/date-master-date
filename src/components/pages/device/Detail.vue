
<template>
  <section>
    <div class="wrap">
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span v-if="inTotype === 'create'">设备新增</span>
        <span v-if="inTotype === 'edit'">设备编辑</span>
      </div>
      <!--过滤条件-->
      <section class="filter-wrapper" @keyup.enter="searchTab">
        <div class="filter-line">
          <label>序列号</label>
          <span class="require">*</span>
          <input type="text" v-if="this.params.eduId" v-model.trim="detailInfo.equserialno" readonly>
          <input type="text" v-else v-model.trim="detailInfo.equserialno">
          <label>系统大类</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.mainTypeCode" @on-change="getMallSys">
              <Option v-for="item in mainTypeListNoPage" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>系统小类</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.typeId">
              <Option v-for="item in machineTypeByMainCode" :value="item.symgMachineTypeId" :key="item.symgMachineTypeId">{{item.symgMtName}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label>设备名称</label>
          <span class="require">*</span>
          <input type="text" v-model.trim="detailInfo.machineName">
          <label>设备大类</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.iboxMainTypeCode" @on-change="getMallEqu">
              <Option v-for="item in iboxMainTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>设备小类</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.iboxTypeId">
              <Option v-for="item in iboxTypeList" :value="item.typeId" :key="item.typeId">{{item.typeName}}</Option>
            </Select>
          </div>

        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">MAC</label>
          <span class="require">*</span>
          <input type="text" v-model.trim="detailInfo.mac">
          <label class="app-name-dev special-first">UKEY</label>
          <span class="require">*</span>
          <input type="text"  v-model.trim="detailInfo.uKey">
          <label>所有权</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="detailInfo.propertyId" filterable clearable @on-change="changeProperty">
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div class="filter-line">
          <label>使用权</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="detailInfo.userId" filterable clearable @on-change="changeUserId">
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
          <label class="app-name-dev special-first">AGENT KEY</label><span class="require">*</span>
          <input type="text" v-model.trim="detailInfo.agentKey">
          <label>获取途径</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.userType">
              <Option v-for="item in machineObtainType" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">

          <label>设备制造商</label>
          <div class="select-wrapper">
            <Row>
              <Col span="40" style="padding-right:10px">
              <Select v-model="detailInfo.madeFactoryId" filterable clearable @on-change="setMadeFactory">
                <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
              </Select>
              </Col>
            </Row>
          </div>
          <label class="app-name-dev special-first">规格</label>
          <input type="text"  v-model.trim="detailInfo.specification">
          <label>iport类型</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.iportType">
              <Option v-for="item in iportNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>

        </div>
        <div class="filter-line">
          <label>vpn更新</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.vpnType">
              <Option v-for="item in vpnNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>设置图片</label>
          <div class="select-wrapper fileBox">
            <input type="text" class="fileUrl"  v-model.trim="detailInfo.imageUrl" readonly>
            <button class="uploadFile">上传</button>
            <input type="file" class="fileUp" title="点击上传" @change="getFile">
          </div>
          <label>是否上线</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.isOnline">
              <Option v-for="item in isOnlineNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </div>
        <div v-if="inTotype === 'edit'">
          <div class="filter-line" v-if=" detailInfo.proChangeTime || detailInfo.changeTime || showPropertyTime || showUserTime">
            <label v-if="detailInfo.proChangeTime || showPropertyTime" style=" margin-left: 20px">所有权变更时间</label>
            <div class="select-wrapper" v-if="detailInfo.proChangeTime || showPropertyTime">
              <Row>
                <Col span="12">
                <DatePicker
                  type="date"
                  placeholder="所有权变更时间"
                  :value="detailInfo.proChangeTime"
                  @on-change="changeTime2($event)"
                  style="width: 200px"></DatePicker>
                </Col>
              </Row>
            </div>
            <label style="margin-left: 20px" v-if="detailInfo.changeTime || showUserTime">使用权变更时间</label>
            <div class="select-wrapper" v-if="detailInfo.changeTime || showUserTime">
              <Row>
                <Col span="12">
                <DatePicker
                  type="date"
                  placeholder="使用权变更时间"
                  :value="detailInfo.changeTime"
                  @on-change="changeTime($event)"
                  style="width: 200px"></DatePicker>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">初始化报文</label>
          <input class="checkbox" type="checkbox" v-model="isInit">
        </div>
        <!-- 底部功能按钮 -->
        <section class="btns-group">
          <div class="btn btn-gray" @click="save">{{detailInfo.equId ? '修改' : '新增'}}</div>
          <!--<div class="btn btn-gray" v-if="this.inTotype === 'edit'" @click="edit">修改</div>-->
          <div class="btn btn-gray" @click="detail">取消</div>
          <div class="btn btn-gray" @click="backForward">返回</div>
        </section>
      </section>

    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isInit: true, // 初始化报文
      propertyId: '', // 所有权id
      userId: '', // 使用权id
      showUserTime: '', // 使用权变更时间是否显示
      showPropertyTime: '', // 所有权变更时间是否显示
      inTotype: '',
      params: {
        eduId: ''
      },
      brandList: [], // 品牌
      iboxMainTypeList: [], // 设备大类
      iboxTypeList: [], // 设备小类
      mainTypeListNoPage: [], // 大类
      machineTypeByMainCode: [], // 设备类型
      machineObtainType: [], // 获取途径
      factory: [], // 设备制造商/使用权/所有权
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
      detailInfo: { // 详情对象
        agentKey: '',
        changeTime: '',
        eduId: '',
        haveType: '',
        iboxTypeId: '',
        iportType: '',
        isOnline: '',
        mac: '',
        madeFactoryId: '',
        madeFactoryName: '',
        mainTypeCode: '',
        orgName: '',
        orgNameId: '',
        path: '',
        proChangeTime: '',
        specification: '',
        symgMSerialName: '',
        symgMSerialNo: '',
        symgMachineTypeId: '',
        uKey: '',
        userName: '',
        userNameId: '',
        vpnType: ''
      },
      editParams: {} // 编辑的参数
    }
  },
  mounted () {
    this.getIboxTypeList(this.detailInfo.iboxMainTypeCode)
    this.getBrandList()
    this.getMainTypeListNoPage()
    this.getMachineTypeByMainCode(this.detailInfo.mainTypeCode)
    this.getMachineObtainType()
    this.getFacNameAndId()
    this.getIboxMainTypeList()
    this.params.eduId = sessionStorage.getItem('editId')
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    // 系统大类联动系统小类
    getMallSys () {
      this.detailInfo.typeId = ''
      this.getMachineTypeByMainCode(this.detailInfo.mainTypeCode)
    },
    // 设备大类联动设备小类
    getMallEqu () {
      this.detailInfo.iboxTypeId = ''
      this.getIboxTypeList(this.detailInfo.iboxMainTypeCode)
    },
    // 上传图片
    // 拿取文件
    getFile (e) {
      let file = e.target.files[0]
      this.$store.dispatch('a:file/fileUploadToQiNiu', file).then(
        res => {
          this.detailInfo.imageUrl = res.downloadUrl
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 使用权变更时间
    changeTime (event) {
      this.detailInfo.changeTime = event
    },
    // 所有权变更时间
    changeTime2 (event) {
      this.detailInfo.proChangeTime = event
    },
    // 设备制造商
    setMadeFactory () {
      let arr = this.factory.filter(item => {
        return item.facId === this.detailInfo.madeFactoryId
      })
      this.detailInfo.madeFactoryName = arr[0].facName
    },
    // 改变使用权
    changeUserId () {
      let arr = this.factory.filter(item => {
        return item.facId === this.detailInfo.userId
      })
      this.detailInfo.userName = arr[0].facName
      if (this.detailInfo.userId !== this.userId) {
        this.showUserTime = true
      } else {
        this.showUserTime = false
      }
    },
    // 改变所有权
    changeProperty () {
      let arr = this.factory.filter(item => {
        return item.facId === this.detailInfo.propertyId
      })
      this.detailInfo.propertyName = arr[0].facName
      if (this.detailInfo.propertyId !== this.propertyId) {
        this.showPropertyTime = true
      } else {
        this.showPropertyTime = false
      }
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
    searchTab () {

    },
    // 校验是否为空
    empyt () {
      if (!this.detailInfo.equserialno) {
        this.alert('序列号不能为空！', 'error')
        return false
      } else if (!this.detailInfo.mainTypeCode) {
        this.alert('系统大类不能为空！', 'error')
        return false
      } else if (!this.detailInfo.typeId) {
        this.alert('系统小类不能为空！', 'error')
        return false
      } else if (!this.detailInfo.machineName) {
        this.alert('设备名称不能为空！', 'error')
        return false
      } else if (!this.detailInfo.iboxMainTypeCode) {
        this.alert('设备大类不能为空！', 'error')
        return false
      } else if (!this.detailInfo.iboxTypeId) {
        this.alert('设备小类不能为空！', 'error')
        return false
      } else if (!this.detailInfo.mac) {
        this.alert('MAC不能为空！', 'error')
        return false
      } else if (!this.detailInfo.uKey) {
        this.alert('UKEY不能为空！', 'error')
        return false
      } else if (!this.detailInfo.propertyId) {
        this.alert('所有权不能为空！', 'error')
        return false
      } else if (!this.detailInfo.userId) {
        this.alert('使用权不能为空！', 'error')
        return false
      } else if (!this.detailInfo.agentKey) {
        this.alert('AGENT KEY不能为空！', 'error')
        return false
      } else if (!this.detailInfo.userType) {
        this.alert('获取途径不能为空！', 'error')
        return false
      } else if (this.inTotype === 'edit' && this.detailInfo.userId !== this.userId && !this.detailInfo.changeTime) {
        this.alert('使用权变更时间不能为空！', 'error')
      } else if (this.inTotype === 'edit' && this.detailInfo.propertyId !== this.propertyId && !this.detailInfo.proChangeTime) {
        this.alert('所有权变更时间不能为空！', 'error')
      } else {
        return true
      }
    },
    // 新增、编辑
    save () {
      if (!this.empyt()) {
        return
      }
      let _iboxTypeId = this.detailInfo.iboxTypeId
      let _id = this.detailInfo.equId
      let _serialNo = this.detailInfo.equserialno
      let _mainTypeCode = this.detailInfo.mainTypeCode
      let _equTypeId = this.detailInfo.typeId
      let _machineName = this.detailInfo.machineName
      let _mac = this.detailInfo.mac
      let _ukey = this.detailInfo.uKey
      let _agentKey = this.detailInfo.agentKey
      let _propertyId = this.detailInfo.propertyId
      let _propertyName = this.detailInfo.propertyName
      let _userId = this.detailInfo.userId
      let _userName = this.detailInfo.userName
      let _userType = this.detailInfo.userType
      let _imgUrl = this.detailInfo.imageUrl
      let _specification = this.detailInfo.specification
      let _iportType = this.detailInfo.iportType
      let _vpnType = this.detailInfo.vpnType
      let _isOnline = this.detailInfo.isOnline
      let _changeTime = this.detailInfo.changeTime || ''
      let _proChangeTime = this.detailInfo.proChangeTime || ''
      let _madeFactoryId = this.detailInfo.madeFactoryId
      let _madeFactoryName = this.detailInfo.madeFactoryName
      let _iboxMainTypeCode = this.detailInfo.iboxMainTypeCode

      this.editParams = {
        iboxTypeId: _iboxTypeId,
        _iboxMainTypeCode: _iboxMainTypeCode,
        eduId: _id,
        agentKey: _agentKey,
        haveType: _userType,
        mac: _mac,
        mainTypeCode: _mainTypeCode,
        orgName: _propertyName,
        orgNameId: _propertyId,
        path: _imgUrl,
        symgMSerialName: _machineName,
        symgMSerialNo: _serialNo,
        symgMachineTypeId: _equTypeId,
        uKey: _ukey,
        userName: _userName,
        userNameId: _userId,
        specification: _specification,
        iportType: _iportType,
        vpnType: _vpnType,
        isOnline: _isOnline,
        changeTime: _changeTime,
        proChangeTime: _proChangeTime,
        madeFactoryId: _madeFactoryId,
        madeFactoryName: _madeFactoryName
      }
      if (!this.detailInfo.equId) {
        this.$store.dispatch('a:device/saveMachine', this.editParams).then(
          res => {
            this.$router.push('/device/index')
          },
          rej => {
            this.alert(rej.errorInfo, 'error')
          }
        )
      } else {
        this.$store.dispatch('a:device/updateMachineById', this.editParams).then(
          res => {
            this.$router.push('/device/index')
          },
          rej => {
            this.alert(rej.errorInfo, 'error')
          }
        )
      }
    },
    detail () {
      this.$store.dispatch('a:device/getMachineById', this.params).then(
        res => {
          this.detailInfo = res || {}
          this.userId = res.userId
          this.propertyId = res.propertyId
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/device/index')
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
    // 获取大类
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
    // 获取设备类型
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
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/device/Detail.less';
  .filter-line input , .select-wrapper{
    width: 210px;
  }
  .checkbox {
    width: 15px !important;
  }
  .uploadFile {
    position: absolute;
    right:-45px;
    top: 0;
    width: 40px;
    border-radius: 5px;
    height: 26px;
    line-height: 26px;
    background-color: #fabf40;
    border: none;
    color: #fff;
    margin-left: 30px;
  }
  .fileUp {
    position: absolute;
    right:-45px;
    top: 0;
    opacity: 0;
    width: 60px !important;
    overflow: hidden;
    cursor: pointer;
  }
  .fileBox {
    position: relative;
    .fileUrl {
      border: 1px solid #C9C9C9;
      border-radius: 3px;
      box-sizing: border-box;
      padding: 0 10px;
    }
  }
</style>
