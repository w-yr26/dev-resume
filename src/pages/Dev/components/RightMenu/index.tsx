import Icon, {
  AppstoreAddOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import PageSVG from '@/assets/svg/dev/page.svg?react'
import ThemeSVG from '@/assets/svg/dev/theme.svg?react'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
// import ColorSVG from '@/assets/svg/dev/color.svg?react'
import extendSVG from '@/assets/svg/dev/extend.svg?react'
import shrinkSVG from '@/assets/svg/dev/shrink.svg?react'
import { Tooltip } from 'antd'
import styles from './index.module.scss'
import { useGlobalStore } from '@/store'
import { memo } from 'react'

const toolMenu = [
  {
    icon: <AppstoreAddOutlined />,
    label: '模板',
    key: 'template',
  },
  {
    icon: <Icon component={ThemeSVG} />,
    label: '排版',
    key: 'theme',
  },
  {
    icon: <Icon component={PageSVG} />,
    label: '页面',
    key: 'page',
  },
  // {
  //   icon: <Icon component={ColorSVG} />,
  //   label: '主题',
  //   key: 'color',
  // },
  {
    icon: <Icon component={OutputSVG} />,
    label: '导出',
    key: 'output',
  },
  {
    icon: <Icon component={OutputSVG} />,
    label: '分享',
    key: 'share',
  },
  {
    icon: <InfoCircleOutlined />,
    label: '信息',
    key: 'info',
  },
]

const RightMenu = ({
  isRightUnExpand,
  iconClick,
  setisRightUnExpand,
}: {
  isRightUnExpand: boolean
  iconClick: (position: number) => void
  setisRightUnExpand: (isExpand: boolean) => void
}) => {
  const keyToPosition = useGlobalStore((state) => state.keyToPosition)
  const handleClick = (key: string) => {
    iconClick(keyToPosition[key] || 0)
  }

  return (
    <div className={styles['right-container']}>
      <div
        className={styles['theme-box']}
        onClick={() => setisRightUnExpand(!isRightUnExpand)}
      >
        {isRightUnExpand ? (
          <Icon component={extendSVG} />
        ) : (
          <Icon component={shrinkSVG} />
        )}
      </div>
      <ul className={styles['list-box']}>
        {toolMenu.map((item) => {
          return (
            <li
              key={item.label}
              className={styles['item-box']}
              onClick={() => handleClick(item.key)}
            >
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <div className={styles['slot-box']} />
    </div>
  )
}

RightMenu.displayName = 'RightMenu'

export default memo(RightMenu)
