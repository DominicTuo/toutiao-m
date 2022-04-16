<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon @click="$emit('close')" slot="left" name="cross" color="blue" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <CommentItem :comment="comment" />
      <!-- 评论回复列表 -->
      <van-cell title="全部回复" />
      <AtricleList
      :source="comment.com_id"
      :type="type"
      :list="comReplyList"
      />
      <!-- /评论回复列表 -->
    </div>
    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button class="write-btn" size="small" @click="isReplyPopShow = true" round>写评论</van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 回复评论弹层 -->
    <van-popup v-model="isReplyPopShow" position="bottom">
      <CommentPost
        :target="comment.com_id"
        @postCommentSuccess="postComSuccess"
      />
    </van-popup>
    <!-- 回复评论弹层 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import AtricleList from "./article-list.vue";
import CommentPost from "./comment-post.vue"
export default {
  name: "CommentReply",
  data() {
    return {
      type: "c",
      isReplyPopShow : false,
      comReplyList : []     //回复列表
    };
  },
  components: {
    CommentItem,
    AtricleList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods : {
      postComSuccess(data){
        //   关闭弹层
          this.isReplyPopShow = false
        //   更改回复数量
        this.comment.reply_count++
        // 更改回复视图
        this.comReplyList.unshift(data.new_obj)
      }
  }
};
</script>

<style lang="less" scoped>
scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>