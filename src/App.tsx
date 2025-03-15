// import './App.css'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN' // 引入中文语言包

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet></Outlet>
    </ConfigProvider>
  )
}

export default App
