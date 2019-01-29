/* 这里是页面备注 */
<template>
  <section>
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
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>大类</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>设备类型</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label class="app-name-dev special-first">设备序列号</label><input type="text">
        </div>
        <div class="filter-line">
          <label>设备制造商</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>所有权</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>使用权</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label class="app-name-dev special-first">MAC</label><input type="text">

        </div>
        <div class="filter-line">
          <label class="app-name-dev special-first">UKEY</label><input type="text">
          <label>获取途径</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>iport类型</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
          <label>vpn更新</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </div>
        <div class="filter-line">
          <label>是否上线</label>
          <div class="select-wrapper">
            <Select clearable>
              <Option v-for="item in developType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </div>
        </div>
      </section>
      <div class="page-title-wrapper" >
        <span class="icon-title"></span>
        <span>设备列表</span>
        <div class="right">
          <span>批量导入</span>
          <span>初始化</span>
          <span>新建</span>
        </div>
      </div>
      <section class="table-wrapper">
        <section class="list-wrapper custom-scroll scroll">
          <custom-table :thead="thead" :tbody="tbody" :scroll="true">
            <template slot="item" slot-scope="props">
              <td><div class="icon"><img class="imgIcon" :src="props.item.icon + '?imageView2/1/w/105/h/60'"></div></td>
              <td><div>{{props.item.nameCn}}</div></td>
              <td><div>{{props.item.developerName}}</div></td>
              <td><div>{{props.item.developerType === 3 ? '企业' : props.item.developerType === 2 ? '个人' : ''}}</div></td>
              <td><div>¥{{props.item.price}}</div></td>
              <td><div>{{props.item.auditTime}}</div></td>
              <td><div>{{props.item.versionStatus === 1 ? '初始版本' : props.item.versionStatus === 2 ? '有新版本' : props.item.versionStatus === 3 ? '无新版本' : '' }}</div></td>
              <td><div>{{props.item.shelfStatus === 0 ? '待上架' : props.item.shelfStatus === 1 ? '已上架' : props.item.shelfStatus === 2 ? '已下架' : ''}}</div></td>
              <td class="operations-td wid-100px">
                <div class="operations flex-center">
                  <div class="btn btn-detail" v-if="props.item.versionStatus === 2" @click="update(props.item.appId)">更新</div>
                  <div class="btn btn-detail gray" v-if="props.item.versionStatus !== 2">更新</div>
                  <div class="btn btn-detail" @click.stop="readRecord(props.item.appId)">详情</div>
                  <div class="btn btn-delete right" v-if="props.item.shelfStatus !== 1" @click="IndexUpOrDown(props.item.appId)">上架</div>
                  <div class="btn btn-delete right" v-if="props.item.shelfStatus === 1" @click="IndexUpOrDown(props.item.appId)">下架</div>
                </div>
              </td>
            </template>
          </custom-table>
          <!--<pagination v-if="pageInfo.totalPageCount" :pageInfo="pageInfo" @pageChange="pageChange"></pagination>-->
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
const thead = ['大类', '小类', '序列号', '设备制造商', '所有权', '使用权', 'MAC', 'UKEY', '设备密码', '获取类型', 'iport类型', 'vpn更新', '是否上线', '最新初始化时间', '注册时间', '初始化seafile', '初始化Ldap', '操作']
export default {
  mixins: [mixinsTable],
  data () {
    return {
      developType: [],
      thead: thead,
      tbody: []
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/pages/demoPageOne/Index.less';
  .right {
    color: red;
  }
</style>
