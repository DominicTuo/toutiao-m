<template>
  <div class="search-history">
      <van-cell title="搜索历史">
          <div v-if="isDeleteShow">
            <span @click="$emit('deleteAllHistory')">全部删除</span>
            &nbsp;
            &nbsp;
            <span @click="isDeleteShow = false">完成</span>
          </div>
          <van-icon v-else name="delete" @click="isDeleteShow = true"/>
      </van-cell>
      <van-cell
      :title="item"
      v-for="(item,index) in historyList"
      :key="index"
      @click="onSearchHistory(item,index)"
      >
          <van-icon name="close" v-show="isDeleteShow"/>
      </van-cell>
  </div>
</template>

<script>
export default {
    name : 'SearchHistory',
    data(){
        return {
            isDeleteShow : false,   //控制删除的显示状态
        }
    },
    props : {
        historyList : {
            type : Array,
            required : true
        }
    },
    methods : {
        onSearchHistory(item,index) {
            if(this.isDeleteShow){
                // 修改状态,点击删除
                this.historyList.splice(index,1)
            }else{
                // 点击搜索
                this.$emit('search',item)
            }
        }
    }
}
</script>

<style>

</style>