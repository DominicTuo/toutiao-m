// 登录相关方法封装
import request from '@/utils/request'
// import store from '@/store'

// 用户输入登录验证
export const login = (data) =>{
    return request({
        method : 'POST',
        url : '/v1_0/authorizations',
        data
    })
}

// 发送验证码
export const sendSms = (mobile) =>{
    return request({
        method : 'GET',
        url : `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户登录后的基本信息
export const getUserInfo = () =>{
    return request({
        method : 'GET',
        url : '/v1_0/user',
        // headers : {
        //     // 在header中放入用户的token信息必须注意Bearer后面的空格,否则请求不能生效
        //     Authorization : `Bearer ${store.state.user.token}`
        // }
    })
}

// 获取用户登录后的频道信息
export const getUserChannels = () =>{
    return request({
        method : 'GET',
        url : '/v1_0/user/channels',
        // headers : {
        //     // 在header中放入用户的token信息必须注意Bearer后面的空格,否则请求不能生效
        //     Authorization : `Bearer ${store.state.user.token}`
        // }
    })
}