import Icon from '@ant-design/icons'
import UserSVG from '@/assets/svg/dev/user.svg?react'
import EduSVG from '@/assets/svg/dev/edu.svg?react'
import WorkSVG from '@/assets/svg/dev/work.svg?react'
import ProjectSVG from '@/assets/svg/dev/project.svg?react'
import AwardSVG from '@/assets/svg/dev/award.svg?react'
import SkillSVG from '@/assets/svg/dev/skill.svg?react'
import HeartSVG from '@/assets/svg/dev/heart.svg?react'
import extendSVG from '@/assets/svg/dev/extend.svg?react'
import shrinkSVG from '@/assets/svg/dev/shrink.svg?react'
import { Avatar, Tooltip } from 'antd'
import styles from './index.module.scss'
import { useGlobalStore } from '@/store'
import { optionalCom } from '@/types/dev'

const iconMenu = [
  {
    icon: <Icon component={UserSVG} />,
    label: '基本信息',
    key: 'BASE_INFO',
  },
  {
    icon: <Icon component={EduSVG} />,
    label: '教育背景',
    key: 'EDU_BG',
  },
  {
    icon: <Icon component={WorkSVG} />,
    label: '工作/实习经历',
    key: 'WORK_EXP',
  },
  {
    icon: <Icon component={ProjectSVG} />,
    label: '项目经历',
    key: 'PROJECT_EXP',
  },
  {
    icon: <Icon component={AwardSVG} />,
    label: '荣誉奖项',
    key: 'AWARD_LIST',
  },
  {
    icon: <Icon component={SkillSVG} />,
    label: '技能特长',
    key: 'SKILL_LIST',
  },
  {
    icon: <Icon component={HeartSVG} />,
    label: '兴趣爱好',
    key: 'HEART_LIST',
  },
]

const LeftMenu = ({
  iconClick,
  isDev,
}: {
  iconClick: (position: number) => void
  isDev: boolean
}) => {
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
      <div className={styles['mini-logo']}>
        {isDev ? (
          <Icon component={extendSVG} />
        ) : (
          <Icon component={shrinkSVG} />
        )}
      </div>
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
        <Avatar
          shape="square"
          size="large"
          icon={<Icon component={UserSVG} />}
        />
      </div>
    </div>
  )
}

export default LeftMenu
