<!--  -->
<template>
  <div class="button-bar-container">
    <el-row>
      <el-button type="primary" @click="insertUser">
        添加
      </el-button>
    </el-row>
    <InsertAndEditUserInfo :dialog-info-visible.sync="dialogInfoVisible" />
  </div>
</template>

<script>
import InsertAndEditUserInfo from './massageBox/InsertAndEditUserInfo'
export default {
  components: {
    InsertAndEditUserInfo
  },
  data() {
    return {
      dialogInfoVisible: false
    }
  },
  methods: {
    insertUser() {
      this.dialogInfoVisible = true
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
