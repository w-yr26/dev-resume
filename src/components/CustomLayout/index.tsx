import { forwardRef } from 'react'
import styles from './index.module.scss'
import type { LayoutPropsType } from '@/types/dev'

const CustomLayout = forwardRef<HTMLDivElement, LayoutPropsType>(
  ({ children }, ref) => {
    return (
      <div className={styles['custom-layout']} ref={ref}>
        {children}
      </div>
    )
  }
)

export default CustomLayout
