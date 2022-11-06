import { useRoutes } from 'react-router-dom'
import { lazy } from "react"

const Login = lazy(() => import("@/pages/Login"))
const Layout = lazy(() => import("@/pages/Layout"))

const routesList = [
  {
    path: '/',
    element: <Layout />
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