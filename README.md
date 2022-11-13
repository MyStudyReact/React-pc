## 1. 项目介绍
`本节目标:`  了解项目的定位和功能

- 项目功能演示 
   - 登录、退出
   - 首页
   - 内容（文章）管理：文章列表、发布文章、修改文章
- 技术 
   - React 官方脚手架 `create-react-app` / vite
   - react hooks
   - 状态管理：mobx
   - UI 组件库：`antd` v4
   - ajax请求库：`axios`
   - 路由：`react-router-dom` 以及 `history`
   - 富文本编辑器：`react-quill`
   - CSS 预编译器：`sass`

## 2. 项目搭建
`本节目标:`  能够基于脚手架搭建项目基本结构

**实现步骤**

1.  使用create-react-app生成项目   `npx create-react-app geek-pc` / 使用vite 生成项目 `npm create vite@latest geek-pc --template`
2.  进入根目录  `cd geek-pc` 
3.  启动项目   `npm run start` / `npm run dev`
4.  调整项目目录结构 
```bash
/src
  /assets         项目资源文件，比如，图片 等
  /components     通用组件
  /pages          页面
  /store          mobx 状态仓库
  /utils          工具，比如，token、axios 的封装等
  App.js          根组件
  index.css       全局样式
  index.js        项目入口
  (main.jsx)      (vite)
```
 <br />**保留核心代码**<br />`src/index.js`
```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```

`src/App.js`
```jsx
export default function App() {
  return <div>根组件</div>
}
```

## 3. 使用gitee管理项目
`本节目标:`  能够将项目推送到gitee远程仓库

**实现步骤**

1. 在项目根目录打开终端，并初始化 git 仓库（如果已经有了 git 仓库，无需重复该步），命令：`git init`
2. 添加项目内容到暂存区：`git add .`
3. 提交项目内容到仓库区：`git commit -m '项目初始化'`
4. 添加 remote 仓库地址：`git remote add origin [gitee 仓库地址]`
5. 将项目内容推送到 gitee：`git push origin master -u`

## 4. 使用scss预处理器
`本节目标:`  能够在CRA中使用sass书写样式

> `SASS` 是一种预编译的 CSS，作用类似于 Less。由于 React 中内置了处理 SASS 的配置，所以，在 CRA 创建的项目中，可以直接使用 SASS 来写样式


**实现步骤**

1.  安装解析 sass 的包：`npm i sass -D` 
2.  创建全局样式文件：`index.scss` 

```css
body {
  margin: 0;
}

#root {
  height: 100%;
}
```

## 5.别名配置
`本节目标:` 能够配置配置别名 @为src 引入
### vite
**实现步骤**
1. 在 vite.config.js 里面引入 path : `import path from path`
2. 在 defineConfig 里的resolve 配置别名: `alias: {'@': path.resolve(__dirname2, 'src')}`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    //配置别名 @为src 引入
    alias: {
      '@': path.resolve(__dirname2, 'src')
    }
  }
})
```
### create-react-app 
> [自定义 CRA 的默认配置](https://ant.design/docs/react/use-with-create-react-app-cn#%E9%AB%98%E7%BA%A7%E9%85%8D%E7%BD%AE)<br />[craco 配置文档](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration)
> - CRA 将所有工程化配置，都隐藏在了 `react-scripts` 包中，所以项目中看不到任何配置信息
> - 如果要修改 CRA 的默认配置，有以下几种方案： 
>    1. 通过第三方库来修改，比如，`@craco/craco`  （推荐）
>    2. 通过执行 `yarn eject` 命令，释放 `react-scripts` 中的所有配置到项目中



**实现步骤**

1. 安装修改 CRA 配置的包：`yarn add -D @craco/craco`
2. 在项目根目录中创建 craco 的配置文件：`craco.config.js`，并在配置文件中配置路径别名
3. 修改 `package.json` 中的脚本命令
4. 在代码中，就可以通过 `@` 来表示 src 目录的绝对路径
5. 重启项目，让配置生效

**代码实现**<br />`craco.config.js`
```javascript
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

package.json
```json
// 将 start/build/test 三个命令修改为 craco 方式
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

## 6. @别名路径提示
`本节目标:`  能够让vscode识别@路径并给出路径提示<br />**实现步骤**

1. 在项目根目录创建 `jsconfig.json` 配置文件
2. 在配置文件中添加以下配置

**代码实现**
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

vscode会自动读取`jsconfig.json` 中的配置，让vscode知道@就是src目录

## 7. 配置基础路由
`本节目标:` 能够配置登录页面的路由并显示到页面中

**实现步骤**

1. 安装路由：`npm i react-router-dom`
2. 在 pages 目录中创建两个文件夹：Login、Layout
3. 分别在两个目录中创建 index.js 文件，并创建一个简单的组件后导出
4. 在 App 组件中，导入路由组件以及两个页面组件
5. 配置 Login 和 Layout 的路由规则

**代码实现**<br />`pages/Login/index.js`
```jsx
const Login = () => {
  return <div>login</div>
}
export default Login
```

`pages/Layout/index.js`
```jsx
const Layout = () => {
  return <div>layout</div>
}
export default Layout
```

`app.js`
```jsx
// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 导入页面组件
import Login from './pages/Login'
import Layout from './pages/Layout'

// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
```

## 8. 组件库antd使用
`本节目标:`  能够使用antd的Button组件渲染按钮

**实现步骤**

1. 安装 antd 组件库：`yarn add antd`
2. 全局导入 antd 组件库的样式
3. 导入 Button 组件
4. 在 Login 页面渲染 Button 组件进行测试

**代码实现**<br />`src/index.js`
```javascript
// 先导入 antd 样式文件
// https://github.com/ant-design/ant-design/issues/33327
import 'antd/dist/antd.min.css'
// 再导入全局样式文件，防止样式覆盖！
import './index.css'
```

`pages/Login/index.js`
```jsx
import { Button } from 'antd'

const Login = () => (
  <div>
    <Button type="primary">Button</Button>
  </div>
)
```

## 9 安装dev-tools调试工具
> [https://gitee.com/react-cp/react-pc-doc](https://gitee.com/react-cp/react-pc-doc)  这里找到dev-tools.crx文件

# Layout模块
## 1. 处理Token失效
`本节目标:`  能够在响应拦截器中处理token失效

> 说明：为了能够在非组件环境下拿到路由信息，需要我们安装一个history包 或者直接用`window.location.href = '/login'`


![historyoutside.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1657200468221-a17937f9-baec-4acf-be7e-988d2be895df.png#clientId=ue19197e8-cdf9-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=drop&id=ue21b7358&name=historyoutside.png&originHeight=910&originWidth=1794&originalType=binary&ratio=1&rotation=0&showTitle=false&size=115916&status=error&style=none&taskId=uf2d10f89-83fe-4317-a6e2-bfc3cd0b7f5&title=)

**实现步骤**

1. 安装history包：`npm i history`
2. 创建 `utils/history.js`文件
3. 在app.js中使用我们新建的路由并配置history参数
4. 通过响应拦截器处理 token 失效，如果发现是401调回到登录页

**代码实现**<br />`utils/history.js`
```javascript
// https://github.com/remix-run/react-router/issues/8264

import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}
```

`app.js`
```jsx
import { HistoryRouter, history } from './utils/history'

function App() {
  return (
    <HistoryRouter history={history}>
       ...省略无关代码
    </HistoryRouter>
  )
}

export default App
```

`utils/http.js`
```javascript
import { history } from './history'

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      // 删除token
      clearToken()
      // 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  }
)
```

## 2. 首页Home图表展示

`本节目标:`  实现首页echart图表封装展示

![home.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1657200438057-cf9219c1-cbe7-4a04-89c2-c4cc464b9d8d.png#clientId=ue19197e8-cdf9-4&crop=0&crop=0&crop=1&crop=1&errorMessage=unknown%20error&from=drop&id=u6a7e1fa6&name=home.png&originHeight=816&originWidth=1969&originalType=binary&ratio=1&rotation=0&showTitle=false&size=33840&status=error&style=none&taskId=ub52c7310-ed9f-4b4f-b940-89e9936e55d&title=)

**需求描述：**

1. 使用eharts配合react封装柱状图组件Bar
2. 要求组件的标题title，横向数据xData，纵向数据yData，样式style可定制

**代码实现**<br />`components/Bar/index.js`
```jsx
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'

function echartInit (node, xData, sData, title) {
  const myChart = echarts.init(node)
  // 绘制图表
  myChart.setOption({
    title: {
      text: title
    },
    tooltip: {},
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: sData
      }
    ]
  })
}

function Bar ({ style, xData, sData, title }) {
  // 1. 先不考虑传参问题  静态数据渲染到页面中
  // 2. 把那些用户可能定制的参数 抽象props (1.定制大小 2.data 以及说明文字)
  const nodeRef = useRef(null)
  useEffect(() => {
    echartInit(nodeRef.current, xData, sData, title)
  }, [xData, sData])

  return (
    <div ref={nodeRef} style={style}></div>
  )
}

export default Bar
```

`pages/Home/index.js`
```jsx
import Bar from "@/components/Bar"
import './index.scss'
const Home = () => {
  return (
    <div className="home">
      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        sData={[50, 60, 70]}
        title='三大框架满意度' />

      <Bar
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        sData={[50, 60, 70]}
        title='三大框架使用度' />
    </div>
  )
}

