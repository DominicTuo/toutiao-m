<template>
  <div class="user-profile-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->
    <!-- 文件上传input -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avator"
        round
        fit="cover"
        :src="user.photo"
        @click="$refs.file.click()"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />
    <!-- /个人信息 -->
    <!-- 编辑昵称 -->
    <van-popup
      style="height: 100%"
      v-model="isUpdateNameShow"
      position="bottom"
    >
      <UpdateName
        v-if="isUpdateNameShow"
        v-model="user.name"
        @close="isUpdateNameShow = false"
      />
    </van-popup>
    <!-- /编辑昵称 -->

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <UpdateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- /编辑生日 -->

    <!-- 编辑头像 -->
    <van-popup
    v-model="isUpdatePhotoShow"
    position="bottom"
    style="height:100%"
    >
      <UpdatePhoto
      v-if="isUpdatePhotoShow"
      :img="img"
      @close="isUpdatePhotoShow = false"
      @update-photo = "user.photo = $event"
       />
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserPorfile } from "@/api/user";
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-brithday.vue";
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
      isUpdateNameShow: false, //控制更新昵称弹出层
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow : false,
      img : ''
    };
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created() {
    this.onGetUserPorfile();
  },
  methods: {
    async onGetUserPorfile() {
      try {
        const { data } = await getUserPorfile();
        // console.log(data);
        this.user = data.data;
      } catch (err) {
        this.$toast("请求用户信息失败");
      }
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file);
      // 打开弹出层
      this.isUpdatePhotoShow = true

      // 两次选取一样的图片不能渲染出来
      this.$refs.file.value = ''
    },
  },
};
</script>

<style lang="less" scoped>
.user-profile-container {
  /deep/ .van-nav-bar__left {
    .van-icon {
      color: #fff;
    }
  }
  .avator {
    width: 70px;
    height: 70px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>