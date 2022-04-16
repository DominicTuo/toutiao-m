<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { updateUerInfo } from "@/api/user";
export default {
  name: "UpdateGender",
  props : {
      value : {
      type : Number,
      required : true
      }
  },
  data(){
      return {
          columns: ['男', '女'],
          gender : this.value // 当前选中性别索引
      }
  },
  methods: {
       async onConfirm() {
      // 点击完成显示loading状态
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
          await updateUerInfo({
            gender: this.gender,
          });
          // 关闭弹出层
          this.$emit("close");
          // console.log(data);
          this.$toast.success("更新性别成功");
          // 更新视图数据
          this.$emit("input", this.gender);
      } catch (err) {
        this.$toast("更新失败", err);
      }
    },
    onChange(picker, value, index){
        // 获取选中值索引
        this.gender = index
    }
  }
};
</script>

<style>
</style>