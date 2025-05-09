import { getOauthGiteeAPI } from '@/apis/user'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './index.module.scss'
import { Empty, Typography } from 'antd'

const ThirdPart = () => {
  const [isFail, setIsFail] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const giteeCode = params.get('code')

  useEffect(() => {
    const thirdLogin = async () => {
      if (giteeCode) {
        try {
          const { code, data } = await getOauthGiteeAPI(giteeCode)
          if (code === 0) setIsFail(true)
          localStorage.setItem('email', data.email)
          localStorage.setItem('user_name', data.username)
          localStorage.setItem('user_id', String(data.id))
          navigate('/')
        } catch (_) {
          setIsFail(true)
        }
      }
    }

    thirdLogin()
  }, [])

  return (
    <>
      {!isFail ? (
        <h3 className={styles['info-box']}>授权登录 页面跳转中...</h3>
      ) : (
        <div className={styles['info-box']}>
          <Empty
            description={
              <Typography.Text>
                授权失败 <a href="/login">返回表单登录</a>
              </Typography.Text>
            }
          />
        </div>
      )}
    </>
  )
}

export default ThirdPart
