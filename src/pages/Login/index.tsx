import React, { useState } from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '@/apis/user'
import { LoginForm } from './components/LoginForm'
import { ThirdPartyLogin } from './components/ThirdPartyLogin'
import { ResetPasswordForm } from './components/ResetPasswordForm'
import styles from './index.module.scss'
import type { ResetPasswordValues } from '@/types/user'


const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoading(true)

    const { code, data, msg } = await loginAPI({
      email: values.email.trim(),
      password: values.password.trim(),
    })

    if (code === 1) {
      message.success(msg || '登录成功')
      console.log('data', data)
      localStorage.setItem('email', data.email)
      localStorage.setItem('user_name', data.username)
      localStorage.setItem('user_id', String(data.id))
      navigate('/')
    }
    setIsLoading(false)
  }

  const handleResetPassword = async (values: ResetPasswordValues) => {
    // setIsLoading(true)
    // try {
    //   const res = await forgotPassword({
    //     email: values.email.trim(),
    //     password: values.newPassword,
    //     verificationCode: values.verificationCode,
    //   })
    //   if (res.code === 1) {
    //     message.success('密码重置成功')
    //     setShowResetPassword(false)
    //     form.resetFields()
    //   }
    // } catch {
    //   // setErrorMsg('网络错误，请检查网络连接')
    //   console.log('catch')
    // } finally {
    //   setIsLoading(false)
    // }
    console.log(values)
  }

  return (
    <div className={styles['login-layout']}>
      <div className={styles['login-form-container']}>
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
                onFinish={handleResetPassword}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
        <div className={styles['image-container']}></div>
      </div>
    </div>
  )
}

export default Login
