// 1.判断token 是否存在
// 2.如果存在 直接正常渲染
// 3.如果不存在 重定向道登录路由

/**
 * 高阶组件
 * 把一个组件当成另外一个组件的参数传入
 * 然后通过一定的判断 返回新的组件
 */
import { Navigate } from 'react-router-dom'

import { getToken } from '@/utils'

const AuthComponent = ({ children }) => {
  const isToken = getToken()
  if (isToken) {
    return (<>{children}</>)
  } else {
    return (<><Navigate to='/login' replace></Navigate></>)
  }
}
// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

export { AuthComponent }