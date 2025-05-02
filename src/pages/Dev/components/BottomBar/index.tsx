import Icon from '@ant-design/icons'
import cssSVG from '@/assets/svg/dev/css.svg?react'
import centerSVG from '@/assets/svg/dev/center.svg?react'
import zoomInSVG from '@/assets/svg/dev/zoom-in-line.svg?react'
import zoomOutSVG from '@/assets/svg/dev/zoom-out-line.svg?react'
import pdfSVG from '@/assets/svg/dev/pdf.svg?react'
import normalSVG from '@/assets/svg/dev/normal.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import styles from './index.module.scss'
import { ConfigProvider, Switch, Tooltip } from 'antd'

// type toCanvas = {
//   base64URL: string
//   width: string
//   height: string
// }

type barType = {
  isLeftExpand: boolean
  isRightExpand: boolean
  setIsLeftExpand: (v: boolean) => void
  setIsRightExpand: (v: boolean) => void
  upWheel: () => void
  reduceWheel: () => void
  handleModeSwitch: () => void
  resetWheel: () => void
  savePDF: () => Promise<any>
}

const BottomBar = ({
  isLeftExpand,
  isRightExpand,
  setIsLeftExpand,
  setIsRightExpand,
  reduceWheel,
  upWheel,
  handleModeSwitch,
  resetWheel,
  savePDF,
}: barType) => {
  const changeMode = (isDev: boolean) => {
    setIsLeftExpand(isDev)
    setIsRightExpand(isDev)
  }
  
  const iconArr = [
    {
      icon: <Icon component={centerSVG} />,
      label: '重置缩放',
      callback: resetWheel,
    },
    {
      icon: <Icon component={zoomInSVG} />,
      label: '放大',
      callback: upWheel,
    },
    {
      icon: <Icon component={zoomOutSVG} />,
      label: '缩小',
      callback: reduceWheel,
    },
    {
      icon: <Icon component={cssSVG} />,
      label: 'CSS编辑',
      callback: handleModeSwitch,
    },
    {
      icon: <Icon component={pdfSVG} />,
      label: '下载pdf',
      callback: savePDF,
    },
    {
      icon: (
        <ConfigProvider
          theme={{
            components: {
              Switch: {
                colorPrimary: '#09090b',
                colorPrimaryHover: '#09090b',
                controlHeight: 24,
              },
            },
          }}
        >
          <Switch
            checkedChildren={<Icon component={normalSVG} />}
            unCheckedChildren={<Icon component={codeSVG} />}
            checked={isLeftExpand && isRightExpand}
            onClick={(val) => changeMode(val)}
          />
        </ConfigProvider>
      ),
      callback: () => {},
    },
  ]

  return (
    <div className={styles['bar-container']}>
      {iconArr.map((item, index) => {
        return (
          <div key={index} className={styles['utile-box']}>
            {item.label ? (
              <Tooltip title={item.label}>
                <div onClick={item.callback}>{item.icon}</div>
              </Tooltip>
            ) : (
              <div onClick={item.callback}>{item.icon}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar
