<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" size="22" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormCheck.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormCheck.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时组件 time就是倒计时的时间 -->
          <van-count-down
            @finish="timeCountDownFalg = false"
            :time="1000 * 60"
            format="ss s"
            v-if="timeCountDownFalg === true"
          />
          <van-button
            v-else
            @click="getCode"
            native-type="button"
            class="send-sms-btn"
            size="small"
            type="default"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/login";
export default {
  name: "LoginPage",
  data() {
    return {
      user: {
        mobile: "13911111111", //13911111111
        code: "246810", //246810
      },
      userFormCheck: {
        //表单的验证
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      timeCountDownFalg: false,
    };
  },
  methods: {
    //   提交表单实现登录验证
    async onSubmit() {
      const user = this.user;
      // 登录轻提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const {data} = await login(user);
        this.$toast.success("登录成功");
        // 登录成功,将获取到的token信息放入vuex的user中,实现数据的双向绑定
        this.$store.commit('setUser',data.data)
        console.log("登录成功", data.data);
        // 登录成功,跳转到个人中心,这种做法不完善，后期优化
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码不正确");
          //   console.log("登录失败", err);
        } else {
          this.$toast.fail("登录失败,请稍后再试");
        }
      }
    },
    // 点击获取验证码
    async getCode() {
      try {
        // 点击获取验证码只对手机进行验证
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        //   直接返回,不在执行后面的代码
        return console.log("验证失败", err);
      }
        // 显示倒计时
        this.timeCountDownFalg = true
        // 发送验证码
        try{
            const res = sendSms(this.user.mobile)
            this.$toast('发送成功')
        }catch(err){
            if(err.response.status === 429){
                this.$toast('发送次数太频繁了,请稍后重试')
            }else {
                this.$toast('发送验证码失败,请稍后重试')
            }
        }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  
  .page-nav-bar {

    .van-icon {
      color: #fff;
    }
  }
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    background-color: #ededed;
    border-color: #ededed;
    color: #666666;
    font-size: 22px;
    line-height: 46px;
    border-radius: 23px;
  }
  .login-btn-wrap {
    padding: 53px 28px;
    .login-btn {
      border-radius: 10px;
      background-color: #6db4fb;
    }
  }
}
</style>