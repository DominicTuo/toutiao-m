<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div class="title" slot="title">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        round
        size="mini"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="channle-item"
        v-for="(channel, index) in mychannles"
        :key="index"
        @click="updateChannel(channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fixedChannel.includes(channel.id)"
        ></van-icon>
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div class="title" slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="commend-grid" :gutter="10">
      <van-grid-item
        class="channle-item"
        v-for="channel in recommendChannels"
        :key="channel.id"
        icon="plus"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { 
    getAllChannels,
    addUserChannel,
    deleteUserChannel
     } from "@/api/channel";
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default { 
  name: "ChannelEdit",
  props: {
    mychannles: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false, //控制编辑完成状态
      fixedChannel: [0], //固定的频道栏,不能用户编辑
    };
  },
  created() {
    this.loadAllChannels();
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannels) => {
        return !this.mychannles.find((myChannels) => {
          return allChannels.id === myChannels.id;
        });
      });
    },
    ...mapState(['user'])
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        this.allChannels = data.data.channels;
      } catch (error) {
        this.$toast("所有频道获取失败");
      }
    },
    async addChannel(channel) {
      this.mychannles.push(channel);
    //如果用户未登录，则添加到本地，如果用户已登录，则添加到后台
    if(this.user){
        // 用户已登录
        try {
            await addUserChannel([{
            id : channel.id,    //要添加频道的id
            seq : this.mychannles.length    //更新后数组的长度
        }])
        } catch (error) {
            this.$toast('添加频道失败，请稍后重试')
        }
    }else{
        // 用户未登录
        setItem('LOCAL_CHANNELS',this.mychannles)
    }
    },
    updateChannel(channel, index) {
      //判断是编辑操作还是跳转操作
      if (this.isEdit) {
        //   如果是固定项，则不能删除
        if(this.fixedChannel.includes(channel.id)){
            return
        }
        //   编辑状态，执行删除功能
        this.mychannles.splice(index, 1);
        // 改变激活索引,不关闭弹框
        if (index <= this.active) {
            this.$emit("updateCheckChannel", this.active-1);
        }
        // 处理数据持久化
        this.deleteChannel(channel)
      } else {
        //   非编辑状态，执行跳转功能
        this.$emit("updateCheckChannel", index,false);
      }
    },
    async deleteChannel(channel){
        if(this.user){
            //用户已登录
            try {
            await deleteUserChannel(channel.id)
            } catch (error) {
                this.$toast('操作失败,请稍后重试')
            }
        }else{
            //用户未登录
            setItem('LOCAL_CHANNELS',this.mychannles)
        }
    }
  },
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 100px 0;
  .title {
    font-size: 32px;
    color: #333333;
  }
  /deep/ .edit-btn {
    width: 104px;
    height: 48px;
    border: 1px solid #f85e5e;
    .van-button__text {
      font-size: 26px;
      color: #f85e5e;
    }
  }
  /deep/ .channle-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap; //限制文字折行
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.commend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon-plus {
        font-size: 24px;
        margin-right: 6px;
      }
    }
  }
  /deep/ .my-grid {
    .van-icon-clear {
      font-size: 30px;
      position: absolute;
      right: -10px;
      top: -10px;
      color: #cacaca;
      z-index: 3;
    }
  }
}
</style>
