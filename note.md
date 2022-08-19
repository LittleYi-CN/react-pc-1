## 1.配置sass环境
1. 安装解析sass的包：`npm install sass -D`
2. 创建全局样式文件：`index.scss`

## 2.配置一级基础路由
1. 安装路由：`npm install react-router-dom`
2. 在pages目录中创建两个文件夹：Login、Layout
3. 分别在两个目录中创建index.js文件，并创建一个简单的组件后导出
4. 在App组件中，导入路由组件以及两个页面组件
5. 配置Login和Layout的路由规则

新建`Layout/index.js`和`Login/index.js`文件
```
function Login() {
  return (
    <>
      Login
    </>
  )
}

export default Login
```
```
function Layout() {
  return (
    <>
      Layout
    </>
  )
}

export default Layout
```
`App.js`中导入路由相关
```
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Layout from './pages/Layout';

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 创建路由对应关系 */}
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## 3.组件库antd使用
1. 安装antd组件库： `npm install antd`
2. 全局导入antd组件库的样式
3. 导入Button组件
4. 在Login页面渲染Button组件进行测试

安装完成之后，`index.js`入口文件导入`import 'antd/dist/antd.min.css'`  
测试一下
```
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Layout from './pages/Layout';
import { Button } from 'antd';

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Primary Button</Button>
        <Routes>
          {/* 创建路由对应关系 */}
          <Route path="/" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
```