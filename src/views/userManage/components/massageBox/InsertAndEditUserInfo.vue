<!--  -->
<template>
  <div class="dialog-Info-container">
    <el-dialog title="添加用户" :visible.sync="crruentVisible" center>
      <el-form ref="userInfoForm" :rules="rules" label-width="80px" :model="userInfoForm">
        <el-row>
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
            :before-upload="checkAndPreviewImg"
          >
            <img v-if="userInfoForm.figure" :src="userInfoForm.figure" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
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
          <el-button type="primary" icon="el-icon-plus" @click="submitForm('userInfoForm')">立即添加</el-button>
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
      figureFire: {},
      userInfoForm: {
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
    }
  },
  methods: {
    checkAndPreviewImg(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        // 需要释放内存URL.revokeObjectURL()
        this.userInfoForm.figure = URL.createObjectURL(file)
        this.figureFire = file
      }
      // 不自动上传
      return false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.set('file', this.figureFire)
          const json = this.paramFix()
          this.$store.dispatch('userManage/inset', { json, formData })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    paramFix() {
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
    }
  }
}
</script>
<style>
/* element-ui.scss */
</style>
