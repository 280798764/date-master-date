/* 这里是页面备注 */
<template>
  <section>
    <div class="wrap">
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>设备编辑</span>
      </div>
      <!--过滤条件-->
      <section class="filter-wrapper" @keyup.enter="searchTab">
        <div class="filter-line">
          <label>序列号</label>
          <span class="require">*</span>
          <input type="text" v-if="detailInfo.equserialno" v-model.trim="detailInfo.equserialno" readonly>
          <input type="text" v-else v-model.trim="detailInfo.equserialno">
          <label>设备大类</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.mainTypeCode">
              <Option v-for="item in mainTypeListNoPage" :value="item.mainTypeCode" :key="item.mainTypeCode">{{item.mainTypeName}}</Option>
            </Select>
          </div>
          <label>设备类别</label>
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
          <label class="app-name-dev special-first">MAC</label>
          <span class="require">*</span>
          <input type="text" v-model.trim="detailInfo.mac">
          <label class="app-name-dev special-first">UKEY</label>
          <span class="require">*</span>
          <input type="text"  v-model.trim="detailInfo.uKey">
        </div>
        <div class="filter-line">
          <label>所有权</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.propertyId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
          </div>
          <label>使用权</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.propertyId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
          </div>
          <label class="app-name-dev special-first">AGENT KEY</label><span class="require">*</span><input type="text" v-model.trim="detailInfo.agentKey">
        </div>
        <div class="filter-line">
          <label>获取途径</label>
          <span class="require">*</span>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.userType">
              <Option v-for="item in machineObtainType" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
          </div>
          <label>设备制造商</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.madeFactoryId">
              <Option v-for="item in factory" :value="item.facId" :key="item.facId">{{item.facName}}</Option>
            </Select>
          </div>
          <label class="app-name-dev special-first">规格</label><input type="text"  v-model.trim="detailInfo.specification">

        </div>
        <div class="filter-line">
          <label>iport类型</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.iportType">
              <Option v-for="item in iportNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>vpn更新</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.vpnType">
              <Option v-for="item in vpnNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <!--<label class="app-name-dev special-first">设置图片</label><input type="text"  v-model.trim="detailInfo.specification">-->
        </div>
        <div class="filter-line">
          <label>是否上线</label>
          <div class="select-wrapper">
            <Select clearable v-model="detailInfo.isOnline">
              <Option v-for="item in isOnlineNewList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">初始化报文</label><input class="checkbox" type="checkbox" checked>
        </div>
        <!-- 底部功能按钮 -->
        <section class="btns-group">
          <div class="btn btn-gray" v-if="this.inTotype === 'create'" @click="save">保存</div>
          <div class="btn btn-gray" v-if="this.inTotype === 'edit'" @click="edit">修改</div>
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
      inTotype: '',
      params: {
        eduId: ''
      },
      brandList: [], // 品牌
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

      }
    }
  },
  mounted () {
    this.getBrandList()
    this.getMainTypeListNoPage()
    this.getMachineTypeByMainCode()
    this.getMachineObtainType()
    this.getFacNameAndId()
    this.params.eduId = sessionStorage.getItem('editId')
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    searchTab () {

    },
    edit () {
      this.$store.dispatch('a:device/updateMachineById', this.detailInfo).then(
        res => {
          this.$router.push('/device/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    save () {
      this.$store.dispatch('a:device/saveMachine', this.detailInfo).then(
        res => {
          this.$router.push('/device/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    detail () {
      this.$store.dispatch('a:device/getMachineById', this.params).then(
        res => {
          this.detailInfo = res || {}
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
</style>
