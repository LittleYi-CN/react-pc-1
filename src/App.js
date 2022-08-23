import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import {AuthComponent} from '@/components/AuthComponent'

import './App.css'

function App() {
  return (
    // 路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 创建路由对应关系 */}
          {/* Layout需要鉴权处理 */}
          {/* 这里的Layout不一定鞋子 要根据是否登录进行判断 */}
          <Route path="/" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
