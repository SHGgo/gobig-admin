<!-- 用户管理 -->
<template>
  <div class="app-container">
    <search-bar />
    <button-bar class="button-bar" />
    <!-- <state-bar /> -->
    <show-table />
    <insert-and-edit-user-info :dialog-info-visible.sync="dialogInfoVisible" />
  </div>
</template>

<script>
import ButtonBar from './components/ButtonBar'
import SearchBar from './components/SearchBar'
import StateBar from './components/StateBar'
import ShowTable from './components/ShowTable'
import InsertAndEditUserInfo from './components/massageBox/InsertAndEditUserInfo'
export default {
  components: {
    SearchBar,
    ButtonBar,
    ShowTable,
    InsertAndEditUserInfo
  },
  data() {
    return {
      // TODO:修改账号和密码
    }
  },
  computed: {
    dialogInfoVisible: {
      get() {
        return this.$store.state.userManage.dialogInfoVisible
      },
      set(val) {
        this.$store.commit('userManage/SET_DIALOG', val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .button-bar{
    margin-bottom: 20px;
  }
}

</style>
