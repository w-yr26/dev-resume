// import './App.css'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN' // 引入中文语言包
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            '/sw.js',
            {
              scope: '/',
            }
          )
          console.log('ServiceWorker 注册成功:', registration)
        } catch (error) {
          console.error('ServiceWorker 注册失败:', error)
        }
      }
      registerSW()
    }
  }, [])

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
            colorBgMask: 'rgba(250, 250, 250, 0.9)',
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
          Spin: {
            colorPrimary: '#18181b',
          },
          Button: {
            defaultActiveBg: '#18181b',
            defaultActiveBorderColor: '#18181b',
            defaultActiveColor: '#fff',
            defaultBg: '#18181b',
            defaultBorderColor: '#18181b',
            defaultColor: '#fff',
            defaultHoverBg: '#18181b',
            defaultHoverBorderColor: '#18181b',
            defaultHoverColor: '#fff',
            defaultShadow: 'none',
            contentLineHeight: 2,
            borderRadius: 0,
          },
        },
      }}
    >
      <Outlet></Outlet>
    </ConfigProvider>
  )
}

export default App
