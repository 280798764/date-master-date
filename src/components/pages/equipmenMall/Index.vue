<template>
  <section class="wrapper-box">
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span>设备小类管理</span>
    </div>
    <!--过滤条件-->
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>品牌</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.brandCode" filterable clearable>
              <Option v-for="item in brandList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label>设备大类名称</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.mainTypeCode" filterable clearable>
              <Option v-for="item in iboxMainTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{ item.mainTypeName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label class="app-name-dev special-first">设备小类名称</label><input type="text" v-model="params.name">
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
      <span>设备小类列表</span>
    </div>
    <section class="table-wrapper">
      <section class="list-wrapper custom-scroll scroll">
        <custom-table :thead="thead" :tbody="tbody" :scroll="true">
          <template slot="item" slot-scope="props">
            <td><div>{{props.item.typeCode}}</div></td>
            <td><div>{{props.item.typeName}}</div></td>
            <td><div>{{props.item.mainTypeName}}</div></td>
            <td><div>{{props.item.brandName}}</div></td>
            <td><div>{{props.item.descript}}</div></td>
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
          </div>
          <Page :total="pageInfo.totalElements" :page-size="10" :current="pageInfoReq.page + 1" @on-change="changepage" class="Page"/>
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
const thead = ['小类CODE', '设备小类名称', '设备大类名称', '品牌', '描述', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      pageNo: 1,
      thead: thead,
      tbody: [],
      cmd: 'a:equipmenMall/getIboxTypeList',
      deleteParams: {},
      params: {
        brandCode: '', // 品牌
        mainTypeCode: '', // 大类code
        name: '' // 名称
      },
      brandList: [], // 品牌
      iboxMainTypeList: [] // 设备大类名称
    }
  },
  mounted () {
    this.getBrandList()
    this.getIboxMainTypeList()
    this.getTableList(this.cmd, this.params)
  },
  methods: {
    // 删除
    deleteMachineById (id) {
      this.deleteParams.typeId = id
      this.$Modal.confirm({
        title: '提示',
        content: `确认删除【ID：${id}】的设备大类吗?`,
        onOk: () => {
          this.$store.dispatch('a:equipmenMall/deleteIboxType', this.deleteParams).then(
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
    // 编辑/新建
    edit (type, id) {
      this.$router.push('/equipmenMall/detail')
      sessionStorage.setItem('editType', type)
      if (type === 'edit') {
        sessionStorage.setItem('editId', JSON.stringify(id))
      } else {
        sessionStorage.setItem('editId', JSON.stringify(''))
      }
      sessionStorage.setItem('backParams', JSON.stringify(this.params))
      sessionStorage.setItem('savePageStart', this.pageInfoReq.page)
    },
    // 查询
    searchTab () {
      this.pageInfoReq.page = 0
      this.getTableList(this.cmd, this.params)
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
    // 获取大类名称
    getIboxMainTypeList () {
      this.$store.dispatch('a:equipmenMall/getIboxMainTypeListNoPage', {}).then(
        res => {
          this.iboxMainTypeList = res || []
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
