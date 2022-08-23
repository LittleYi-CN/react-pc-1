import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import {AuthComponent} from '@/components/AuthComponent'
import {history} from './utils/history'

import './App.css'

import Publish from './pages/Publish'
import Article from './pages/Article'
import Home from './pages/Home'

function App() {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 创建路由对应关系 */}
          {/* Layout需要鉴权处理 */}
          {/* 这里的Layout不一定鞋子 要根据是否登录进行判断 */}
          <Route path="/" element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            <Route index element={<Home />}></Route>
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default App;
