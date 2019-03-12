<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">设备大类新增</span>
      <span v-if="inTotype === 'edit'">设备大类编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>CODE <span class="require">*</span></label>
        <input type="text" v-if="params.id" v-model.trim="resInfo.mainCode" readonly="">
        <input type="text" v-else v-model.trim="resInfo.mainCode" >
        <label>名称  <span class="require">*</span></label>
        <input type="text" v-model.trim="resInfo.name">
      </div>
      <div class="filter-line">
        <label>品牌</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="resInfo.brand" filterable clearable>
              <Option v-for="item in brandList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
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
        id: ''
      },
      inTotype: '',
      brandList: [], // 品牌
      resInfo: {
        id: '',
        brand: '',
        descript: '',
        mainCode: '',
        name: ''
      }
    }
  },
  mounted () {
    this.getBrandList()
    this.params.id = JSON.parse(sessionStorage.getItem('editId'))
    this.resInfo.id = JSON.parse(sessionStorage.getItem('editId'))
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    detail () {
      if (this.params.id) {
        this.$store.dispatch('a:equipmenBig/getMainTypeById', this.params).then(
          res => {
            this.resInfo.brand = res.brand || ''
            this.resInfo.descript = res.descript || ''
            this.resInfo.mainCode = res.mainTypeCode || ''
            this.resInfo.name = res.mainTypeName || ''
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
      if (!this.empty()) {
        return
      }
      this.$store.dispatch('a:equipmenBig/updataIboxMainType', this.resInfo).then(
        res => {
          this.$router.push('/equipmenBig/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    empty () {
      if (!this.resInfo.mainCode) {
        this.alert('CODE不能为空！', 'error')
        return false
      } else if (!this.resInfo.name) {
        this.alert('名称不能为空！', 'error')
        return false
      } else if (!this.resInfo.descript) {
        this.alert('描述不能为空！', 'error')
        return false
      }
      return true
    },
    save () {
      if (!this.empty()) {
        return
      }
      this.$store.dispatch('a:equipmenBig/saveIboxMainType', this.resInfo).then(
        res => {
          this.$router.push('/equipmenBig/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/equipmenBig/index')
    },
    // 获取品牌
    getBrandList () {
      this.$store.dispatch('a:equipmenBig/getBrandList', {}).then(
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
