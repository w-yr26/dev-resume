import { useDevStore } from '@/store'
import styles from './index.module.scss'

const WorkTem = () => {
  const { info: workInfo } = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP
  )
  return (
    <div className={styles['work-wrapper']}>
      <div className={styles['left-wrapper']}>工作经历</div>
      <div className={styles['right-wrapper']}>
        {workInfo.map((infoItem) => {
          return (
            <div key={infoItem.id}>
              <div className={styles['content-head']}>
                <span className="project-name">{infoItem.company}</span>
                <span className="date">{infoItem.date}</span>
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
  )
}

export default WorkTem
