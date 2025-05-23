import React from 'react'
import styles from './index.module.scss'
import { Tag } from 'antd'

const Item = ({
  svg,
  label,
  sub,
  nodeType,
}: {
  svg: React.ReactNode
  label: string
  sub: string
  nodeType: string
}) => {
  return (
    <div className={styles['item-box']}>
      <div className={styles['left']}>{svg}</div>
      <div className={styles['right']}>
        <div className={styles['right-top']}>
          <span>{label}</span>
          <Tag>{nodeType}</Tag>
        </div>
        <div className={styles['sub']}>{sub}</div>
      </div>
    </div>
  )
}

export default Item
