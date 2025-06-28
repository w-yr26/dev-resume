import { useDevStore } from '@/store'
import type { allKeyType, headMenuType } from '@/types/dev'
import Icon from '@ant-design/icons'
import settingSVG from '@/assets/svg/setting.svg?react'
import editSVG from '@/assets/svg/edit.svg?react'
import eyeSVG from '@/assets/svg/dev/eye.svg?react'
import eyeoffSVG from '@/assets/svg/dev/eyeoff.svg?react'
import menuSVG from '@/assets/svg/dev/menu.svg?react'
import { Popover } from 'antd'
import styles from './index.module.scss'

const CtxMenu = ({
  currentKey,
  visible,
  renameLabel,
}: {
  currentKey: allKeyType
  visible: boolean
  renameLabel?: () => void
}) => {
  const changeItemVisible = useDevStore((state) => state.changeItemVisible)
  const resetInfo = useDevStore((state) => state.resetInfo)
  const ListContent: headMenuType[] = [
    {
      label: visible ? '隐藏' : '显示',
      key: 'visible',
      icon: visible ? (
        <Icon component={eyeoffSVG} />
      ) : (
        <Icon component={eyeSVG} />
      ),
      callback: () => {
        changeItemVisible(currentKey)
      },
    },
    {
      label: '重命名',
      key: 'rename',
      icon: <Icon component={editSVG} />,
      callback: () => {
        if (renameLabel) renameLabel()
      },
    },
    {
      label: '重置',
      key: 'reset',
      icon: <Icon component={settingSVG} />,
      callback: () => {
        resetInfo(currentKey)
      },
    },
    // {
    //   label: '移除',
    //   key: 'delete',
    //   icon: DeleteOutlined,
    // },
  ]

  const handleClick = ({ callback }: headMenuType) => {
    if (callback) callback()
  }

  const content = (
    <ul className={styles['head-menu-list']}>
      {ListContent.map((item) => (
        <li
          key={item.key}
          className={styles['head-menu-item']}
          onClick={() => handleClick(item)}
        >
          <div className={styles['icon-box']}>{item.icon}</div>
          <div className="label-box">{item.label}</div>
        </li>
      ))}
    </ul>
  )

  return (
    <Popover content={content} trigger="click" placement="bottom">
      <Icon component={menuSVG} size={14} />
    </Popover>
  )
}

export default CtxMenu
