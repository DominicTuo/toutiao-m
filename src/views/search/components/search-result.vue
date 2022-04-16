<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //默认是第一页数据
      perPage: 10, //控制每页的获取的数量
      error : false
    };
  },
  methods: {
    async onLoad() {
      // 调方法,拿结果
      try {
        const { data } = await getSearchResults({
          q: this.searchText,
          page: this.page,
          per_page: this.perPage,
        });
        // 模拟
        const { results } = data.data;
        this.list.push(...results);
        if (results.length > 0) {
          this.page++;
          this.loading = false;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
  },
};
</script>

<style>
</style>