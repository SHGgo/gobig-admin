<!--  -->
<template>
  <div class="show-table-container">
    <el-table
      ref="showTbale"
      :data="tableData"
      border
      stripe
      empty-text
      style="width: 100%"
    >
      <el-table-column type="index" align="center" width="50" label="序列" />
      <el-table-column property="uid" align="center" label="uid" width="100" />
      <el-table-column property="figure" align="center" label="头像" width="100">
        <template slot-scope="scope">
          <el-image class="figure border-radius-circle" :src="scope.row.figure" :preview-src-list="[scope.row.figure]" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
            <div slot="placeholder" class="image-slot">
              <i class="el-icon-loading" />
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column property="nickName" align="left" label="昵称" width="150" />
      <el-table-column property="gender" align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{ genderFix(scope.row.gender) }}
        </template>
      </el-table-column>
      <el-table-column property="signature" align="left" label="签名" width="400" />
      <el-table-column property="birthDate" align="center" label="生日" width="120">
        <template slot-scope="scope">
          {{ scope.row.birthDate | parseTime('{y}-{m}-{d}') }}
        </template>
      </el-table-column>
      <el-table-column property="attentionCount" align="center" label="关注数" width="100" />
      <el-table-column property="fanCount" align="center" label="粉丝数" width="100" />
      <el-table-column property="likeCount" align="center" label="点赞数" width="100" />
      <el-table-column property="viewCount" align="center" label="播放数" width="100" />
      <el-table-column align="center" label="Actions" min-width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="editUser(scope.row)">
            编辑
          </el-button>
          <el-button type="danger" size="small" icon="el-icon-delete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="pageSearch" />
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
      dialogInfoVisible: false
    }
  },
  computed: {
    watchShowTbale() {
      return this.$store.state.userManage.showTable
    },
    genderFix(genderNum) {
      return (genderNum) => {
        if (Number.parseInt(genderNum) === 1) {
          return '男'
        } else {
          return '女'
        }
      }
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
      this.$store.dispatch('userManage/search', { pageStart, pageItemNum: this.listQuery.limit })
        .then((response) => {
          this.total = response.total
        }).catch((error) => {
          this.$message({
            message: error,
            type: 'error',
            duration: 6 * 1000
          })
        })
    },
    editUser(userInfo) {
      // userInfo是指向table改变的元素的指针
      this.$store.commit('userManage/SET_USERINFO', userInfo)
      this.$store.commit('userManage/SET_DIALOG', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.show-table-container{
  .figure{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width:50px;
    height:50px;
  }
}
</style>
