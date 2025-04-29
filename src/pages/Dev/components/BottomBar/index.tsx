import Icon from '@ant-design/icons'
import cssSVG from '@/assets/svg/dev/css.svg?react'
import centerSVG from '@/assets/svg/dev/center.svg?react'
import zoomInSVG from '@/assets/svg/dev/zoom-in-line.svg?react'
import zoomOutSVG from '@/assets/svg/dev/zoom-out-line.svg?react'
import pdfSVG from '@/assets/svg/dev/pdf.svg?react'
import styles from './index.module.scss'
import { Tooltip } from 'antd'

type barType = {
  upWheel: () => void
  reduceWheel: () => void
  handleModeSwitch: () => void
}

const BottomBar = ({ reduceWheel, upWheel, handleModeSwitch }: barType) => {
  const iconArr = [
    {
      icon: <Icon component={centerSVG} />,
      label: '重置缩放',
      callback: () => {},
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
      icon: <Icon component={pdfSVG} />,
      label: '下载pdf',
      callback: () => {},
    },
    {
      icon: <Icon component={cssSVG} />,
      label: 'CSS编辑',
      callback: handleModeSwitch,
    },
  ]

  return (
    <div className={styles['bar-container']}>
      {iconArr.map((item) => {
        return (
          <div key={item.label} className={styles['utile-box']}>
            <Tooltip title={item.label}>
              <div onClick={item.callback}>{item.icon}</div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar
