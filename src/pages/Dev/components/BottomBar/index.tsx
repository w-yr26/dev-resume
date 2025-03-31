import {
  AimOutlined,
  FilePdfOutlined,
  FullscreenExitOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Tooltip } from 'antd'

const BottomBar = () => {
  const iconArr = [
    {
      icon: FullscreenExitOutlined,
      label: '重置缩放',
      callback: () => {},
    },
    {
      icon: ZoomInOutlined,
      label: '放大',
      callback: () => {},
    },
    {
      icon: ZoomOutOutlined,
      label: '缩小',
      callback: () => {},
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
              <item.icon />
            </Tooltip>
          </div>
        )
      })}
    </div>
  )
}

export default BottomBar
