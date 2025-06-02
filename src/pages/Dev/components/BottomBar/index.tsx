import Icon from '@ant-design/icons'
import cssSVG from '@/assets/svg/dev/css.svg?react'
import centerSVG from '@/assets/svg/dev/center.svg?react'
import zoomInSVG from '@/assets/svg/dev/zoom-in-line.svg?react'
import zoomOutSVG from '@/assets/svg/dev/zoom-out-line.svg?react'
import pdfSVG from '@/assets/svg/dev/pdf.svg?react'
import normalSVG from '@/assets/svg/dev/normal.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import chatCheckSVG from '@/assets/svg/dev/chat-check.svg?react'
import chatDeleteSVG from '@/assets/svg/dev/chat-delete.svg?react'
import styles from './index.module.scss'
import { Switch, Tooltip } from 'antd'
import AuthorizationHoc from '../AuthorizationHoc'

type barType = {
  isReadMode: boolean
  isOrigin: boolean
  setIsReadMode: (val: boolean) => void
  setisLeftUnExpand: (v: boolean) => void
  setisRightUnExpand: (v: boolean) => void
  upWheel: () => void
  reduceWheel: () => void
  handleModeSwitch: () => void
  resetWheel: () => void
  savePDF: () => Promise<any>
}

const BottomBar = ({
  isReadMode,
  isOrigin,
  setIsReadMode,
  setisLeftUnExpand,
  setisRightUnExpand,
  reduceWheel,
  upWheel,
  handleModeSwitch,
  resetWheel,
  savePDF,
}: barType) => {
  const changeMode = (isDev: boolean) => {
    setIsReadMode(isDev)
    setisLeftUnExpand(isDev)
    setisRightUnExpand(isDev)
  }

  const iconArr = [
    {
      icon: <Icon component={centerSVG} />,
      label: '重置缩放',
      callback: resetWheel,
      permission: 1,
    },
    {
      icon: <Icon component={zoomInSVG} />,
      label: '放大',
      callback: upWheel,
      permission: 1,
    },
    {
      icon: <Icon component={zoomOutSVG} />,
      label: '缩小',
      callback: reduceWheel,
      permission: 1,
    },
    {
      icon: <Icon component={cssSVG} />,
      label: 'CSS编辑',
      callback: handleModeSwitch,
      permission: 3,
    },
    {
      icon: <Icon component={isReadMode ? chatCheckSVG : chatDeleteSVG} />,
      label: '评论',
      callback: () => {
        console.log(isReadMode)
      },
      permission: 1,
    },
    {
      icon: <Icon component={pdfSVG} />,
      label: '下载pdf',
      callback: savePDF,
      permission: 1,
    },
    {
      icon: (
        <Switch
          checkedChildren={<Icon component={normalSVG} />}
          unCheckedChildren={<Icon component={codeSVG} />}
          checked={isReadMode}
          onClick={(val) => changeMode(val)}
        />
      ),
      callback: () => {},
      permission: 2,
    },
  ]

  return (
    <div className={styles['bar-container']}>
      {iconArr.map((item, index) => {
        return (
          <AuthorizationHoc
            isOrigin={isOrigin}
            permission={item.permission as 1 | 2 | 3 | 4}
            key={index}
          >
            <div className={styles['utile-box']}>
              {item.label ? (
                <Tooltip title={item.label}>
                  <div onClick={item.callback}>{item.icon}</div>
                </Tooltip>
              ) : (
                <div onClick={item.callback}>{item.icon}</div>
              )}
            </div>
          </AuthorizationHoc>
        )
      })}
    </div>
  )
}

export default BottomBar
