import Icon, {
  FilePdfOutlined,
  FullscreenExitOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'
import codeSVG from '@/assets/svg/dev/code.svg?react'
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
      icon: <FullscreenExitOutlined />,
      label: '重置缩放',
      callback: () => {},
    },
    {
      icon: <ZoomInOutlined />,
      label: '放大',
      callback: upWheel,
    },
    {
      icon: <ZoomOutOutlined />,
      label: '缩小',
      callback: reduceWheel,
    },
    {
      icon: <FilePdfOutlined />,
      label: '下载pdf',
      callback: () => {},
    },
    {
      icon: <Icon component={codeSVG} />,
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
