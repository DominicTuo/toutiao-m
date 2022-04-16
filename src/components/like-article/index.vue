<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value === 1 }"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "likeArticle",
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onLike() {
      this.loading = true;
      try {
        let status = -1
        if (this.value === 1) {
          // 已对文章点赞,取消对文章点赞
          await deleteLike(this.articleId);
          this.$toast.success('取消点赞')
        } else {
          // 取消了对文章的点赞,对文章点赞
          await addLike(this.articleId);
          status = 1
          this.$toast.success('点赞成功')
        }
        // 改变视图状态
        this.$emit('input',status)
      } catch (err) {
          this.$$toast('操作失败,请稍后重试')
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: tomato;
  }
}
</style>