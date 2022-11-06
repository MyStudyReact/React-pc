// login module

import { makeAutoObservable } from 'mobx'

import { http } from '@/utils'

class LoginStore {
  token = ''

  constructor() {
    // 响应式
    makeAutoObservable(this)
  }

  setToken = async ({ mobile, code }) => {
    // 调用我们的登录接口
    const res = await http.post('/authorizations', { mobile, code })
    // 存入token
    this.token = res.data
  }
}

export default LoginStore
