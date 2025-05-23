import ColorSetting from './ColorSetting'
import DownloadSetting from './DownloadSetting'
import styles from './index.module.scss'
import PageSetting from './PageSetting'
import TypeSetting from './TypeSetting'
import Templates from './Templates'
import type { templateListType } from '@/types/ui'
import { memo } from 'react'

const Setting = memo(
  ({
    isRightUnExpand,
    temList,
  }: {
    isRightUnExpand: boolean
    temList: templateListType[]
  }) => {
    return (
      <div
        className={`${styles['setting-contaienr']} ${
          isRightUnExpand && styles['active-translate']
        }`}
      >
        <Templates temList={temList} />
        <TypeSetting />
        <PageSetting />
        {/* <ColorSetting /> */}
        <DownloadSetting />
      </div>
    )
  }
)

export default Setting
