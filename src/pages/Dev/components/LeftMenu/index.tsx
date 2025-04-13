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
import styles from './index.module.scss'
import { useGlobalStore } from '@/store'
import { optionalCom } from '@/types/dev'

const iconMenu = [
  {
    icon: <UserOutlined />,
    label: '基本信息',
    key: 'BASE_INFO',
  },
  {
    icon: <BookOutlined />,
    label: '教育背景',
    key: 'EDU_BG',
  },
  {
    icon: <CalculatorOutlined />,
    label: '工作/实习经历',
    key: 'WORK_EXP',
  },
  {
    icon: <BranchesOutlined />,
    label: '项目经历',
    key: 'PROJECT_EXP',
  },
  {
    icon: <BulbOutlined />,
    label: '荣誉奖项',
    key: 'AWARD_LIST',
  },
  {
    icon: <CompressOutlined />,
    label: '技能特长',
    key: 'SKILL_LIST',
  },
  {
    icon: <HeartOutlined />,
    label: '兴趣爱好',
    key: 'HEART_LIST',
  },
  {
    icon: <PlusOutlined />,
    label: '新增一项',
    key: 'ADD_MORE',
  },
]

const LeftMenu = ({ iconClick }: { iconClick: (position: number) => void }) => {
  const keyToPosition = useGlobalStore((state) => state.keyToPosition)

  const handleClick = (key: optionalCom | 'ADD_MORE') => {
    if (key === 'ADD_MORE') {
      console.log('add')
    } else {
      console.log(keyToPosition[key])
      iconClick(keyToPosition[key] || 0)
    }
  }

  return (
    <div className={styles['left-container']}>
      <div className={styles['mini-logo']} />
      <ul className={styles['menu-list']}>
        {iconMenu.map((item) => {
          return (
            <li
              key={item.key}
              className={styles['icon-item']}
              onClick={() => handleClick(item.key as optionalCom | 'ADD_MORE')}
            >
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <div>
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default LeftMenu
