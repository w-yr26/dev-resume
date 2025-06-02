import { Popover } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import openSVG from '@/assets/svg/open.svg?react'
import editSVG from '@/assets/svg/edit.svg?react'
import copySVG from '@/assets/svg/copy.svg?react'
import deleteSVG from '@/assets/svg/delete.svg?react'

const WorkItem = ({
  index,
  title,
  updateTime,
  workId,
  snapshot,
  handleOpen,
  setSelectId,
  handleDel,
  setIsModalOpen,
  setWorkTitle,
}: {
  index: number
  title: string
  updateTime: string
  workId: string
  snapshot?: string
  setSelectId: (id: string) => void
  handleDel: (id: string) => void
  setWorkTitle: (title: string) => void
  setIsModalOpen: (val: boolean) => void
  handleOpen: (id: string) => void
}) => {
  const menuContent = (id: string, title: string) => (
    <div className={styles['menu-list']}>
      <div className={styles['menu-item-box']} onClick={() => handleOpen(id)}>
        <Icon component={openSVG} />
        <span className={styles['item-label']}>打开</span>
      </div>
      <div
        className={styles['menu-item-box']}
        onClick={() => {
          setSelectId(id)
          setWorkTitle(title)
          setIsModalOpen(true)
        }}
      >
        <Icon component={editSVG} />
        <span className={styles['item-label']}>重命名</span>
      </div>
      <div className={styles['menu-item-box']}>
        <Icon component={copySVG} />
        <span className={styles['item-label']}>复制</span>
      </div>
      <div
        className={`${styles['menu-item-box']} ${styles['del-item-box']}`}
        onClick={() => handleDel(id)}
      >
        <Icon component={deleteSVG} />
        <span className={styles['item-label']}>删除</span>
      </div>
    </div>
  )

  return (
    <Popover
      content={() => menuContent(workId, title)}
      title={null}
      trigger="click"
    >
      <div
        className={`${styles['resume-item']} ${styles['animation-item']}`}
        style={{
          animationDelay: `0.${index + 1}s`,
          backgroundImage: snapshot ? `url(${snapshot})` : '',
          backgroundSize: snapshot ? 'contain' : 'none',
          backgroundRepeat: snapshot ? 'no-repeat' : 'none',
        }}
      >
        <div className={styles['resume-bottom']}>
          <p className={styles['resume-name']}>{title}</p>
          <p className={styles['update-time']}>
            最后更新于&nbsp;
            <span
              style={{
                color: '#333',
              }}
            >
              {updateTime}
            </span>
            &nbsp;前
          </p>
        </div>
      </div>
    </Popover>
  )
}

export default WorkItem
