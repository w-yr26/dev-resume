import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MenuOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps, Popover } from 'antd'
import { useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    label: '隐藏',
    key: 'visible',
    icon: <EyeOutlined />,
  },
  {
    label: '重命名',
    key: 'rename',
    icon: <EditOutlined />,
    // disabled: true,
  },
  {
    label: '重置',
    key: 'reset',
    icon: <SettingOutlined />,
  },
  {
    label: '移除',
    key: 'delete',
    icon: <DeleteOutlined />,
  },
]

const CtxMenu = () => {
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }

  const content = (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="vertical"
      items={items}
    />
  )

  return (
    <Popover
      content={content}
      trigger="hover"
      placement="bottom"
      className="hover:cursor-help"
    >
      <MenuOutlined size={14} />
    </Popover>
  )
}

export default CtxMenu
