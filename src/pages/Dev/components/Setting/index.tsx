import DownloadSetting from './DownloadSetting'
import styles from './index.module.scss'
import PageSetting from './PageSetting'
import TypeSetting from './TypeSetting'
import Templates from './Templates'
import type { templateListType } from '@/types/ui'
import { forwardRef, memo } from 'react'
import Share from './Share'
import AuthorizationHoc from '../AuthorizationHoc'
import Layout from './Layout'

const Setting = forwardRef<
  HTMLDivElement,
  {
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
  }
>(({ isRightUnExpand, isOrigin, temList, fetchUISchema }, ref) => {
  return (
    <div
      className={`${styles['setting-contaienr']} ${
        isRightUnExpand && styles['active-translate']
      }`}
      ref={ref}
    >
      <Templates temList={temList} fetchUISchema={fetchUISchema} />
      <TypeSetting />
      <PageSetting />
      {/* <ColorSetting /> */}
      <Layout />
      <DownloadSetting />
      <AuthorizationHoc isOrigin={isOrigin} permission={1} isOnlyOrigin={true}>
        <Share />
      </AuthorizationHoc>
    </div>
  )
})
Setting.displayName = 'Setting'
export default memo(Setting)
