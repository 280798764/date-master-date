<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">地图类别新增</span>
      <span v-if="inTotype === 'edit'">地图类别编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>名称  <span class="require">*</span></label>
        <input type="text" v-model.trim="resInfo.typeName">
      </div>
      <!-- 底部功能按钮 -->
      <section class="btns-group">
        <div class="btn btn-gray" v-if="this.inTotype === 'create'" @click="edit">保存</div>
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
        typeName: ''
      }
    }
  },
  mounted () {
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
        this.$store.dispatch('a:typalMap/getMapById', this.params).then(
          res => {
            this.resInfo = res || ''
          },
          rej => {
            this.alert(rej.errorInfo, 'error')
          }
        )
      } else {
        this.resInfo = {}
      }
    },
    // 修改
    edit () {
      this.$store.dispatch('a:typalMap/saveOrUpdataMapType', this.resInfo).then(
        res => {
          this.$router.push('/typalMap/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/typalMap/index')
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
