import { useDevStore } from '@/store'
import styles from './index.module.scss'

const SkillTem = () => {
  const { info: skillInfo } = useDevStore(
    (state) => state.devSchema.dataSource.SKILL_LIST
  )

  return (
    <div className={styles['edu-bg-wrapper']}>
      <div className={styles['left-wrapper']}>主要技能</div>
      <div className={styles['right-wrapper']}>
        {
          <div
            className={styles['content-box']}
            dangerouslySetInnerHTML={{
              __html: skillInfo,
            }}
          />
        }
      </div>
    </div>
  )
}

export default SkillTem
