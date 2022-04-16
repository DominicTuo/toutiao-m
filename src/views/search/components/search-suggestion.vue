<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(text, index) in suggestions"
      :key="index"
      icon="search"
      @click="$emit('search', text)"
    >
      <!-- v-html可以绑定并渲染带有标签的字符串 -->
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      suggestions: [],
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      //侦听搜索框内容变化,发请求获得联想建议
      // handler(){
      //     this.loadSearchSuggustions()
      // },
      handler: debounce(function () {
        //利用第三方包中的防抖函数实现防抖功能,避免过多的网络开销
        this.loadSearchSuggustions();
      }, 1000),
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggustions() {
      try {
        const { data } = await getSearchSuggestions(this.searchText);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("获取联想建议失败,请重试", err);
      }
    },
    highlight(text) {
      //处理字符高亮
      const highlightStr = `<span class="active">${this.searchText}<span/>`;
      // 使用字符串的replace方法如要全局替换对应的字符串，应使用正则表达式
      // 使用正则表达式的构造函数获取动态的正则表达式
      const reg = new RegExp(this.searchText, "gi");
      if (text === null) {
        return;
      } else {
        return text.replace(reg, highlightStr);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>