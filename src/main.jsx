import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 导入antd样式文件
import 'antd/dist/antd.css'

// 引入index.scss
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
