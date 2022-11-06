import { useRoutes } from 'react-router-dom'
import { lazy } from "react"

// 引入鉴权组件
import { AuthComponent } from "@/components/AuthComponent"

const Login = lazy(() => import("@/pages/Login"))
const Layout = lazy(() => import("@/pages/Layout"))

const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))

const routesList = [
  /**
   * Layout是需要鉴权处理的,
   * 这里的Layout不能写死，要根据是否登录进行判断
   */
  {
    path: '/',
    element: <AuthComponent><Layout /></AuthComponent>,
    children: [
      {
        path: "",
        index: true,
        element: <Home />,
      },
      {
        path: "/article",
        element: <Article />,
      },
      {
        path: "/publish",
        element: <Publish />,
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
]


const WrapperRoutes = () => {
  return useRoutes(routesList)
}

export default WrapperRoutes