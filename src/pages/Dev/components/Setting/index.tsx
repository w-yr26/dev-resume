import ColorSetting from './ColorSetting'
import styles from './index.module.scss'
import TypeSetting from './TypeSetting'

const Setting = () => {
  return (
    <div className={styles['setting-contaienr']}>
      <TypeSetting />
      <ColorSetting />
    </div>
  )
}

export default Setting
