import React, { PropsWithChildren } from 'react'
import styles from './index.module.scss'

const CustomLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles['custom-layout']}>{children}</div>
}

export default CustomLayout
