import ColorSetting from './ColorSetting'
import DownloadSetting from './DownloadSetting'
import styles from './index.module.scss'
import PageSetting from './PageSetting'
import TypeSetting from './TypeSetting'

const Setting = ({ isRightExpand }: { isRightExpand: boolean }) => {
  return (
    <div
      className={`${styles['setting-contaienr']} ${
        isRightExpand && styles['active-translate']
      }`}
    >
      <TypeSetting />
      <PageSetting />
      <ColorSetting />
      <DownloadSetting />
    </div>
  )
}

export default Setting
