<!-- 应用上架还是下架 -->
<template>
  <section class="dialog-wrapper">
    <div class="dialog">
      <div class="dialog-header">
        <span>提示</span>
        <span class="dlg-close"><i class="iconfont close" @click="cancel"></i></span>
      </div>
      <div class="dialog-body">
        <div>
          <h5>已注册设备，请检查是否继续导入更新？</h5>
          <p v-for="(list, index) in diffList" :key="index" :class="{red: list.isChangeTime || list.proChangeTime}" >
            设备序列号：{{list.mtNo}}
            <span v-if="list.isChangeTime & !list.proChangeTime" style="margin-left: 10px" >使用权变更，需输入变更时间</span>
            <span v-if="list.proChangeTime & !list.isChangeTime" style="margin-left: 10px" >所有权变更，需输入变更时间</span>
            <span v-if="list.proChangeTime & list.isChangeTime" style="margin-left: 10px" >使用权、所有权变更，需输入变更时间</span>
          </p>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="btn btn-cancel wid-70px mr-15px" @click="cancel">取消</div>
        <div class="btn btn-sure wid-70px mr-15px" @click="save">继续</div>
      </div>
    </div>
  </section>
</template>

<script>
import { DOMAIN } from '@/utils/config'
export default {
  props: ['dlgInfo', 'params', 'search', 'diffList', 'upFile', 'uploadFileToCloud'],
  methods: {
    // 取消事件
    cancel () {
      this.$emit('cancel')
    },
    save () {
      this.uploadFileToCloud(false, this.upFile, DOMAIN.uploadPath + '/imedataapi/importMtToData')
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  width: 550px;
}
.dialog-body .line > input {
  width: 250px;
}
.dialog-body {
  div {
    width: 80%;
    margin: 0 auto;
    h5 {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    p {
      height: 25px;
      line-height: 25px;
    }
  }
}
.line {
  height: 100px;
  div {
    margin: auto;
  }
}
.reminder {
  margin-left: 10px;
  color: red;
}
.red {
  color: red;
}
</style>
