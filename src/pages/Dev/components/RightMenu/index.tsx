import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  DownloadOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  LayoutOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import styles from './index.module.scss'

const toolMenu = [
  {
    icon: <AppstoreAddOutlined />,
    label: '模板',
  },
  {
    icon: <LayoutOutlined />,
    label: '布局',
  },
  {
    icon: <BgColorsOutlined />,
    label: '主题',
  },
  {
    icon: <FullscreenExitOutlined />,
    label: '全局',
  },
  {
    icon: <DownloadOutlined />,
    label: '导出',
  },
  {
    icon: <ImportOutlined />,
    label: '导入',
  },
  {
    icon: <InfoCircleOutlined />,
    label: '信息',
  },
]

const RightMenu = () => {
  return (
    <div className={styles['right-container']}>
      <ul className={styles['list-box']}>
        {toolMenu.map((item) => {
          return (
            <li key={item.label} className={styles['item-box']}>
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RightMenu
