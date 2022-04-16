<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error="error"
    error-text="评论获取失败,请点击重试"
    :immediate-check="false"
  >
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from './comment-item.vue'
export default {
  name: "AtricleList",
  components : {
      CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list : {
      type : Array,
      // porps中表示空数组和空对象要使用函数返回的方式
      default : () => []
    },
    type : {
      type : String,
      default : 'a',
      validitor : (value) => {
        return ['a','c'].includes(value)
      }
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      error: false, //控制获取评论失败提示
      offset: null, //获取评论个数的偏移量
    };
  },
  created(){
    this.loading = true
      this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type, //对文章的评论
          source: this.source.toString(),
          offset: this.offset,
          limit: 10,
        });
        // console.log(data);
        const { results } = data.data;
        // 将获取到的数据追加到list中
        this.list.push(...results);

        // 将文章评论的总数量传递到父组件中
        this.$emit('success-load',data.data.total_count)
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>