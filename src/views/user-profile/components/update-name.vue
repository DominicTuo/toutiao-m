<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="返回"
      right-text="确认"
      @click-left="$emit('click')"
      @click-right="onUpdateName"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="name-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUerInfo } from "@/api/user";
export default {
  name: "UpdateName",
  data() {
    return {
      localName: this.value,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onUpdateName() {
      // 点击完成显示loading状态
      this.$toast.loading({
        message: "保存中",
        forbidClick: true,
        duration: 0,
      });
      try {
        if (this.localName === "") {
          this.$toast("用户昵称不能为空");
          return;
        } else {
          await updateUerInfo({
            name: this.localName,
          });
          // 关闭弹出层
          this.$emit("close");
          // console.log(data);
          this.$toast.success("更新昵称成功");
          // 更新视图数据
          this.$emit("input", this.localName);
        }
      } catch (err) {
        this.$toast("更新失败", err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.name-wrap {
  padding: 20px;
}
</style>