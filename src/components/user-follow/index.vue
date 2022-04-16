<template>
  <van-button
    v-if="value"
    class="follow-btn"
    round
    size="small"
    @click="onFallowAuther"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFallowAuther"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import {fallowAuther,deleteFallowAuther} from '@/api/user'
export default {
  name: "UserFollow",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    userId : {
        type : [String,Number,Object],
        required : true
    }
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onFallowAuther() {
      //关注用户和取消关注用户
      // 开启loading显示状态
      this.loading = true;
      try {
        if (this.value) {
          // 已关注,点击执行取消关注
          await deleteFallowAuther(this.userId);
        } else {
          // 未关注，点击执行关注
          await fallowAuther(this.userId);
        }
        // 更新视图状态
        // this.article.is_followed = !this.article.is_followed;
        this.$emit('input',!this.value)
      } catch (err) {
        let message = "操作失败,请稍后重试";
        if (err.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast(message);
      }
      // 关闭loading的显示状态
      this.loading = false;
    },
  },
};
</script>

<style>
</style>