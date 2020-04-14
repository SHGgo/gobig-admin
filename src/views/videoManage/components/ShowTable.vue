<!--  -->
<template>
  <div class="show-table-container">
    <el-table ref="showTbale" :data="tableData" border stripe empty-text style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="right" class="table-expand">
            <el-form-item label="播放数">
              <span>{{ props.row.viewCount }}</span>
            </el-form-item>
            <el-form-item label="评论数">
              <span>{{ props.row.commentCount }}</span>
            </el-form-item>
            <el-form-item label="点赞数">
              <span>{{ props.row.collectCount }}</span>
            </el-form-item>
            <el-form-item label="得分">
              <span>{{ props.row.vscore }}</span>
            </el-form-item>
            <el-row>
              <el-form-item label="视频">
                <div
                  class="embed-responsive embed-responsive-16by9"
                  style="background-color: black;width:600px"
                >
                  <video :src="props.row.videoRes" preload controls />
                </div>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center" width="50" label="序列" />
      <el-table-column property="vid" align="center" label="vid" width="100" />
      <el-table-column property="pic" align="center" label="封面" width="100">
        <template slot-scope="scope">
          <el-image class :src="scope.row.pic" :preview-src-list="[scope.row.pic]" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column property="title" align="left" label="标题" width="150" />
      <el-table-column property="uid" align="center" label="uid" width="100" />
      <el-table-column property="author" align="left" label="作者" width="100" />
      <el-table-column property="sortName" align="left" label="分类" width="100" />
      <el-table-column property="introduction" align="left" label="介绍" width="400" />
      <el-table-column property="releaseDate" align="center" label="发布日期" width="200">
        <template
          slot-scope="scope"
        >{{ scope.row.releaseDate | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</template>
      </el-table-column>
      <el-table-column align="center" label="Actions" min-width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" :disabled="loading" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteWarning(scope,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>10"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="pageSearch"
    />
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import Pagination from '@/components/Pagination'
export default {
  filters: {
    parseTime
  },
  components: {
    Pagination
  },
  data() {
    return {
      tableData: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogInfoVisible: false,
      loading: false
    }
  },
  computed: {
    watchShowTbale() {
      return this.$store.state.videoManage.showTable
    }
  },
  watch: {
    watchShowTbale(newShowTable) {
      this.tableData = newShowTable.table
      this.total = newShowTable.total
    }
  },
  created() {
    this.pageSearch()
  },
  methods: {
    pageSearch() {
      this.listLoading = true
      const pageStart = (this.listQuery.page - 1) * this.listQuery.limit
      // TODO dispatch多参数传递
      this.$store
        .dispatch('videoManage/search', {
          pageStart,
          pageItemNum: this.listQuery.limit
        })
        .then(response => {
          this.total = response.total
        })
        .catch(error => {
          this.$message({
            message: error,
            type: 'error',
            duration: 6 * 1000
          })
        })
    },
    edit(videoInfo) {
      // userInfo是指向table改变的元素的指针
      this.$store.commit('videoManage/SET_VIDEOINFO', videoInfo)
      this.$store.commit('videoManage/SET_DIALOG', true)
    },
    delete(scope, rows) {
      const json = { vid: scope.row.vid }
      this.$store
        .dispatch('videoManage/delete', json)
        .then(() => {
          // 表格中删除
          rows.splice(scope.$index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(error => {
          this.$alert(error, '删除失败', { confirmButtonText: '确定' })
        })
    },
    deleteWarning(scope, rows) {
      this.$confirm('此操作将永久删除视频, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(scope, rows)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.show-table-container {
  .table-expand {
    font-size: 0;
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }

  .embed-responsive {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
  }

  .embed-responsive::before {
    display: block;
    content: "";
  }

  .embed-responsive video {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  .embed-responsive-21by9::before {
    padding-top: 42.857143%;
  }

  .embed-responsive-16by9::before {
    padding-top: 56.25%;
  }

  .embed-responsive-4by3::before {
    padding-top: 75%;
  }

  .embed-responsive-1by1::before {
    padding-top: 100%;
  }
}
</style>
