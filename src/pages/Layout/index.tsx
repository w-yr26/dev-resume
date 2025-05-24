import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import ResumeSvg from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import GridSVG from '@/assets/svg/grid.svg?react'
import { useUserStore } from '@/store'
import { Avatar } from 'antd'

const routeMenu = [
  {
    path: '/',
    name: '简历',
    icon: <Icon component={ResumeSvg} />,
  },
  {
    path: '/templates',
    name: '模板集',
    icon: <Icon component={GridSVG} />,
  },
  {
    path: '/setting',
    name: '设置',
    icon: <Icon component={SettingSVG} />,
  },
]

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const userName = useUserStore((state) => state.info.userName)

  const jumpNewPage = (path: string) => {
    navigate(path)
  }

  return (
    <div className={styles['layout-container']}>
      <div className={styles['left-container']}>
        <div className={styles['logo-area']} />
        <div className={styles['left-nav']}>
          <ul>
            {routeMenu.map((menu) => (
              <li
                key={menu.name}
                className={`${styles['left-nav-item']} ${
                  location.pathname === menu.path ? styles['active'] : ''
                }`}
                onClick={() => jumpNewPage(menu.path)}
              >
                {menu.icon}
                &nbsp;&nbsp; {menu.name}
              </li>
            ))}
            {/* <li className={`${styles['left-nav-item']} ${styles['active']}`}>
              <Icon
                component={ResumeSvg}
                style={{
                  rotate: '20deg',
                }}
              />
              &nbsp;&nbsp; 简历
            </li>
            <li className={styles['left-nav-item']}>
              <Icon
                component={SettingSVG}
                style={{
                  rotate: '20deg',
                }}
              />
              &nbsp;&nbsp; 设置
            </li> */}
          </ul>
        </div>

        <div className={styles['left-bottom']}>
          <div className={styles['account-box']}>
            <Avatar size={24}>{userName}</Avatar>
            <div className={styles['account']}>{userName}</div>
          </div>
          <p className={styles['version-box']}>DevResume 1.0.0</p>
        </div>
      </div>

      {/* 右边简历栏目部分 */}
      <div className={styles['right-container']}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
