<!-- 用户管理 -->
<template>
  <div class="app-container">
    <search-bar />
    <button-bar class="button-bar" />
    <!-- <state-bar /> -->
    <show-table />
  </div>
</template>

<script>
import ButtonBar from './components/ButtonBar'
import SearchBar from './components/SearchBar'
import StateBar from './components/StateBar'
import ShowTable from './components/ShowTable'
export default {
  components: {
    SearchBar,
    ButtonBar,
    StateBar,
    ShowTable
  },
  data() {
    return {

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
