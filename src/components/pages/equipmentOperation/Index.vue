<template>
  <section class="wrapper-box">
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>设备操作记录</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>操作日期</label>
        <div class="select-wrapper">
          <Row>
            <Col span="12">
              <DatePicker type="daterange" placement="bottom-end" placeholder="开始-结束日期" style="width: 220px"></DatePicker>
            </Col>
          </Row>
        </div>
        <label>变更来源</label>
        <div class="select-wrapper">
           <Row>
             <Col span="40" style="padding-right:10px">
             <Select v-model="params.resource" filterable clearable>
               <Option v-for="item in resourceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
             </Select>
             </Col>
           </Row>
        </div>
        <label class="app-name-dev special-first">设备序列号</label><input type="text" v-model="params.mtNo" placeholder="单独输入设备序列号会有对比颜色">
      </div>
     <div class="filter-line">
        <label>所有权</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.propertyId" filterable clearable>
              <Option v-for="item in uses" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
       <label>使用权</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.userId" filterable clearable>
              <Option v-for="item in uses" :value="item.facId" :key="item.facId">{{ item.facName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
       <label class="app-name-dev special-first">MAC</label><input type="text" v-model="params.mac">
      </div>
      <div class="filter-line">
        <label class="app-name-dev special-first">加密狗</label><input type="text" v-model="params.uKey">
        <label>获取类型</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.useType" filterable clearable>
              <Option v-for="item in useTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label>是否上线</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.isOnLine" filterable clearable>
              <Option v-for="item in onlineList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <div class="func-btns-wrapper search-reset">
          <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
        </div>
      </div>
    </section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>操作记录列表</span>
    </div>
    <section class="table-wrapper">
      <section class="list-wrapper custom-scroll scroll">
        <custom-table :thead="thead" :tbody="tbody" :scroll="true">
          <template slot="item" slot-scope="props">
            <td><div>{{props.item.leaveDate}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.mainTypeName}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.typeName}}</div></td>
            <td><div>{{props.item.mtNo}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.propertyIdVal}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.useIdVal}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.mac}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.uKey}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.initTime}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.useType === '1' ? '自有' : props.item.useType === '2' ? '租赁' : props.item.useType === '3' ? '产能交易' : ''}}</div></td>
            <td><div :class="{redColor: props.item.mainTypeNameFlag === '1'}">{{props.item.isOnline === '1' ? '是' : '否'}}</div></td>
            <td><div>{{props.item.createtime}}</div></td>
            <td><div>{{props.item.operationTypeVal}}</div></td>
            <td><div>{{props.item.operationTypeResource}}</div></td>
            <td><div>{{props.item.createorVal}}</div></td>
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
      </section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
const thead = ['注册日期', '大类', '类别', '设备序列号', '所有权', '使用权', 'MAC', '加密狗', '初始化日期', '获取类型', '是否上线', '操作时间', '操作类型', '变更来源', '操作人']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      cmd: 'a:equipmentOperation/getHistoryList',
      pageInfo: '',
      pageNo: '',
      tbody: [],
      thead: thead,
      params: {
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        resource: '', // 变更来源
        mtNo: '', // 设备序列号
        propertyId: '', // 所有权ID
        userId: '', // 使用权ID
        mac: '', // mac
        uKey: '', // 加密狗
        useType: '', // 获取类型
        isOnLine: '' // 是否在线
      },
      brandList: [], // 品牌
      resourceList: [], // 变更来源
      useTypeList: [], // 获取类型
      onlineList: [], // 是否在线
      uses: [] // 使用权
    }
  },
  mounted () {
    this.getBrandList()
    this.getTableList(this.cmd, this.params)
    this.getResourceList()
    this.getUseTypeList()
    this.getFacNameAndId()
    this.getResourceList()
    this.getOnlineList()
  },
  methods: {
    // 是否在线
    getOnlineList () {
      this.$store.dispatch('a:equipmentOperation/getOnlineList', {}).then(
        res => {
          this.onlineList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取变更来源
    getResourceList () {
      this.$store.dispatch('a:equipmentOperation/getResourceList', {}).then(
        res => {
          this.resourceList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取类型
    getUseTypeList () {
      this.$store.dispatch('a:equipmentOperation/getUseTypeList', {}).then(
        res => {
          this.useTypeList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 所有权/使用权
    getFacNameAndId () {
      this.$store.dispatch('a:equipmentOperation/getFacNameAndId', {}).then(
        res => {
          this.uses = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    brandFun (code) {
      let brand = this.brandList.filter(item => {
        return item.code === code
      })
      return brand[0].name
    },
    searchTab () {
      this.getTableList(this.cmd, this.params)
    },
    // 编辑/新建
    edit (type, id) {
      this.$router.push('/systemBig/detail')
      sessionStorage.setItem('editId', JSON.stringify(id))
      sessionStorage.setItem('editType', type)
    },
    deleteMachineById () {},
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
        this.getTableList(this.cmd, this.params)
      }
    },
    changepage (index) {
      this.pageInfoReq.page = index - 1
      this.getTableList(this.cmd, this.params)
      this.pageNo = index
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
