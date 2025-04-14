import { useDevStore } from '@/store'
import styles from './index.module.scss'
import { useMemo } from 'react'

const WorkTem = () => {
  const {
    info: workInfo,
    visible,
    label,
  } = useDevStore((state) => state.devSchema.dataSource.WORK_EXP)

  const hideHead = useMemo(() => {
    return workInfo.findIndex((item) => item.visible) === -1
  }, [workInfo])

  return (
    <>
      {visible &&
        (hideHead ? null : (
          <div className={styles['work-wrapper']}>
            <div className={styles['left-wrapper']}>{label || '工作经历'}</div>
            <div className={styles['right-wrapper']}>
              {workInfo.map((infoItem) => {
                if (!infoItem.visible) return null
                return (
                  <div key={infoItem.id} className={styles['content-box']}>
                    <div className={styles['content-head']}>
                      <span className="project-name">{infoItem.company}</span>
                      <span className="date">
                        {infoItem.date[0].format('YYYY-MM')} -{' '}
                        {infoItem.date[1].format('YYYY-MM')}
                      </span>
                    </div>
                    <div className="overview-box">
                      <div className={styles['module-head']}>项目概述：</div>
                      <div className={styles['content-box']}>
                        <p>{infoItem.overview}</p>
                      </div>
                    </div>
                    <div className="output-box">
                      <div className={styles['module-head']}>项目内容：</div>
                      <div
                        className={styles['content-box']}
                        dangerouslySetInnerHTML={{
                          __html: infoItem.output,
                        }}
                      />
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
