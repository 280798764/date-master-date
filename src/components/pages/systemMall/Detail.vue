<template>
  <section>
    <div class="page-title-wrapper" >
      <span class="icon-title"></span>
      <span v-if="inTotype === 'create'">系统小类新增</span>
      <span v-if="inTotype === 'edit'">系统小类编辑</span>
    </div>
    <section class="filter-wrapper">
      <div class="filter-line">
        <label>大类<span class="require">*</span></label>
        <div class="select-wrapper">
          <Row>
            <Col span="40" style="padding-right:10px">
            <Select v-model="editParams.mtClass" filterable clearable>
              <Option v-for="item in machineTypeList" :value="item.mainTypeCode" :key="item.mainTypeCode">{{ item.mainTypeName }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
        <label>CODE<span class="require">*</span></label>
        <input v-if="inTotype === 'edit'" type="text" v-model.trim="editParams.mtClass2" readonly>
        <input v-else type="text" v-model.trim="editParams.mtClass2">
      </div>
      <div class="filter-line">
         <label>名称  <span class="require">*</span></label>
       <input type="text" v-model.trim="editParams.mtName">
        <label>地图类别名称</label>
        <div class="select-wrapper">
          <Select v-model="editParams.bigmapTypeId" clearable>
            <Option v-for="item in mapList" :value="item.id" :key="item.di">{{ item.typeName }}</Option>
          </Select>
        </div>
      </div>
      <div class="filter-line">
        <label>简述  <span class="require">*</span></label>
       <input type="text" v-model.trim="editParams.simpleDescription">
        <label>参数集</label>
        <div class="select-wrapper">
          <Select v-model="editParams.vdpParams" clearable>
            <Option v-for="item in items" :value="item.type" :key="item.type">{{item.type}}</Option>
          </Select>
        </div>
      </div>
      <div class="filter-line">
        <label>展示界面</label>
        <input type="text" v-model.trim="editParams.vdpShow">
      </div>
      <div class="filter-line reset-height">
        <label>服务</label>
        <div>
          <textarea name="" cols="50" rows="5" class="textarea textarea1" v-model="editParams.vdpService"></textarea>
        </div>
      </div>
      <div class="filter-line reset-height">
        <label>描述 <span class="require">*</span></label>
        <div>
          <textarea name="" cols="50" rows="10" class="textarea" v-model="editParams.mtDescription"></textarea>
        </div>
      </div>
      <div class="filter-line">
        <label>图片标题</label>
        <input type="text" v-model.trim="editParams.picTitle1">
        <label>图片URL</label>
        <input type="text" v-model.trim="picPath">
        <div class="fileBox">
          <button class="uploadFile">上传</button>
          <input type="file" class="fileUp" @change="getFile">
        </div>
        <!--<button class="uploadFile">上传</button>-->
      </div>
      <div class="filter-line reset-height">
        <label>图片预览</label>
        <div class="imgBox" v-if="picPath">
          <img :src="picPath">
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
      brandList: [], // 品牌
      machineTypeList: [], // 大类
      mapList: [], // 地图类别
      editParams: {
        bigmapTypeId: '', // 地图类别
        mtClass: '', // 大类
        mtClass2: '', // code
        mtDescription: '', // 描述
        mtName: '', // 名称
        picId1: '',
        picpath1: '', //  图片路径
        simpleDescription: '', // 简述
        pictitle1: '', // 图片标题
        typeId: '', // 获取详情id
        vdpParams: '', // 参数
        vdpShow: '', // 展示界面
        vdpService: '' // 服务
      },
      picList: {
        picPath: '',
        picTitle: ''
      },
      picPath: '',
      picTitle: '',
      items: []
    }
  },
  mounted () {
    this.getMachineType()
    this.getMapList()
    this.getAll()
    this.params.typeId = JSON.parse(sessionStorage.getItem('editId'))
    this.editParams.typeId = JSON.parse(sessionStorage.getItem('editId'))
    this.inTotype = sessionStorage.getItem('editType')
    if (this.inTotype === 'edit') {
      this.detail()
    }
  },
  methods: {
    // 拿取文件
    getFile (e) {
      let file = e.target.files[0]
      this.$store.dispatch('a:file/fileUploadToQiNiu', file).then(
        res => {
          this.picPath = res.downloadUrl
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    // 校验空字段
    empty () {
      if (!this.editParams.mtClass) {
        this.alert('大类不能为空！', 'error')
        return false
      } else if (!this.editParams.mtClass2) {
        this.alert('CODE不能为空！', 'error')
        return false
      } else if (!this.editParams.mtName) {
        this.alert('名称不能为空！', 'error')
        return false
      } else if (!this.editParams.mtDescription) {
        this.alert('描述不能为空！', 'error')
        return false
      }
      return true
    },
    detail () {
      this.$store.dispatch('a:equipmenMall/getTypeById', this.params).then(
        res => {
          this.editParams.mtDescription = res.type.description
          this.editParams.mtClass = res.type.mainTypeCode
          this.editParams.mtName = res.type.typeName
          this.editParams.mtClass2 = res.type.typeCode
          this.editParams.bigmapTypeId = Number(res.type.mapTypeId)
          this.editParams.vdpParams = res.type.vdpParams
          this.editParams.vdpService = res.type.vdpService
          this.editParams.vdpShow = res.type.vdpShow
          this.editParams.simpleDescription = res.type.simpleDescription
          this.editParams.typeCode = res.type.typeCode
          this.picList = res.picList[0] || []
          this.picTitle1 = res.picList[0] && res.picList[0].picTitle
          this.picPath = res.picList[0] && res.picList[0].picPath
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    edit () {
      if (!this.empty()) {
        return
      }
      this.editParams.picpath1 = this.picPath || ''
      this.editParams.pictitle1 = this.picTitle || ''
      this.$store.dispatch('a:systemMall/updataType', this.editParams).then(
        res => {
          this.$router.push('/systemMall/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    save () {
      if (!this.empty()) {
        return
      }
      this.editParams.picpath1 = this.picPath || ''
      this.editParams.pictitle1 = this.picTitle || ''
      this.$store.dispatch('a:systemMall/saveType', this.editParams).then(
        res => {
          this.$router.push('/systemMall/index')
        },
        rej => {
          this.alert(rej.errorInfo, 'error')
        }
      )
    },
    backForward () {
      this.$router.push('/systemMall/index')
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
    // 参数集
    getAll () {
      this.$store.dispatch('a:systemMall/paramVersion', {}).then(
        res => {
          this.items = res.items || []
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
  .textarea1 {
    width: 650px;
    height: 50px;
  }
  .imgBox {
    width: 190px;
    height: 110px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .reset-height {
    height: inherit;
  }
  .uploadFile {
    width: 60px;
    border-radius: 5px;
    height: 26px;
    line-height: 26px;
    background-color: #fabf40;
    border: none;
    color: #fff;
    margin-left: 30px;
  }
  .fileBox {
    position: relative;
  }
  .fileUp {
    position: absolute;
    left:30px;
    top: 0;
    opacity: 0;
    width: 60px !important;
    overflow: hidden;
  }
</style>
