<template>
  <div class="article-list">
    <van-pull-refresh
    v-model="refreshing"
    @refresh="onRefresh"
    :success-text="refreshMsg"
    success-duration = "1500"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        />
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from '@/components/article-item'
export default {
  name: "ArticleList",
  components : {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timeStamp: "",
      error: false,
      refreshing: false,
      refreshMsg : ''
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timeStamp || Date.now(),
        });
        // 模拟随机请求失败
        // if(Math.random() > 0.5){
        //     JSON.parse('asdjflk')
        // }
        const { results } = data.data;
        this.list.push(...results);
        if (results.length) {
          this.loading = false;
          this.timeStamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh(){
        try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });

        // 模拟随机请求失败
        // if(Math.random() > 0.5){
        //     JSON.parse('asdjflk')
        // }

        const results = data.data.results
        this.list.unshift(...results)
        this.refreshMsg = `获取数据成功,共新获取${results.length}条数据`
        this.refreshing = false
      } catch (error) {
          this.refreshing = false
          this.refreshMsg = '刷新失败'
      }
    }
  },
};
</script>

<style lang="less" scoped>
.article-list {
    height: 79vh;
    overflow-y: auto;
}
</style>