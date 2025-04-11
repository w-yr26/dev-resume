import { useDevStore } from '@/store'
import styles from './index.module.scss'
import { checkRichTextIsEmpty } from '@/utils'

const SkillTem = () => {
  const {
    info: eduBgInfo,
    visible,
    label,
  } = useDevStore((state) => state.devSchema.dataSource.EDU_BG)

  return visible && !checkRichTextIsEmpty(eduBgInfo) ? (
    <div className={styles['edu-bg-wrapper']}>
      <div className={styles['left-wrapper']}>{label}</div>
      <div className={styles['right-wrapper']}>
        {
          <div
            className={styles['content-box']}
            dangerouslySetInnerHTML={{
              __html: eduBgInfo,
            }}
          />
        }
      </div>
    </div>
  ) : null
}

export default SkillTem
