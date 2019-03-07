<template>
  <section class="wrapper-box">
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>系统小类管理</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper">
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
        <label>大类</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.mtClass" filterable clearable>
              <Option v-for="item in machineTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{ item.mainTypeName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label class="app-name-dev special-first">类别名称</label><input type="text" v-model="params.mtName">
      </div>
      <div class="filter-line">
        <label>地图类别名称</label>
        <div class="select-wrapper">
           <Row>
             <Col span="40" style="padding-right:10px">
             <Select v-model="params.bigmapTypeId" filterable clearable>
               <Option v-for="item in mapList" :value="item.id" :key="item.id">{{ item.typeName }}</Option>
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
      <span>设备小类列表</span>
    </div>
    <section class="table-wrapper">
      <section class="list-wrapper custom-scroll scroll">
        <custom-table :thead="thead" :tbody="tbody" :scroll="true">
          <template slot="item" slot-scope="props">
            <td><div>{{props.item.typeCode}}</div></td>
            <td><div>{{props.item.typeName}}</div></td>
            <td><div>{{props.item.mainTypeName}}</div></td>
            <td><div>{{props.item.mapTypeName}}</div></td>
            <td><div>{{props.item.vdpParams}}</div></td>
            <td><div>{{props.item.vdpService}}</div></td>
            <td><div>{{props.item.vdpShow}}</div></td>
            <td><div>{{props.item.simpleDescription}}</div></td>
            <td><div>{{props.item.description}}</div></td>
            <td class="operations-td wid-100px">
              <div class="operations flex-center">
                <div class="btn btn-detail" @click.stop="edit('edit', props.item.typeId)">编辑</div>
                <div class="btn btn-delete" @click.stop="deleteMachineById(props.item.typeId)">删除</div>
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
      </section>
    </section>
  </section>
</template>

<script>
import mixinsTable from '@/utils/mixinsTable'
const thead = ['小类CODE', '类别名称', '大类', '地图类别名称', '参数集', '服务', '展示界面', '简述', '描述', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      cmd: 'a:systemMall/getTypeList',
      pageInfo: '',
      pageNo: '',
      tbody: [],
      thead: thead,
      params: {
        brand: '', // 品牌
        mtClass: '', // 大类
        mtName: '', // 类别名称
        bigmapTypeId: '' // 地图类别
      },
      brandList: [], // 品牌
      machineTypeList: [], // 大类
      mapList: [] // 地图类别
    }
  },
  mounted () {
    this.getBrandList()
    this.getMachineType()
    this.getMapList()
    this.getTableList(this.cmd, this.params)
  },
  methods: {
    brandFun (code) {
      let brand = this.brandList.filter(item => {
        return item.code === code
      })
      return brand[0].name
    },
    // 查询
    searchTab () {
      this.pageInfoReq.page = 0
      this.getTableList(this.cmd, this.params)
    },
    // 编辑/新建
    edit (type, id) {
      this.$router.push('/systemMall/detail')
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
        this.getTableList(this.cmd, this.params, this.pageInfoReq)
      }
    },
    changepage (index) {
      this.pageInfoReq.page = index
      this.getTableList(this.cmd, this.params, this.pageInfoReq)
      this.pageNo = index
    },
    // 获取品牌
    getBrandList () {
      this.$store.dispatch('a:equipmenMall/getBrandList', {}).then(
        res => {
          this.brandList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取大类
    getMachineType () {
      this.$store.dispatch('a:equipmenMall/getMachineType', {}).then(
        res => {
          this.machineTypeList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 获取地图类别
    getMapList () {
      this.$store.dispatch('a:equipmenMall/getMapList', {}).then(
        res => {
          this.mapList = res || []
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
