<template>
<section class="wrapper-box">
  <div class="page-title-wrapper" >
    <span class="icon-title"></span>
    <span>设备大类管理</span>
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
      <label class="app-name-dev special-first">大类名称</label><input type="text" v-model="params.name">
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
    <span>设备大类列表</span>
  </div>
  <section class="table-wrapper">
    <section class="list-wrapper custom-scroll scroll">
      <custom-table :thead="thead" :tbody="tbody" :scroll="true">
        <template slot="item" slot-scope="props">
          <td><div>{{props.item.mainTypeCode}}</div></td>
          <td><div>{{props.item.mainTypeName}}</div></td>
          <td><div>{{props.item.brandName}}</div></td>
          <td><div>{{props.item.descript}}</div></td>
          <td class="operations-td wid-100px">
            <div class="operations flex-center">
              <div class="btn btn-detail" @click.stop="edit('edit', props.item.id)">编辑</div>
              <div class="btn btn-delete" @click.stop="deleteMachineById(props.item.id)">删除</div>
            </div>
          </td>
        </template>
      </custom-table>
      <div style="margin: 20px auto" class="pageStyle">
        <div class="left">
          <!-- <span>跳转至</span>
           <input type="text" v-model.trim="pageNo" v-on:blur="jumpTo" v-on:keyup.enter="jumpTo">
           <span>页</span>-->
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
const thead = ['CODE', '名称', '品牌', '描述', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      thead: thead,
      tbody: [],
      cmd: 'a:equipmenBig/getIboxMainTypeList',
      deleteParams: {},
      params: {
        brand: '', // 品牌
        mainCode: '', // code
        name: ''
      },
      brandList: [] // 品牌
    }
  },
  mounted () {
    this.getBrandList()
    this.getTableList(this.cmd, this.params)
  },
  methods: {
    // 删除
    deleteMachineById (id) {
      this.deleteParams.id = id
      this.$Modal.confirm({
        title: '提示',
        content: `确认删除【ID：${id}】的设备大类吗?`,
        onOk: () => {
          this.$store.dispatch('a:equipmenBig/deleteIboxMainType', this.deleteParams).then(
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
      this.$router.push('/equipmenBig/detail')
      sessionStorage.setItem('editType', type)
      if (type === 'edit') {
        sessionStorage.setItem('editId', JSON.stringify(id))
      } else {
        sessionStorage.setItem('editId', JSON.stringify(''))
      }
    },
    searchTab () {
      this.getTableList(this.cmd, this.params)
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
