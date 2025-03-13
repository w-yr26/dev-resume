import {
  BookOutlined,
  BranchesOutlined,
  BulbOutlined,
  CalculatorOutlined,
  CompressOutlined,
  HeartOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import React from 'react'

const iconMenu = [
  {
    icon: <UserOutlined />,
    label: '基本信息',
  },
  {
    icon: <BookOutlined />,
    label: '教育背景',
  },
  {
    icon: <CalculatorOutlined />,
    label: '工作/实习经历',
  },
  {
    icon: <BranchesOutlined />,
    label: '项目经历',
  },
  {
    icon: <BulbOutlined />,
    label: '荣誉奖项',
  },
  {
    icon: <CompressOutlined />,
    label: '技能特长',
  },
  {
    icon: <HeartOutlined />,
    label: '兴趣爱好',
  },
  {
    icon: <PlusOutlined />,
    label: '新增一项',
  },
]

const LeftMenu: React.FC = () => {
  return (
    <div className="w-14 h-full flex flex-col justify-between items-center py-4 bg-light-primary border-r border-[#e4e4e7]">
      <div>Logo</div>
      <ul className="menu-list flex flex-col justify-around">
        {iconMenu.map((item) => {
          return (
            <li
              key={item.label}
              className="p-2 hover:rounded-sm hover:border hover:border-transparent hover:bg-[#f4f4f5] dark:hover:bg-[#18181b]"
            >
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <div>
        <Avatar shape='square' size="large" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default LeftMenu
