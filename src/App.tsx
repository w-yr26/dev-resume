// import './App.css'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN' // 引入中文语言包

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: {
          Modal: {
            contentBg: '#fafafa',
            footerBg: '#fafafa',
            headerBg: '#fafafa',
            boxShadow: 'none',
          },
          Collapse: {
            headerBg: '#fff',
            contentPadding: '0 8px',
          },
          Slider: {
            railSize: 8,
            handleColor: '#18181b',
            handleActiveColor: '#18181b',
            handleSizeHover: 10,
            handleLineWidthHover: 2,
            trackBg: '#18181b',
            trackHoverBg: '#18181b',
          },
          Checkbox: {
            colorPrimary: '#18181b',
            colorPrimaryHover: '#18181b',
            colorPrimaryBorder: '#18181b',
          },
          Switch: {
            handleShadow: 'none',
            colorPrimary: '#18181b',
            colorPrimaryHover: '#18181b',
          },
          Popover: {
            boxShadowSecondary: 'none',
          },
          Select: {
            activeBorderColor: '#d9d9d9',
            hoverBorderColor: '#d9d9d9',
          },
          Input: {
            activeBorderColor: '#18181b',
            hoverBorderColor: '#18181b',
            activeShadow: 'none',
          },
          Steps: {
            dotSize: 6,
            fontSize: 12,
          },
        },
      }}
    >
      <Outlet></Outlet>
    </ConfigProvider>
  )
}

export default App
