<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        round
        size="small"
        slot="title"
        type="default"
        to="/search"
      >
        <van-icon class="search-icon" name="search" />
        搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 分类导航栏tab -->
    <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。
    通过 swipeable 属性可以开启滑动切换标签页。 -->
    <van-tabs class="home-nav-tabs" v-model="active" animated swipeable>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
        class="hamburger-btn"
        slot="nav-right"
        @click="isChannelCheckShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /分类导航栏tab -->
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelCheckShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :mychannles="channels"
        :active="active"
        @updateCheckChannel="onUpdateChannel"
      ></ChannelEdit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from "@/api/login";
import ArticleList from "./components/articleList.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { mapState } from "vuex";
import { getItem } from "@/utils/storage";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit,
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      active: 0,
      channels: [],
      isChannelCheckShow: false, //控制弹出层是否显示
    };
  },
  created() {
    this.getUserChannels();
  },
  methods: {
    async getUserChannels() {
      try {
        // const { data } = await getUserChannels();
        // this.channels = data.data.channels;
        let channelsList = [];
        if (this.user) {
          //用户已登录,从后台获取数据
          const { data } = await getUserChannels();
          channelsList = data.data.channels;
        } else {
          //用户未登录,从本地获取数据
          const localChannels = getItem("LOCAL_CHANNELS");
          if (localChannels) {
            // 如果本地有数据,则使用本地数据
            channelsList = localChannels;
          } else {
            //如果本地没有数据,则从后端获取默认频道数据
            const { data } = await getUserChannels();
            channelsList = data.data.channels;
          }
        }
        this.channels = channelsList
      } catch (error) {
        this.$toast("获取用户频道失败");
        console.log(error);
      }
    },
    onUpdateChannel(index, isChannelCheckShow = true) {
      this.active = index;
      this.isChannelCheckShow = isChannelCheckShow;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 179px;
  .page-nav-bar {
    // /deep/ .van-nav-bar__title {
    //   max-width: nuset !important;
    // }
    .search-btn {
      width: 555px;
      height: 64px;
      font-size: 28px;
      background-color: #5babfb;
      border: none;
      color: #fff;

      .search-icon {
        color: #fff;
        font-size: 32px;
      }
    }
  }
  /deep/ .home-nav-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 95px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 83px;
      color: #777777;
      font-size: 28px;
    }
    .van-tab--active {
      color: #333333;
      font-size: 30px;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.9;
      i.toutiao {
        font-size: 33px;
        color: #333;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>>
