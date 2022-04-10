<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div class="header logined" v-if="user">
      <div class="logined-info">
        <div class="img-name">
          <van-image
            round
            fit="cover"
            class="avatar"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <van-button round size="mini" type="default">编辑资料</van-button>
      </div>
      <div class="logined-data">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <!-- 未登录头部 -->
    <div class="not-login header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 宫格导航grid -->
    <van-grid class="grid" :column-num="2" clickable>
      <van-grid-item>
        <i slot="icon" class="shouchang toutiao toutiao-shoucang"></i>
        <span class="grid-text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="lishi toutiao toutiao-lishi"></i>
        <span class="grid-text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航grid -->
    <!-- 消息通知、小智同学、退出登录 -->
    <van-cell class="notice" value="消息通知" is-link />
    <van-cell class="schoolmate" value="小智同学" is-link />
    <van-cell
      class="exit-login"
      value="退出登录"
      clickable
      v-if="user"
      @click="unlogin"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfo } from '@/api/login'
export default {
  data(){
    return {
      userInfo : {},  //用户基本数据
    }
  },
  name: "MyIndex",
  computed: {
    ...mapState(["user"]),
  },
  created(){
    // 判断用户是否登录,如果登录获取用户基本数据
    if(this.$store.state.user){
      this.getUserInfomation()
    }
  },
  methods: {
    unlogin() {
      //点击确认退出
      // 在组件内调用vant反馈弹框使用this.$
      this.$dialog.confirm({
        title: "确认退出吗?",
      })
        .then(() => {
          // 确认执行此
          // 退出登录就是删除当前页面的user和本地存储中的user
          this.$store.commit('setUser',null)
        })
        .catch(() => {
          // 取消执行此
        });
    },
    // 定义获取用户数据的方法
    async getUserInfomation(){
      try {
        const {data} = await getUserInfo()
        // console.log(data);
        this.userInfo = data.data
      } catch (error) {
        if(error.response.status === 401){
          this.$toast('用户数据获取失败,请稍后重试')
        }
      }
    }
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 366px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
}
.logined {
  .logined-info {
    height: 231px;
    padding: 81px 33px 31px 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .img-name {
      display: flex;
      align-items: center;

      .avatar {
        width: 132px;
        height: 132px;
        border: 4px solid #fff;
        margin-right: 22px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .logined-data {
    height: 135px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .data-item {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .count {
        font-size: 36px;
        color: #fff;
        margin-bottom: 3px;
      }
      .text {
        font-size: 23px;
        color: #fff;
      }
    }
  }
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;

  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }

    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.grid {
  .shouchang {
    color: #eb5253;
  }
  .lishi {
    color: #ff9d1d;
  }
  i.toutiao {
    font-size: 45px;
  }
  .grid-text {
    font-size: 28px;
  }
}
.notice {
  margin-top: 9px;
}
.schoolmate {
  margin-bottom: 9px;
}
.exit-login {
  .van-cell__value--alone {
    text-align: center;
    color: #d86262;
  }
}
</style>