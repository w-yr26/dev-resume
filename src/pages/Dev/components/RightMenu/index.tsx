import Icon, {
  AppstoreAddOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import PageSVG from '@/assets/svg/dev/page.svg?react'
import ThemeSVG from '@/assets/svg/dev/theme.svg?react'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
import ColorSVG from '@/assets/svg/dev/color.svg?react'
import { Tooltip } from 'antd'
import styles from './index.module.scss'

const toolMenu = [
  {
    icon: <AppstoreAddOutlined />,
    label: '模板',
  },
  {
    icon: <Icon component={ThemeSVG} />,
    label: '排版',
  },
  {
    icon: <Icon component={PageSVG} />,
    label: '页面',
  },
  {
    icon: <Icon component={ColorSVG} />,
    label: '主题',
  },
  {
    icon: <Icon component={OutputSVG} />,
    label: '导出',
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
