<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/article";
export default {
  name: "CollcetArticle",
  data() {
    return {
      loading: false, //控制loading的显示状态
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      // 点击显示loading
      this.loading = true;
      try {
        if (this.value) {
          // 已关注,取消关注
          await deleteCollect(this.articleId);
        } else {
          // 已取消关注,进行关注
          await addCollect(this.articleId);
        }
        // 改变视图状态
        this.$emit('input',!this.value)
        // 操作成功提醒
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
          this.$toast('操作失败,请重试')
      }

      // 结束关闭loading
      this.loading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.collected {
  .van-icon {
    color: greenyellow;
  }
}
</style>