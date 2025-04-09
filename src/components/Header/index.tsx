import type { HeaderType } from '@/types/dev'
import styles from './index.module.scss'

const Header = (props: HeaderType) => {
  const { label, icon: Icon, opMenu = true, children } = props

  return (
    <div className={styles['header-container']}>
      <div className={styles['header-left']}>
        <Icon />
        <span className={styles['label']}>{label}</span>
      </div>
      {opMenu && children}
    </div>
  )
}

export default Header
