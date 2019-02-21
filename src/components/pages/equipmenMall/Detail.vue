<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">系统大类新增</span>
      <span v-if="inTotype === 'edit'">系统大类编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>大类名称</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="resInfo.mainTypeCode" filterable clearable>
              <Option v-for="item in mainTypeName" :value="item.mainTypeCode" :key="item.mainTypeCode">{{ item.mainTypeName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label>小类CODE  <span class="require">*</span></label>
        <input type="text" v-model.trim="resInfo.code" :readonly="params.typeId !== ''">
      </div>
      <div class="filter-line">
        <label>小类名称 <span class="require">*</span></label>
        <input type="text" v-model.trim="resInfo.name">
      </div>
      <div class="filter-line reset-height">
        <label>描述 <span class="require">*</span></label>
        <div>
          <textarea name="" id="" cols="50" rows="10" class="textarea" v-model="resInfo.descript"></textarea>
        </div>
      </div>
      <!-- 底部功能按钮 -->
      <section class="btns-group">
        <div class="btn btn-gray" v-if="this.inTotype === 'create'" @click="save">保存</div>
        <div class="btn btn-gray" v-if="this.inTotype === 'edit'" @click="edit">修改</div>
        <div class="btn btn-gray" @click="detail">取消</div>
        <div class="btn btn-gray" @click="backForward">返回</div>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      params: {
        typeId: ''
      },
      inTotype: '',
      mainTypeName: [], // 品牌
      resInfo: {
        id: '',
        mainTypeName: '', // 大类名称
        descript: '', // 描述
        typeCode: '', // 小类code
        typeName: ''// 小类名称
      }
    }
  },
  mounted () {
    this.getMainTypeName()
    this.params.typeId = JSON.parse(sessionStorage.getItem('editId'))
    this.resInfo.id = JSON.parse(sessionStorage.getItem('editId'))
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    detail () {
      if (this.params.typeId) {
        this.$store.dispatch('a:equipmenMall/getIboxTypeById', this.params).then(
          res => {
            this.resInfo.mainTypeCode = res.mainTypeCode || ''
            this.resInfo.descript = res.descript || ''
            this.resInfo.code = res.typeCode || ''
            this.resInfo.name = res.typeName || ''
          },
          rej => {
            this.alert(rej.errorInfo, 'error')
          }
        )
      } else {
        this.resInfo = {}
      }
    },
    edit () {
      this.$store.dispatch('a:equipmenMall/updataIboxType', this.resInfo).then(
        res => {
          this.$router.push('/equipmenMall/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 新建
    save () {
      this.$store.dispatch('a:equipmenMall/saveIboxType', this.resInfo).then(
        res => {
          this.$router.push('/equipmenMall/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/equipmenMall/index')
    },
    // 获取大类名称
    getMainTypeName () {
      this.$store.dispatch('a:equipmenMall/getIboxMainTypeListNoPage', {}).then(
        res => {
          this.mainTypeName = res || []
          console.log(res)
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
  .textarea {
    width: 650px;
    height: 100px;
  }
  .imgBox {
    width: 190px;
    height: 110px;
  }
  .reset-height {
    height: inherit;
  }
</style>
