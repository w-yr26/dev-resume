import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import gridSVG from '@/assets/svg/grid.svg?react'
import type { templateListType } from '@/types/ui'
import styles from './index.module.scss'
import { useDevStore, useUIStore } from '@/store'
import { useRef } from 'react'
import { useElementPosition } from '@/hooks/useElementPosition'
import { Skeleton } from 'antd'

const Templates = ({
  temList,
  fetchUISchema,
}: {
  temList: templateListType[]
  fetchUISchema: (
    templateId: string,
    temList: templateListType[]
  ) => Promise<{
    code: 0 | 1
    temSchema: any | null
  }>
}) => {
  const templateId = useDevStore((state) => state.templateId)
  const setTemplateId = useDevStore((state) => state.setTemplateId)
  const setUiSchema = useUIStore((state) => state.setUiSchema)

  const changeTemplate = async (id: string) => {
    if (id === templateId) return
    setTemplateId(id)
    const { code, temSchema } = await fetchUISchema(id, temList)
    if (code) setUiSchema(temSchema)
  }

  const templateRef = useRef<HTMLDivElement>(null)
  useElementPosition(templateRef, 'template')

  return (
    <CustomLayout ref={templateRef}>
      <Header label="模板" svg={<Icon component={gridSVG} />} />
      {temList.length ? (
        <div className={styles['template-list']}>
          {temList.map((item) => (
            <div
              className={`${styles['template-item']} ${
                templateId === item.id ? styles['active-template'] : ''
              }`}
              style={{
                backgroundImage: `url(${item.fastPhoto})`,
              }}
              key={item.id}
              onClick={() => changeTemplate(item.id)}
            >
              <div className={styles['title-box']}>
                {item.templateName || item.name}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Skeleton paragraph={{ rows: 8 }} />
      )}
    </CustomLayout>
  )
}

export default Templates
