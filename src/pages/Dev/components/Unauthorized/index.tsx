import { Empty } from 'antd'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Unauthorized = ({ type }: { type: 'expired' | 'beyond' }) => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()

  // 倒计时逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 跳转逻辑
  useEffect(() => {
    if (count === 0) {
      navigate('/', { replace: true })
    }
  }, [count, navigate])

  return (
    <div className={styles['empty-box']}>
      <Empty
        description={
          <span>
            {type === 'expired' ? '链接无效，' : '不再分享名单范畴内，'}
            <span
              style={{
                color: '#ff6464',
              }}
            >
              {count}
            </span>{' '}
            秒后跳转到首页
          </span>
        }
      />
    </div>
  )
}

export default Unauthorized
