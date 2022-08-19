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

## 4.配置别名路径
> **自定义CRA的默认配置**  
> **cra配置文档**  
> - CRA将所有工程化配置，都隐藏在了`react-scripts`包中，所以项目中看不到任何配置信息
> - 如果要修改CRA的默认配置，有以下几种方案：
>   1. 通过第三方库来修改，比如，`@craco/craco`（推荐）
>   2. 通过执行`npm run eject`命令，释放`react-scripts`中的所有配置到项目中

**实现步骤**  
1. 安装修改CRA配置的包：`npm install -D @craco/craco`
2. 在项目根目录中创建craco的配置文件：`craco.config.js`，并在配置文件中配置路径别名
3. 修改`package.json`中的脚本命令
4. 在代码中，就可以通过`@`来表示src目录的绝对路径
5. 重启项目，让配置生效

`craco.config.js`
```
// 添加自定义对于webpack的配置
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
`package.json`
```
"scripts": {
 "start": "craco start",
 "build": "craco build",
 "test": "craco test",
 "eject": "react-scripts eject"
},
```

## 5.@别名路径提示
**实现步骤**  
1. 在项目根目录创建`jsconfig.json`
2. 在配置文件中添加配置

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  }
}
```