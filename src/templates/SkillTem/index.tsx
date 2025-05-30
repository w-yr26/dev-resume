import { useDevStore } from '@/store'
import styles from './index.module.scss'
import { checkRichTextIsEmpty } from '@/utils'
const SkillTem = () => {
  const {
    info: skillInfo,
    visible,
    label,
  } = useDevStore((state) => state.devSchema.dataSource.SKILL_LIST)

  return visible && !checkRichTextIsEmpty(skillInfo) ? (
    <div className={styles['edu-bg-wrapper']}>
      <div className={styles['left-wrapper']}>{label}</div>
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
  ) : null
}

export default SkillTem
