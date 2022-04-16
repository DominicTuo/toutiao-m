// 用户相关的模块
import request from "@/utils/request";

// 关注用户
export const fallowAuther = target => {
    return request({
        method : 'POST',
        url : '/v1_0/user/followings',
        data : {
            target
        }
    })
}

// 取消关注用户
export const deleteFallowAuther = target => {
    return request({
        method : 'DELETE',
        url : `/v1_0/user/followings/${target}`,
    })
}

// 获取用户数据
export const getUserPorfile = () => {
    return request({
        method : 'GET',
        url : '/v1_0/user/profile',
    })
}

// 更新用户信息
export const updateUerInfo = data => {
    return request({
        method : 'PATCH',
        url : '/v1_0/user/profile',
        data
    })
}

// 更新用户头像
export const updateUserPhoto = data => {
    return request({
        method : 'PATCH',
        url : '/v1_0/user/photo',
        data
    })
}