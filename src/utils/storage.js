// 封装本地存储相关的模块

// 向本地存储中存数据
export const setItem = (key,value) => {
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    localStorage.setItem(key,value)
}

//从本地存储中取数据
export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return localStorage.getItem(key)
    }
}

//从本地存储中删除数据
export const removeItem = (key) => {
    localStorage.removeItem(key)
}