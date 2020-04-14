/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/no-parsing-error */
<!--  -->
<template>
  <div class="dialog-Info-container">
    <el-dialog
      :title="videoInfo?'更新视频':'添加视频'"
      :visible.sync="crruentVisible"
      center
      @close="closeDialog"
    >
      <el-form ref="videoInfoForm" :rules="rules" label-width="80px" :model="videoInfoForm">
        <el-form-item prop="title" label="标题">
          <el-input v-model="videoInfoForm.title" type="text" maxlength="30" />
        </el-form-item>
        <el-form-item prop="introduction" label="介绍">
          <el-input
            v-model="videoInfoForm.introduction"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item prop="uid" label="作者uid" style="width:200px">
          <el-input v-model="videoInfoForm.uid" type="number" min="1" max="99999" />
        </el-form-item>
        <el-form-item prop="sortName" label="分类">
          <el-select v-model="videoInfoForm.sortName">
            <el-option value="动画">动画</el-option>
            <el-option value="数码">数码</el-option>
            <el-option value="游戏">游戏</el-option>
            <el-option value="游戏">游戏</el-option>
            <el-option value="电影">电影</el-option>
            <el-option value="科技">科技</el-option>
            <el-option value="舞蹈">舞蹈</el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="pic" label="封面">
          <el-upload
            accept="image/png, image/jpeg, image/jpg"
            class="pic-uploader"
            action="#"
            :show-file-list="false"
            :limit="1"
            :before-upload="checkAndPreviewPic"
          >
            <img v-if="videoInfoForm.pic" :src="videoInfoForm.pic" class="pic">
            <i v-else class="el-icon-plus pic-uploader-icon" />
            <div slot="tip" class="el-upload__tip">支持jpg,png等格式,5mb以下大小的图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item v-if="!videoInfo" prop="videoRes" label="视频" style="width:600px">
          <el-upload
            accept="video/*"
            action="#"
            :before-upload="checkAndPreviewVideo"
            :limit="1"
            :file-list="videoFileList"
          >
            <el-button size="small" type="success" @click="videoFileList=[]">选取视频</el-button>
            <div slot="tip" class="el-upload__tip">支持avi,wmv,mkv,mp4,mov,rm,3gp,flv,mpg,rmvb等格式，500mb以下大小的视频</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="releaseDate" label="发布时间">
          <el-date-picker v-model="videoInfoForm.releaseDate" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="attentionCount" label="播放数">
              <el-input
                v-model.number="videoInfoForm.viewCount"
                type="number"
                min="0"
                max="99999999"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="commentCount" label="评论数">
              <el-input
                v-model.number="videoInfoForm.commentCount"
                type="number"
                min="0"
                max="99999999"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="collectCount" label="收藏数">
              <el-input
                v-model.number="videoInfoForm.collectCount"
                type="number"
                min="0"
                max="99999999"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="viewCount" label="得分">
              <el-input v-model.number="videoInfoForm.vscore" type="number" min="0" max="99999999" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top:30px">
          <el-button
            type="primary"
            :icon="!loading?'el-icon-upload':'el-icon-loading'"
            :disabled="loading"
            @click="submitForm('videoInfoForm')"
          >{{ videoInfo?'立即更新':'立即添加' }}</el-button>
          <el-button style="margin-left:50px" @click="resetForm('videoInfoForm')">重置</el-button>
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
    return {
      loading: false,
      videoFileList: [],
      videoFile: null,
      picFile: null,
      defaultvideoInfoForm: {
        title: '',
        uid: 1,
        introduction: '',
        sortName: '',
        pic: null,
        videoRes: '',
        releaseDate: Date.now(),
        viewCount: 0,
        commentCount: 0,
        collectCount: 0,
        vscore: 0
      },
      videoInfoForm: null,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'change' }
        ],
        introduction: [
          { required: true, message: '请输入视频介绍', trigger: 'blur' },
          {
            min: 1,
            max: 250,
            message: '长度在 1 到 250 个字符',
            trigger: 'change'
          }
        ],
        sortName: [
          { required: true, message: '请选择视频分类', trigger: 'blur' }
        ],
        releaseDate: [
          { required: true, message: '请选择视频发布时间', trigger: 'blur' }
        ],
        pic: [{ required: true, message: '请选择视频封面', trigger: 'blur' }],
        videoRes: [{ required: true, message: '请选择视频', trigger: 'blur' }]
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
    videoInfo: {
      get() {
        return this.$store.state.videoManage.videoInfo
      }
    },
    progress: {
      get() {
        return this.$store.state.videoManage.progress
      }
    }
  },
  watch: {
    // TODO:
    // Unexpected side effect in "videoInfo" computed property
    // 计算属性内不应该对属性值做变更，解决这个问题的做法之一是使用watch监听
    videoInfo(newValue) {
      // 浅拷贝
      this.videoInfoForm =
        Object.assign({}, newValue) || this.defaultvideoInfoForm
    },
    progress(newValue) {
      // TODO:进度条
    }
  },
  created() {
    this.videoInfoForm = this.defaultvideoInfoForm
  },
  methods: {
    checkAndPreviewPic(file) {
      const isImg = /image\/[jpeg|png|jpg]/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImg) {
        this.$message.error('图片格式错误!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      if (isImg && isLt2M) {
        // 需要释放内存URL.revokeObjectURL()
        this.videoInfoForm.pic = URL.createObjectURL(file)
        this.picFile = file
      }
      // 不自动上传
      return false
    },
    checkAndPreviewVideo(file) {
      const isLt2M = file.size / 1024 / 1024 / 100 < 5
      const isVideo = /video\/[avi|wmv|mkv|mp4|mov|rm|3gp|flv|mpg|rmvb]/.test(file.type)
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 500MB!')
      }
      if (!isVideo) {
        this.$message.error('图片格式错误!')
      }
      if (isVideo && isLt2M) {
        // TODO:
        // 需要释放内存URL.revokeObjectURL()
        this.videoInfoForm.videoRes = URL.createObjectURL(file)
        this.videoFileList = [file]
        this.videoFile = file
      }
      // 不自动上传
      return false
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let formData = new FormData()
          if (this.picFile) { // 1.判断上传文件
            formData.set('picFile', this.picFile) // 1.1上传封面，才可以上传视频
            if (this.videoFile) {
              formData.set('videoFile', this.videoFile) // 1.2是否上传视频
            }
          } else { // 1.3都不需要上传
            formData = null
          }
          // 2.发送数据
          if (this.videoInfo) {
            this.edit(this.videoInfoForm, formData)
          } else {
            this.insert(this.videoInfoForm, formData)
          }
        } else {
          return false
        }
      })
    },
    edit(json, formData) {
      this.$store
        .dispatch('videoManage/update', { json, formData })
        .then(() => {
          // 上传成功，处理并展示
          Object.assign(this.videoInfo, this.videoInfoForm)
          this.$message({
            message: '更新视频成功',
            type: 'success'
          })
          this.loading = false
        })
        .catch(error => {
          // 上传失败,处理并展示
          console.log(error)
          const message = this.errorFix(error)
          this.$alert(message, '更新失败', { confirmButtonText: '确定' })
          this.loading = false
        })
    },
    insert(json, formData) {
      this.$store
        .dispatch('videoManage/insert', { json, formData }).then(() => {
          // 上传成功，处理并展示
          this.$message({
            message: '添加视频成功',
            type: 'success'
          })
          this.loading = false
        }).catch(error => {
          // 上传失败,处理并展示
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
      this.$store.commit('videoManage/SET_VIDEOINFO', null)
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
<style lang="scss">
.dialog-Info-container {
  .pic-uploader .el-upload {
    border: 1px dashed #5f3131;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .pic-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .pic-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .pic {
    width: 200px;
    height: 100px;
    display: block;
  }
}
</style>

