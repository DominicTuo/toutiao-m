/**
 * 封装 axios请求模块
*/
import axios from 'axios'
import store from '@/store'

const request = axios.create({
    baseURL : 'http://toutiao.itheima.net'  //基础路径
})

// 设置请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config);36 
    // 必须将config返回,否则请求失败
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

export default request