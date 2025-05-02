import { useUserStore } from '@/store'
import styles from './index.module.scss'
// 引入icon图标
import Icon from '@ant-design/icons'
import ResumeSvg from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import DownloadSVG from '@/assets/svg/download.svg?react'
import ListSVG from '@/assets/svg/list.svg?react'
import GridSVG from '@/assets/svg/grid.svg?react'
import AddSVG from '@/assets/svg/add.svg?react'

import { Avatar, Button } from 'antd'

const Home = () => {
  const { user_name } = useUserStore((state) => state.info)

  const arr = [1, 2, 3, 4, 5]

  return (
    <div className={styles['layout-container']}>
      {/* 左边栏 */}
      <div className={styles['left-container']}>
        {/* logo区域 */}
        <div className={styles['logo-area']} />

        {/* 左边栏目导航区域 */}
        <div className={styles['left-nav']}>
          <ul>
            <li className={`${styles['left-nav-item']} ${styles['active']}`}>
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
            </li>
          </ul>
        </div>

        {/* 左边账号栏目 */}
        <div className={styles['left-bottom']}>
          <div className={styles['account-box']}>
            <Avatar size={24}>{user_name}</Avatar>
            <div className={styles['account']}>{user_name}</div>
          </div>
          <p className={styles['version-box']}>DevResume 1.0.0</p>
        </div>
      </div>

      {/* 右边简历栏目部分 */}
      <div className={styles['right-container']}>
        {/* 头部 */}
        <div className={styles['top']}>
          <h1>简历</h1>
          <div>
            <Button
              icon={<Icon component={GridSVG} />}
              style={{
                marginRight: '8px',
              }}
            >
              网格
            </Button>
            <Button icon={<Icon component={ListSVG} />}>列表</Button>
          </div>
        </div>

        {/* 底部 */}
        <div className={styles['bottom']}>
          {/* 新建部分 */}
          <div className={styles['resume-item']}>
            <div className={styles['icon-box']}>
              <Icon component={AddSVG} />
            </div>

            <div className={styles['resume-bottom']}>
              <p className={styles['resume-name']}>创建新简历</p>
              <p className={styles['update-time']}>从头开始构建</p>
            </div>
          </div>

          {/* 导入部分 */}
          <div className={styles['resume-item']}>
            <div className={styles['icon-box']}>
              <Icon component={DownloadSVG} className={styles['svg']} />
            </div>

            <div className={styles['resume-bottom']}>
              <p className={styles['resume-name']}>导入现有简历</p>
              <p className={styles['update-time']}>LinkedIn、JSON简历等</p>
            </div>
          </div>

          {/* 简历列表 */}
          {arr.map((item, index) => (
            <div
              className={`${styles['resume-item']} ${styles['animation-item']}`}
              style={{
                animationDelay: `0.${index + 1}s`,
              }}
              key={index}
            >
              <div className={styles['resume-bottom']}>
                <p className={styles['resume-name']}>我的简历 - {item}</p>
                <p className={styles['update-time']}>
                  最后更新于&nbsp;
                  <span
                    style={{
                      color: '#333',
                    }}
                  >
                    time
                  </span>
                  &nbsp;前
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
