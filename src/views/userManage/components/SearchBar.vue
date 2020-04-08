<!--  -->
<template>
  <div class="search-bar-container">
    <el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" class="demo-form-inline">
      <el-form-item ref="condition" label="查询条件:" prop="condition">
        <el-select v-model="searchForm.condition" placeholder="查询条件">
          <el-option label="uid" value="uid" />
          <el-option label="昵称" value="nickName" />
        </el-select>
      </el-form-item>
      <el-form-item label="查询内容:" prop="keyWord">
        <el-input v-model.lazy="searchForm.keyWord" placeholder="请输入..." @keyup.enter.native="search" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  data() {
    // 验证函数
    var validateKeyWord = (rule, value, callback) => {
      if (!value) {
        // 查询所有
        callback()
      }
      if (this.searchForm.condition === 'uid') {
        // uid验证
        if (!Number.isInteger(Number.parseInt(value))) {
          callback(new Error('请输入数字'))
          return
        }
      } else if (this.searchForm.condition === 'nickName') {
        // nickName验证
        if (!/^[a-zA-Z0-9_-\u4E00-\u9FA5]{1,10}$/.test(value)) {
          callback(new Error('最多10位汉字、数字、字母等字符'))
          return
        }
      }
      // 验证通过
      callback()
    }
    return {
      searchForm: {
        keyWord: '',
        condition: ''
      },
      rules: {
        condition: [
          { required: true, message: '请选择查询条件', trigger: 'blur' }
        ],
        keyWord: [
          { trigger: 'change', validator: validateKeyWord }
        ]
      }
    }
  },
  computed: {
    watchKeyWord() {
      return this.searchForm.keyWord
    }
  },
  watch: {
    // 处理关键字
    watchKeyWord() {
      this.$store.commit('userManage/SET_KEYWORD', this.searchForm.keyWord)
      this.$store.commit('userManage/SET_CONDITION', this.searchForm.condition)
    }
  },
  methods: {
    search() {
      // 验证后搜索
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('userManage/search', {}).catch((error) => {
            this.$message({
              message: error,
              type: 'error',
              duration: 6 * 1000
            })
          })
        } else {
          // TODO 报错后仍然搜索
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
