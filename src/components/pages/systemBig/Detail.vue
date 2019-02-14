<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">系统大类新增</span>
      <span v-if="inTotype === 'edit'">系统大类编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>CODE</label>
        <span class="require">*</span>
        <input type="text" v-model.trim="detailInfo.equserialno">
        <label>名称</label>
        <span class="require">*</span>
        <input type="text" v-model.trim="detailInfo.equserialno">
      </div>
      <div class="filter-line">
        <label>品牌</label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="params.brand" filterable>
              <Option v-for="item in brandList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
      </div>
      <div class="filter-line reset-height">
        <label>描述</label>
        <span class="require">*</span>
        <div>
          <textarea name="" id="" cols="50" rows="10" class="textarea"></textarea>
        </div>
      </div>
      <div class="filter-line">
        <label>图片标题</label>
        <input type="text" v-model.trim="detailInfo.equserialno">
        <label>图片URL</label>
        <input type="text" v-model.trim="detailInfo.equserialno">
      </div>
      <div class="filter-line reset-height">
        <label>图片预览</label>
        <div class="imgBox">
          <img src="" alt="">
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
      detailInfo: {},
      brandList: [] // 品牌
    }
  },
  mounted () {
    this.getBrandList()
    this.params.mainTypeId = sessionStorage.getItem('editId')
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    detail () {
      this.$store.dispatch('a:device/getMachineById', this.params).then(
        res => {
          this.detailInfo = res || {}
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    save () {
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
