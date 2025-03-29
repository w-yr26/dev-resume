import type { HeaderType } from '@/types/dev'
import CtxMenu from '@/pages/Dev/components/Materials/components/CtxMenu'
import styles from './index.module.scss'

const Header: React.FC<HeaderType> = (props) => {
  const { label, icon: Icon, opMenu = true } = props

  return (
    <div className={styles['header-container']}>
      <div className={styles['header-left']}>
        <Icon />
        <span className={styles['label']}>{label}</span>
      </div>
      {opMenu && <CtxMenu />}
    </div>
  )
}

export default Header
