<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索栏 -->
    <div class="search-com">
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText" />
    <!-- /搜索结果 -->
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- /搜索建议 -->
    <!-- 搜索历史 -->
    <search-history
    v-else :historyList="searchHistories"
    @deleteAllHistory = "searchHistories = []"
    @search = "onSearch"
    />
    <!-- /搜索历史 -->
    </div>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import {setItem ,getItem} from '@/utils/storage'
export default {
  name: "SearchIndex",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      isResultShow: false, //控制搜索结果组件是否显示
      searchHistories : getItem('LOCAL_SEARCH_HISTORY') || [], //搜索的历史记录,从本地存储中获取,实现数据的持久化
    };
  },
  watch : {
    searchHistories(val){
      // 将搜索历史存储到本地存储中，实现数据的持久化
      setItem('LOCAL_SEARCH_HISTORY',val)
    }
  },
  methods: {
    onSearch(text) {
      this.searchText = text;
      // 搜索时将搜索的内容存入历史记录
      // 历史记录不能重复,最先输入的要在最上面
      const indexIf = this.searchHistories.indexOf(text)
      if(indexIf !== -1){
        this.searchHistories.splice(indexIf,1)
      }
      this.searchHistories.unshift(text)
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .search-com {
    padding-top: 108px;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>