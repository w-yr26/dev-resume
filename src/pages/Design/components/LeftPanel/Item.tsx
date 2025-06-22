import React, { useContext } from 'react'
import styles from './index.module.scss'
import { Tag } from 'antd'
import { RefsContext } from '../RefsProvider/context'

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
  const context = useContext(RefsContext)
  return (
    <div
      className={styles['item-box']}
      ref={
        nodeType === 'module'
          ? (context?.ref1 as React.RefObject<HTMLDivElement>)
          : nodeType === 'text'
          ? (context?.ref2 as React.RefObject<HTMLDivElement>)
          : nodeType === 'section'
          ? (context?.ref3 as React.RefObject<HTMLDivElement>)
          : null
      }
    >
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
