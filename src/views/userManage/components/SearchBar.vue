<!--  -->
<template>
  <div class="search-bar-container">
    <el-form :inline="true" :model="searchForm" :rules="rules" class="demo-form-inline">
      <el-form-item label="查询条件:" prop="condition">
        <el-select v-model="searchForm.condition" placeholder="查询条件">
          <el-option label="uid" value="uid" />
          <el-option label="昵称" value="nickName" />
        </el-select>
      </el-form-item>
      <el-form-item label="查询内容:" prop="keyWord">
        <el-input v-model="searchForm.keyWord" placeholder="请输入..." />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    var validateKeyWord = (rule, value, callback) => {
      if (this.searchForm.condition === 'uid') {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'))
        }
      } else if (this.searchForm.condition === 'nickName') {
        if (!/^[a-zA-Z0-9_-\u4E00-\u9FA5]{1,10}$/.test(value)) {
          callback(new Error('最多10位汉字、数字、字母等字符'))
        }
        callback()
      }
    }
    return {
      searchForm: {
        keyWord: '',
        condition: ''
      },
      rules: {
        keyWord: { trigger: 'blur', validator: validateKeyWord }
      }
    }
  },
  methods: {
    searchSubmit() {
      let json = {}
      if (this.searchForm.condition === 'uid') {
        json = {
          uid: this.searchForm.keyWord
        }
      } else if (this.searchForm.condition === 'nickName') {
        json = {
          nickName: this.searchForm.keyWord
        }
      }
      this.$store.dispatch('userManage/search', json).catch((error) => {
        this.$message({
          message: error,
          type: 'error'
        })
      })
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
