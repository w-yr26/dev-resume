import { memo, useMemo } from 'react'

import { useDevStore } from '@/store'
import styles from './index.module.scss'

const EduBgTem = memo(() => {
  const {
    info: projectInfo,
    label,
    visible,
  } = useDevStore((state) => state.devSchema.dataSource.PROJECT_EXP)

  const isHide = useMemo(() => {
    return projectInfo.every((item) => !item.visible)
  }, [projectInfo])
  return (
    <>
      {visible &&
        (isHide ? null : (
          <div className={styles['edu-bg-wrapper']}>
            <div className={styles['left-wrapper']}>{label}</div>
            <div className={styles['right-wrapper']}>
              {projectInfo.map((infoItem) => {
                return (
                  <div key={infoItem.id}>
                    <div className={styles['content-head']}>
                      <span className="project-name">{infoItem.name}</span>
                      <span className="date">
                        {infoItem.date[0].format('YYYY-MM')} -{' '}
                        {infoItem.date[1].format('YYYY-MM')}
                      </span>
                    </div>
                    <div className={styles['link-box']}>https://baidu.com</div>
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
})

export default EduBgTem
