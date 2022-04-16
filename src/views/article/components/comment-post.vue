<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="postComment"
      :disabled="!message"
    >发布</van-button>
  </div>
</template>

<script>
import {addComment} from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject : {
     articleId : {
        type : [Number,String,Object],
        default : null
      }
  },
  props: {
      target : {
          type : [Number,String,Object],
          required : true
      },
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async postComment(){
          try {
              const {data} = await addComment({
                  target : this.target.toString(),
                  content : this.message,
                  art_id : this.articleId ? this.articleId : null
              })
            //   关闭弹出层
            //   将刚刚发表的内容放到评论列表的最上面
            this.$emit('postCommentSuccess', data.data)
            this.$toast.success('评论成功')
          } catch (err) {
              this.$toast('操作失败,请重试')
          }
      }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>