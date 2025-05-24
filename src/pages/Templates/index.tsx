import { getTemplatesAPI } from '@/apis/template'
import Icon from '@ant-design/icons'
import AddSVG from '@/assets/svg/add.svg?react'
import { useUserStore } from '@/store'
import { templateListType } from '@/types/ui'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const Templates = () => {
  const navigate = useNavigate()
  const userId = useUserStore((state) => state.info.id)
  const [temList, setTemList] = useState<templateListType[]>([])
  useEffect(() => {
    const getTemList = async (userId: string) => {
      const {
        data: { diyTemplateList, templateList },
      } = await getTemplatesAPI(userId)

      setTemList([...templateList, ...diyTemplateList])
    }

    getTemList(userId)
  }, [])

  return (
    <>
      <div className={styles['container-top']}>
        <h1>模板列表</h1>
      </div>
      <div className={styles['container-bottom']}>
        <div
          className={styles['resume-item']}
          onClick={() => navigate('/design')}
        >
          <div className={styles['icon-box']}>
            <Icon component={AddSVG} />
          </div>
          <div className={styles['resume-bottom']}>
            <p className={styles['resume-name']}>创建新模板</p>
            <p className={styles['update-time']}>从头开始构建</p>
          </div>
        </div>
        {temList.length
          ? temList.map((tem, index) => (
              <>
                <div
                  className={`${styles['resume-item']} ${styles['animation-item']}`}
                  style={{
                    animationDelay: `0.${index + 1}s`,
                  }}
                >
                  <div className={styles['resume-bottom']}>
                    <p className={styles['resume-name']}>{tem.name || tem.templateName}</p>
                    <p className={styles['update-time']}>
                      最后更新于&nbsp;
                      <span
                        style={{
                          color: '#333',
                        }}
                      >
                        {tem.updateTime}
                      </span>
                      &nbsp;前
                    </p>
                  </div>
                </div>
              </>
            ))
          : null}
      </div>
    </>
  )
}

export default Templates
