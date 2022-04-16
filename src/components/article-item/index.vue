<template>
  <!-- vant中cell单元格中to属性和Router-link中的to属性用法是一样的 -->
  <van-cell
    class="article-Item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id,
      },
    }"
  >
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-img-wrap">
        <van-image
          class="cover-item"
          fit="cover"
          v-for="(img, index) in article.cover.images"
          :key="index"
          slot="default"
          :src="img"
        />
      </div>
      <div class="laber-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      class="right-cover"
      slot="default"
      fit="cover"
      v-if="article.cover.type === 1"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style lang="less" scoped>
.article-Item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
    padding-bottom: 30px;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    margin-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .laber-info-wrap span {
    font-size: 23px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-img-wrap {
    display: flex;
    padding-bottom: 30px;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
}
</style>