import {
  AimOutlined,
  FilePdfOutlined,
  FullscreenExitOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Tooltip } from 'antd'

type barType = {
  upWheel: () => void
  reduceWheel: () => void
}

const BottomBar = ({ reduceWheel, upWheel }: barType) => {
  const iconArr = [
    {
      icon: FullscreenExitOutlined,
      label: '重置缩放',
      callback: () => {},
    },
    {
      icon: ZoomInOutlined,
      label: '放大',
      callback: upWheel,
    },
    {
      icon: ZoomOutOutlined,
      label: '缩小',
      callback: reduceWheel,
    },
    {
      icon: AimOutlined,
      label: '中心画板',
      callback: () => {},
    },
    {
      icon: FilePdfOutlined,
      label: '下载pdf',
      callback: () => {},
    },
  ]

  return (
    <div className={styles['bar-container']}>
      {iconArr.map((item) => {
        return (
          <div key={item.label} className={styles['utile-box']}>
            <Tooltip title={item.label}>
              <div onClick={item.callback}>
                <item.icon />
              </div>
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar
