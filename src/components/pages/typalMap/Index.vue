/* 这里是页面备注 */
<template>
  <section class="wrapper-box">
    <div class="wrap">
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>地图类别管理</span>
      </div>
      <!--过滤条件-->
      <section class="filter-wrapper" @keyup.enter="searchTab">
        <div class="filter-line">
          <label class="app-name-dev special-first">名称</label>
          <input type="text" v-model="params.typeName">
          <div class="func-btns-wrapper search-reset">
            <div class="func-btn btn-search" @click="searchTab"><i class="iconfont icon-icon-btn-search"></i>查询</div>
          </div>
        </div>
      </section>
      <section class="func-btns-wrapper">
        <div class="func-btn btn-create" @click="edit('create')">新建</div>
      </section >
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>地图类别列表</span>
      </div>
      <section class="table-wrapper">
        <section class="list-wrapper custom-scroll scroll">
          <custom-table :thead="thead" :tbody="tbody" :scroll="true">
            <template slot="item" slot-scope="props">
              <!--<td><div class="icon"><img class="imgIcon" :src="props.item.icon + '?imageView2/1/w/105/h/60'"></div></td>-->
              <td><div>{{props.item.id}}</div></td>
              <td><div>{{props.item.typeName}}</div></td>
              <td class="operations-td wid-100px">
                <div class="operations flex-center">
                  <div class="btn btn-detail" @click.stop="edit('edit', props.item.id)">编辑</div>
                  <div class="btn btn-delete" @click.stop="deleteMachineById(props.item.id)">删除</div>
                </div>
              </td>
            </template>
          </custom-table>
          <div style="margin: 20px auto" class="pageStyle">
            <!--<div class="left">
              <span>跳转至</span>
              <input type="text" v-model.trim="pageNo" v-on:blur="jumpTo" v-on:keyup.enter="jumpTo">
              <span>页</span>
            </div>-->
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
const thead = ['id', '地图类别名称', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      pageNo: '',
      cmd: 'a:typalMap/getMapTypeList',
      params: {
        typeName: ''
      },
      brandList: [], // 品牌
      mainTypeListNoPage: [], // 大类
      machineTypeByMainCode: [], // 设备类型
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
      this.$router.push('/typalMap/detail')
      sessionStorage.setItem('editType', type)
      if (type === 'edit') {
        sessionStorage.setItem('editId', JSON.stringify(id))
      } else {
        sessionStorage.setItem('editId', JSON.stringify(''))
      }
    },
    obtainType (code) {
      let obtainArr = this.machineObtainType.filter(item => {
        return item.code === code
      })
      return obtainArr[0].name
    },
    // 删除
    deleteMachineById (id) {
      this.deleteParams.id = id
      this.$Modal.confirm({
        title: '提示',
        content: `确认删除【序列号：${id}】的设备吗?`,
        onOk: () => {
          this.$store.dispatch('a:typalMap/deleteMapType', this.deleteParams).then(
            res => {
              if (res.success) {
                this.getTableList(this.cmd, this.params)
              } else {
                this.alert(res.msg, 'error')
              }
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
