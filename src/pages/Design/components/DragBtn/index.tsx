import Icon from '@ant-design/icons'
import addSVG from '@/assets/svg/add.svg?react'
import styles from './index.module.scss'

const DragBtn = () => {
  return (
    <div className={styles['add-btn']}>
      <Icon component={addSVG} />
      <span>拖拽组件到此处</span>
    </div>
  )
}

export default DragBtn
