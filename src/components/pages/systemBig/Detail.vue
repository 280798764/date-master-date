<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">系统大类新增</span>
      <span v-if="inTotype === 'edit'">系统大类编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>CODE <span class="require">*</span></label>
        <input type="text" v-model.trim="params2.code">
        <label>名称  <span class="require">*</span></label>
        <input type="text" v-model.trim="params2.name">
      </div>
      <div class="filter-line">
        <label>品牌</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params2.brand" filterable clearable>
              <Option v-for="item in brandList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
      </div>
      <div class="filter-line reset-height">
        <label>描述 <span class="require">*</span></label>
        <div>
          <textarea name="" id="" cols="50" rows="10" class="textarea" v-model="params2.description"></textarea>
        </div>
      </div>
      <div class="filter-line">
        <label>图片标题</label>
        <input type="text" v-model.trim="params2.picTitle1">
        <label>图片URL</label>
        <input type="text" v-model.trim="params2.picPath1">
      </div>
      <div class="filter-line reset-height">
        <label>图片预览</label>
        <div class="imgBox">
          <img :src="params2.picPath1">
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
        mainTypeId: ''
      },
      inTotype: '',
      brandList: [], // 品牌
      params2: {
        brand: '',
        code: '',
        description: '',
        name: '',
        picId1: '',
        picId2: '',
        picId3: '',
        picpath1: '',
        picpath2: '',
        picpath3: '',
        pictitle1: '',
        pictitle2: '',
        pictitle3: ''
      }
    }
  },
  mounted () {
    this.getBrandList()
    this.params.mainTypeId = JSON.parse(sessionStorage.getItem('editId'))
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    detail () {
      this.$store.dispatch('a:systemBig/getMainTypeById', this.params).then(
        res => {
          this.params2.brand = res.mainType.brand || ''
          this.params2.description = res.mainType.description || ''
          this.params2.name = res.mainType.genreName || ''
          this.params2.code = res.mainType.mainTypeCode || ''
          this.params2.picpath1 = res.mainType.picList || ''
          this.params2.pictitle1 = res.mainType.picList || ''
          this.params2.mainTypeId = res.mainType.id || ''
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    edit () {
      this.$store.dispatch('a:systemBig/updataMainType', this.params2).then(
        res => {
          this.$router.push('/systemBig/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    save () {
      this.$store.dispatch('a:systemBig/saveMainType', this.params2).then(
        res => {
          this.$router.push('/systemBig/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/systemBig/index')
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
