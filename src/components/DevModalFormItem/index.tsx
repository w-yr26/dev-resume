import React from 'react'
import styles from './index.module.scss'

const DevModalFormItem = ({
  title,
  primary,
  icon,
  sub,
  handleRandom,
}: {
  title: string
  primary: React.ReactNode
  icon?: React.ReactNode
  sub?: React.ReactNode
  handleRandom?: () => void
}) => {
  return (
    <div className={styles['create-form-item']}>
      <p className={styles['label']}>{title}</p>
      <div className={styles['body']}>
        {primary}
        {icon && handleRandom ? (
          <div className={styles['random-box']} onClick={() => handleRandom()}>
            {icon}
          </div>
        ) : null}
      </div>
      {sub ? <div className={styles['sub-label']}>{sub}</div> : null}
    </div>
  )
}

export default DevModalFormItem
