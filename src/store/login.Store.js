// login module

import { makeAutoObservable } from 'mobx'

import { http, setToken, getToken, removeToken } from '@/utils'

class LoginStore {
  // token = ''
  token = getToken() || ''

  constructor() {
    // 响应式
    makeAutoObservable(this)
  }

  getToken = async ({ mobile, code }) => {
    // 调用我们的登录接口
    const res = await http.post('/authorizations', { mobile, code })
    // 存入token
    this.token = res.data.token
    // 存入localStorage
    setToken(this.token)
  }

  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore
