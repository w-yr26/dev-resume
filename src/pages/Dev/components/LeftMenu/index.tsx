import Icon from '@ant-design/icons'
import UserSVG from '@/assets/svg/dev/user.svg?react'
import EduSVG from '@/assets/svg/dev/edu.svg?react'
import WorkSVG from '@/assets/svg/dev/work.svg?react'
import ProjectSVG from '@/assets/svg/dev/project.svg?react'
// import AwardSVG from '@/assets/svg/dev/award.svg?react'
import SkillSVG from '@/assets/svg/dev/skill.svg?react'
// import HeartSVG from '@/assets/svg/dev/heart.svg?react'
import extendSVG from '@/assets/svg/dev/extend.svg?react'
import shrinkSVG from '@/assets/svg/dev/shrink.svg?react'
import { Avatar, Tooltip } from 'antd'
import styles from './index.module.scss'
import { useGlobalStore } from '@/store'
import { optionalCom } from '@/types/dev'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

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
  // {
  //   icon: <Icon component={AwardSVG} />,
  //   label: '荣誉奖项',
  //   key: 'AWARD_LIST',
  // },
  {
    icon: <Icon component={SkillSVG} />,
    label: '技能特长',
    key: 'SKILL_LIST',
  },
  // {
  //   icon: <Icon component={HeartSVG} />,
  //   label: '兴趣爱好',
  //   key: 'HEART_LIST',
  // },
]

const LeftMenu = ({
  iconClick,
  isLeftUnExpand,
  setisLeftUnExpand,
}: {
  iconClick: (position: number) => void
  isLeftUnExpand: boolean
  setisLeftUnExpand: (isExpand: boolean) => void
}) => {
  const navigate = useNavigate()
  const keyToPosition = useGlobalStore((state) => state.keyToPosition)
  const handleClick = (key: optionalCom) => {
    iconClick(keyToPosition[key] || 0)
  }

  const pathToHome = () => {
    navigate('/')
  }

  return (
    <div className={styles['left-container']}>
      <div
        className={styles['theme-box']}
        onClick={() => setisLeftUnExpand(!isLeftUnExpand)}
      >
        {isLeftUnExpand ? (
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
              onClick={() => handleClick(item.key as optionalCom)}
            >
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <div
        style={{
          cursor: 'pointer',
        }}
      >
        <Avatar
          shape="square"
          size="large"
          icon={<Icon component={UserSVG} />}
          onClick={pathToHome}
        />
      </div>
    </div>
  )
}

LeftMenu.displayName = 'LeftMenu'

export default memo(LeftMenu)
