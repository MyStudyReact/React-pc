import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入antd样式文件
import 'antd/dist/antd.css'

// 引入index.scss
import './index.scss'

// 需要去掉严格模式，否则他会掉两次接口，但是只会在开发模式下生效
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
