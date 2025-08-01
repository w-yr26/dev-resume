import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '@/apis/user'
import { LoginForm } from './components/LoginForm'
import { ThirdPartyLogin } from './components/ThirdPartyLogin'
import { ResetPasswordForm } from './components/ResetPasswordForm'
import WelcomePage from '@/components/WelcomePage'
import styles from './index.module.scss'
import { useUserStore } from '@/store'

const Login: React.FC = () => {
  const updateInfo = useUserStore((state) => state.updateInfo)
  const lastRoute = useUserStore((state) => state.lastRoute)
  const setLastRoute = useUserStore((state) => state.setLastRoute)
  const [isLoading, setIsLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true)

      const { data } = await loginAPI({
        email: values.email.trim(),
        password: values.password.trim(),
      })

      localStorage.setItem('email', data.email)
      localStorage.setItem('userName', data.username)
      localStorage.setItem('user_id', String(data.id))
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      updateInfo('email', data.email)
      updateInfo('userName', data.username)
      updateInfo('id', String(data.id))
      updateInfo('token', data.token)
      updateInfo('refreshToken', data.refreshToken)
      navigate(lastRoute || '/', {
        replace: true,
      })
      // 清空历史路由
      setLastRoute('')
    } catch (_) {
      console.log('登录失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles['login-layout']}>
      <WelcomePage
        left={
          <div className={styles['login-form']}>
            {!showResetPassword ? (
              <>
                <h2>登录账户</h2>
                <p>
                  还没有账户？<a href="/register">立即创建</a>
                </p>

                <LoginForm
                  onFinish={onFinish}
                  isLoading={isLoading}
                  onForgotPassword={() => setShowResetPassword(true)}
                />

                <ThirdPartyLogin />
              </>
            ) : (
              <>
                <h2>找回密码</h2>
                <p>
                  <a href="/login">返回登录</a>
                </p>
                <ResetPasswordForm
                  setShowResetPassword={setShowResetPassword}
                />
              </>
            )}
          </div>
        }
      />
    </div>
  )
}

export default Login
