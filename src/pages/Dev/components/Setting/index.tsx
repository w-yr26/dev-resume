import ColorSetting from './ColorSetting'
import DownloadSetting from './DownloadSetting'
import styles from './index.module.scss'
import PageSetting from './PageSetting'
import TypeSetting from './TypeSetting'
import Templates from './Templates'
import type { templateListType } from '@/types/ui'
import { memo } from 'react'
import Share from './Share'
import AuthorizationHoc from '../AuthorizationHoc'

const Setting = memo(
  ({
    isRightUnExpand,
    isOrigin,
    temList,
    fetchUISchema,
  }: {
    isRightUnExpand: boolean
    isOrigin: boolean
    temList: templateListType[]
    fetchUISchema: (
      templateId: string,
      temList: templateListType[]
    ) => Promise<{
      code: 0 | 1
      temSchema: any | null
    }>
  }) => {
    return (
      <div
        className={`${styles['setting-contaienr']} ${
          isRightUnExpand && styles['active-translate']
        }`}
      >
        <Templates temList={temList} fetchUISchema={fetchUISchema} />
        <TypeSetting />
        <PageSetting />
        {/* <ColorSetting /> */}
        <DownloadSetting />
        <AuthorizationHoc
          isOrigin={isOrigin}
          permission={1}
          isOnlyOrigin={true}
        >
          <Share />
        </AuthorizationHoc>
      </div>
    )
  }
)

export default Setting
