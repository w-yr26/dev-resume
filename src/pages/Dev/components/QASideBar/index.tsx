import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import brainSVG from '@/assets/svg/dev/brain.svg?react'
import refreshSVG from '@/assets/svg/dev/refresh.svg?react'
import { Card } from 'antd'
import CustomBtn from '@/components/CustomBtn'

const QASideBar = () => {
  return (
    <div className={styles['qa-side-container']}>
      <div className={styles['qa-list-title']}>
        <div>面试分析器</div>
      </div>

      <div className={styles['tooltip-card']}>
        {/* <Brain className={`${styles.icon} ${styles.purpleText}`} /> */}

        <div className={styles['icon-box']}>
          <Icon component={brainSVG} />
        </div>
        <div className={styles['text-container']}>
          <p className={styles['title']}>AI分析说明</p>
          <p className={styles['description']}>
            AI会深度分析你的技术实现细节，识别关键技术点的复杂度，生成针对性的深度面试问题。每个问题都包含考察重点和可能的追问，帮你全面准备。
          </p>
        </div>
      </div>

      <CustomBtn label="生成面试题" />

      <Card
        title="面试题预设"
        extra={<Icon component={refreshSVG} />}
        style={{ width: '100%' }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  )
}

export default QASideBar
