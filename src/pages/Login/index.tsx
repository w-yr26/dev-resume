import { useEffect } from 'react'
import { loginAPI } from '@/apis/user'
import styles from './index.module.scss'

const Login = () => {
  useEffect(() => {
    const loginTest = async () => {
      const res = await loginAPI({
        email: '13542878579@163.com',
        password: '456789',
      })
      console.log(res)
    }

    loginTest()
  }, [])
  return <div className={styles['login-layout']}>this is Login</div>
}

export default Login
