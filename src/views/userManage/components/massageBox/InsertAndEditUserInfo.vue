<!--  -->
<template>
  <div class="dialog-Info-container">
    <el-dialog :title="userInfo?'更新用户':'添加用户'" :visible.sync="crruentVisible" center @close="closeDialog">
      <el-form ref="userInfoForm" :rules="rules" label-width="80px" :model="userInfoForm">
        <el-row v-if="!userInfo">
          <el-col :span="6">
            <el-form-item prop="userAccount" label="用户账号">
              <el-input v-model="userInfoForm.userAccount" style="width:220px" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item prop="pwd" label="用户密码">
              <el-input v-model="userInfoForm.pwd" type="password" style="width:220px" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="nickName" label="昵称">
              <el-input v-model="userInfoForm.nickName" style="width:220px" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item prop="gender" label="性别">
              <el-select v-model="userInfoForm.gender" placeholder="请选择" style="width:120px">
                <el-option key="1" label="男" value="1" />
                <el-option key="0" label="女" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item prop="signature" label="签名">
          <el-input v-model="userInfoForm.signature" />
        </el-form-item>
        <el-form-item prop="figure" label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :limit="1"
            accept="image/png, image/jpeg, image/jpg"
            :before-upload="checkAndPreviewImg"
          >
            <img v-if="userInfoForm.figure" :src="userInfoForm.figure" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">支持jpg,png等格式,5mb以下大小的图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="birthDate" label="生日">
          <el-date-picker v-model="userInfoForm.birthDate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="attentionCount" label="关注数">
              <el-input v-model.number="userInfoForm.attentionCount" type="number" min="0" max="99999999" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="fanCount" label="粉丝数">
              <el-input v-model.number="userInfoForm.fanCount" type="number" min="0" max="99999999" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="likeCount" label="点赞数">
              <el-input v-model.number="userInfoForm.likeCount" type="number" min="0" max="99999999" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="viewCount" label="播放数">
              <el-input v-model.number="userInfoForm.viewCount" type="number" min="0" max="99999999" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px">
          <el-button
            type="primary"
            :icon="!loading?'el-icon-upload':'el-icon-loading'"
            :disabled="loading"
            @click="submitForm('userInfoForm')"
          >{{ userInfo?'立即更新':'立即添加' }}</el-button>
          <el-button style="margin-left:50px" @click="resetForm('userInfoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogInfoVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validateUserAccount = (rule, value, callback) => {
      if (!/^[0-9a-zA-Z_]{3,15}$/.test(value)) {
        callback('3-15位数字、字母、下划线等字符')
      }
      callback()
    }
    var validatePwd = (rule, value, callback) => {
      if (!/^[0-9a-zA-Z]{3,15}$/.test(value)) {
        callback('3-15位数字、字母等字符')
      }
      callback()
    }
    return {
      loading: false,
      figureFile: null,
      defaultUserInfoForm: {
        userAccount: '',
        pwd: '',
        nickName: '',
        gender: null,
        signature: '',
        figure: null,
        birthDate: 0,
        attentionCount: 0,
        fanCount: 0,
        likeCount: 0,
        viewCount: 0
      },
      userInfoForm: null,
      rules: {
        userAccount: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { trigger: 'blur', validator: validateUserAccount }
        ],
        pwd: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePwd }
        ],
        nickName: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择用户性别', trigger: 'blur' }
        ],
        signature: [
          { required: true, message: '请输入用户签名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'change' }
        ],
        birthDate: [
          { required: true, message: '请选择用户生日', trigger: 'blur' },
          { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        figure: [
          { required: true, message: '请选择用户头像', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    crruentVisible: {
      get() {
        return this.dialogInfoVisible
      },
      set(val) {
        this.$emit('update:dialogInfoVisible', val)
      }
    },
    userInfo: {
      get() {
        return this.$store.state.userManage.userInfo
      }
    }
  },
  watch: {
    // Unexpected side effect in "userInfo" computed property
    // 计算属性内不应该对属性值做变更，解决这个问题的做法之一是使用watch监听
    userInfo(newValue) {
      // 浅拷贝
      this.userInfoForm = Object.assign({}, newValue) || this.defaultUserInfoForm
    }
  },
  created() {
    this.userInfoForm = this.defaultUserInfoForm
  },
  methods: {
    checkAndPreviewImg(file) {
      const isJPG = /image\/[jpeg|png|jpg]/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('图片格式错误!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        // 需要释放内存URL.revokeObjectURL()
        this.userInfoForm.figure = URL.createObjectURL(file)
        this.figureFile = file
      }
      // 不自动上传
      return false
    },
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = new FormData()
          this.figureFile ? formData.set('file', this.figureFile) : formData = null // 是否上传头像
          if (this.userInfo) {
            // this.userInfoForm没有账号密码
            this.editUser(this.userInfoForm, formData)
          } else {
            const json = this.insertJsonFix()
            this.insertUser(json, formData)
          }
        } else {
          return false
        }
      })
    },
    editUser(json, formData) {
      this.$store.dispatch('userManage/update', { json, formData }).then(() => {
        // 上传成功，处理并展示
        Object.assign(this.userInfo, this.userInfoForm)
        this.$message({
          message: '更新用户成功',
          type: 'success'
        })
        this.loading = false
      }).catch((error) => {
        // 上传失败,处理并展示
        console.log(error)
        const message = this.errorFix(error)
        this.$alert(message, '更新失败', { confirmButtonText: '确定' })
        this.loading = false
      })
    },
    insertUser(json, formData) {
      this.$store.dispatch('userManage/insert', { json, formData }).then(() => {
        // 上传成功，处理并展示
        this.$message({
          message: '添加用户成功',
          type: 'success'
        })
        this.loading = false
      }).catch((error) => {
        // 上传成功,处理并展示
        console.log(error)
        const message = this.errorFix(error)
        this.$alert(message, '添加失败', { confirmButtonText: '确定' })
        this.loading = false
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    closeDialog() {
      this.$store.commit('userManage/SET_USERINFO', null)
    },
    changeTableUserInfo() {
      // userInfo指向table改变的元素
    },
    insertJsonFix() {
      // 分离user和userContent
      const user = {
        userAccount: this.userInfoForm.userAccount,
        pwd: this.userInfoForm.pwd
      }
      const userContent = {
        nickName: this.userInfoForm.nickName,
        gender: this.userInfoForm.gender,
        signature: this.userInfoForm.signature,
        figure: this.userInfoForm.figure,
        birthDate: this.userInfoForm.birthDate,
        attentionCount: this.userInfoForm.attentionCount,
        fanCount: this.userInfoForm.fanCount,
        likeCount: this.userInfoForm.likeCount,
        viewCount: this.userInfoForm.viewCount
      }
      return { user, userContent }
    },
    // TODO: 抽出
    errorFix(error) {
      let message = ''
      switch (error) {
        case 40301:
          message = '用户账号重复，请更换用户账号'
          break
        default:
          message = '未知原因，请重新操作'
      }
      return message
    }
  }
}
</script>
<style>
/* element-ui.scss */
</style>
