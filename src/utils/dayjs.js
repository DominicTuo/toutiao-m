import dayjs from 'dayjs'
import Vue from 'vue'
// 加载语言配置
import 'dayjs/locale/zh-cn'// ES 2015 
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对事件的插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')// 全局使用中文

// 定义全局过滤器，实现时间的相对格式化
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})

