import { useDevStore } from '@/store'
import type { headMenuType, keyType } from '@/types/dev'
import {
  DeleteOutlined,
  EyeOutlined,
  MenuOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Popover } from 'antd'
import styles from './index.module.scss'

const CtxMenu = ({ currentKey }: { currentKey: keyType }) => {
  const changeItemVisible = useDevStore((state) => state.changeItemVisible)
  const resetInfo = useDevStore((state) => state.resetInfo)
  const ListContent: headMenuType[] = [
    {
      label: '隐藏',
      key: 'visible',
      icon: EyeOutlined,
      callback: () => {
        changeItemVisible(currentKey)
      },
    },
    // {
    //   label: '重命名',
    //   key: 'rename',
    //   icon: EditOutlined,
    //   // disabled: true,
    // },
    {
      label: '重置',
      key: 'reset',
      icon: SettingOutlined,
      callback: () => {
        resetInfo(currentKey)
      },
    },
    {
      label: '移除',
      key: 'delete',
      icon: DeleteOutlined,
    },
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
          <div className={styles['icon-box']}>
            <item.icon />
          </div>
          <div className="label-box">{item.label}</div>
        </li>
      ))}
    </ul>
  )

  return (
    <Popover content={content} trigger="click" placement="bottom">
      <MenuOutlined size={14} />
    </Popover>
  )
}

export default CtxMenu
