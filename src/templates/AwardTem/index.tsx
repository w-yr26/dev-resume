import { useDevStore } from '@/store'
import styles from './index.module.scss'
import { useMemo } from 'react'

const WorkTem = () => {
  const {
    info: awardInfo,
    visible,
    label,
  } = useDevStore((state) => state.devSchema.dataSource.AWARD_LIST)

  const hideHead = useMemo(() => {
    return awardInfo.findIndex((item) => item.visible) === -1
  }, [awardInfo])

  return (
    <>
      {visible &&
        (hideHead ? null : (
          <div className={styles['work-wrapper']}>
            <div className={styles['left-wrapper']}>{label || '荣誉奖项'}</div>
            <div className={styles['right-wrapper']}>
              {awardInfo.map((infoItem) => {
                if (!infoItem.visible) return null
                return (
                  <div key={infoItem.id}>
                    <div className={styles['content-head']}>
                      <span className="project-name">{infoItem.award}</span>
                      <span className="date">
                        {infoItem.date[0].format('YYYY-MM')} -{' '}
                        {infoItem.date[1].format('YYYY-MM')}
                      </span>
                    </div>
                    <div className="overview-box">
                      <p>{infoItem.describe}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
    </>
  )
}

export default WorkTem
