<!--  -->
<template>
  <div class="search-bar-container">
    <el-form ref="searchForm" :inline="true" :model="searchForm" :rules="rules" class="demo-form-inline">
      <el-form-item ref="condition" label="查询条件:" prop="condition">
        <el-select v-model="searchForm.condition" placeholder="查询条件">
          <el-option label="vid" value="vid" />
          <el-option label="标题" value="title" />
          <el-option label="uid" value="uid" />
          <el-option label="作者" value="author" />
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
      if (this.searchForm.condition === 'uid' || this.searchForm.condition === 'vid') {
        // uid验证
        if (!Number.isInteger(Number.parseInt(value))) {
          callback(new Error('请输入数字'))
          return
        }
      } else if (this.searchForm.condition === 'author') {
        // nickName验证
        if (!/^[\u4E00-\u9FA5a-zA-Z0-9_-]{1,10}$/.test(value)) {
          callback(new Error('最多10位汉字、数字、字母等字符'))
          return
        }
      } else if (this.searchForm.condition === 'title') {
        if (!/^[\u4E00-\u9FA5a-zA-Z0-9_-]{1,30}$/.test(value)) {
          callback(new Error('最多30位汉字、数字、字母等字符'))
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
    },
    watchCondition() {
      return this.searchForm.condition
    }
  },
  watch: {
    // 处理关键字
    watchKeyWord() {
      this.$store.commit('videoManage/SET_KEYWORD', this.searchForm.keyWord)
      this.$store.commit('videoManage/SET_CONDITION', this.searchForm.condition)
    },
    watchCondition() {
      this.$store.commit('videoManage/SET_KEYWORD', this.searchForm.keyWord)
      this.$store.commit('videoManage/SET_CONDITION', this.searchForm.condition)
    }
  },
  methods: {
    search() {
      // 验证后搜索
      this.$refs.searchForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('videoManage/search', {}).then(() => {
            this.$message({
              message: '查询成功',
              type: 'success',
              duration: 3 * 1000
            })
          }).catch((error) => {
            this.$message({
              message: error,
              type: 'error',
              duration: 3 * 1000
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