export default Home
```

`pages/Home/index.scss`

```css
.home {
  width: 100%;
  height: 100%;
  align-items: center;
}
```

# 发布文章模块
# 1. 富文本编辑器
`本节目标:`  能够安装并初始化富文本编辑器

**实现步骤**

1. 安装富文本编辑器：`npm i react-quill@2.0.0-beta.2 --force`  [react-quill需要安装beta版本适配react18 否则无法输入中文]
2. 导入富文本编辑器组件以及样式文件
3. 渲染富文本编辑器组件
4. 通过 Form 组件的 `initialValues` 为富文本编辑器设置初始值，否则会报错
5. 调整富文本编辑器的样式

**代码实现**<br />`pages/Publish/index.js`
```jsx
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  return (
    // ...
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      // 注意：此处需要为富文本编辑表示的 content 文章内容设置默认值
      initialValues={{ content: '' }}
    >
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入文章内容' }]}
      >
        <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
      </Form.Item>
    </Form>
  )
}
```

`pages/Publish/index.scss`
```css
.publish-quill {
  .ql-editor {
    min-height: 300px;
  }
}
```

## 2.上传封面实现
`本节目标:` 能够实现上传图片

**实现步骤**

1. 为 Upload 组件添加 action 属性，指定封面图片上传接口地址
2. 创建状态 fileList 存储已上传封面图片地址，并设置为 Upload 组件的 fileList 属性值
3. 为 Upload 添加 onChange 属性，监听封面图片上传、删除等操作
4. 在 change 事件中拿到当前图片数据，并存储到状态 fileList 中

**代码实现**
```jsx
import { useState } from 'react'

const Publish = () => {
  const [fileList, setFileList] = useState([])
  // 上传成功回调
  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
  }

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList
      action="http://geek.itheima.net/v1_0/upload"
      fileList={fileList}
      onChange={onUploadChange}
    >
      <div style={{ marginTop: 8 }}>
        <PlusOutlined />
      </div>
    </Upload>
  )
}
```
**温馨提示**
> 必须设置fileList，不然只执行一次，里面还拿不到 response
> onUploadChange就会执行三次，在上传之前，上传刚好结束，上传完成

> 参考链接 [CSDN网址]:https://blog.csdn.net/guxuehua/article/details/108501507

## 3. 暂存图片列表实现
`本节目标:` 能够实现暂存已经上传的图片列表，能够在切换图片类型的时候完成切换

**问题描述**<br />如果当前为三图模式，已经完成了上传，选择单图只显示一张，再切换到三图继续显示三张，该如何实现？

**实现思路**<br />在上传完毕之后通过ref存储所有图片，需要几张就显示几张，其实也就是把ref当仓库，用多少拿多少

**实现步骤 （特别注意useState异步更新的坑）**

1. 通过useRef创建一个暂存仓库，在上传完毕图片的时候把图片列表存入
2. 如果是单图模式，就从仓库里取第一张图，以**数组的形式**存入fileList
3. 如果是三图模式，就把仓库里所有的图片，以**数组的形式**存入fileList

**代码实现**
```javascript
const Publish = () => {
  // 1. 声明一个暂存仓库
  const fileListRef = useRef([])
  
  // 2. 上传图片时，将所有图片存储到 ref 中
  const onUploadChange = info => {
    // ...
    fileListRef.current = imgUrls
  }
  
  // 3. 切换图片类型
  const changeType = e => {
    // 使用原始数据作为判断条件
    const count = e.target.value
    setMaxCount(count)

    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }

}
```

# 项目打包
## 1. 项目打包
`本节目标:` 能够通过命令对项目进行打包

**使用步骤**

1. 在项目根目录下打开终端，输入打包命令：`yarn build`
2. 等待打包完成，打包生成的内容被放在根下的build文件夹中

## 2. 项目本地预览
`本节目标:` 能够在本地预览打包后的项目


1. 全局安装本地服务包 `npm i -g serve`  该包提供了serve命令，用来启动本地服务
2. 在项目根目录中执行命令 `serve -s ./build`  在build目录中开启服务器
3. 在浏览器中访问：`http://localhost:3000/` 预览项目

## 3. 打包体积分析
`本节目标:`   能够分析项目打包体积<br />**分析说明**通过分析打包体积，才能知道项目中的哪部分内容体积过大，才能知道如何来优化

**使用步骤**

1. 安装分析打包体积的包：`yarn add source-map-explorer`
2. 在 package.json 中的 scripts 标签中，添加分析打包体积的命令
3. 对项目打包：`yarn build`（如果已经打过包，可省略这一步）
4. 运行分析命令：`yarn analyze`
5. 通过浏览器打开的页面，分析图表中的包体积

**核心代码**：<br />package.json 中：
```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```

## 4. 优化-配置CDN
`本节目标:`  能够对第三方包使用CDN优化

**分析说明**：通过 craco 来修改 webpack 配置，从而实现 CDN 优化

**核心代码**<br />`craco.config.js`
```javascript
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
```

`public/index.html`
```html
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.userOptions.cdn.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

## 5. 优化-路由懒加载
`本节目标:`   能够对路由进行懒加载实现代码分隔<br />**使用步骤**

1. 在 App 组件中，导入 Suspense 组件
2. 在 路由Router 内部，使用 Suspense 组件包裹组件内容
3. 为 Suspense 组件提供 fallback 属性，指定 loading 占位内容
4. 导入 lazy 函数，并修改为懒加载方式导入路由组件

**代码实现**<br />`App.js`
```jsx
import { Routes, Route } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { AuthRoute } from './components/AuthRoute'

// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
```

**查看效果**<br />我们可以在打包之后，通过切换路由，监控network面板资源的请求情况，验证是否分隔成功