// 封装axios

import axios from 'axios'
// 实例化 请求拦截器 响应拦截器

// 实例化
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数
  // 对响应式数据的操作
  return response
}, (error) => {
  return Promise.reject(error)
})

export { http }