<!--  -->
<template>
  <div class="button-bar-container">
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="insertUser">添加用户</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogInfoVisible: false
    }
  },
  methods: {
    insertUser() {
      this.$store.commit('userManage/SET_DIALOG', true)
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
