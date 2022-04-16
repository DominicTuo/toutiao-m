<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm = "onConfirm"
    />
  </div>
</template>

<script>
import { updateUerInfo } from "@/api/user";
import dayjs from 'dayjs'
export default {
  name: "UpdateBirthday",
  props : {
      value : {
          type : String,
          required : true
      }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  methods : {
      async onConfirm() {
          const thisDirthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 点击完成显示loading状态
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      try {
          await updateUerInfo({
            birthday: thisDirthday,
          });
          // 关闭弹出层
          this.$emit("close");
          // console.log(data);
          this.$toast.success("更新性别成功");
          // 更新视图数据
          this.$emit("input", thisDirthday);
      } catch (err) {
        this.$toast("更新失败", err);
      }
      }
  }
}
</script>

<style>
</style>