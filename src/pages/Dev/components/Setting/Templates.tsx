import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import gridSVG from '@/assets/svg/grid.svg?react'
import type { templateListType } from '@/types/ui'
import styles from './index.module.scss'
import { useDevStore } from '@/store'

const Templates = ({ temList }: { temList: templateListType[] }) => {
  const templateId = useDevStore((state) => state.templateId)
  const setTemplateId = useDevStore((state) => state.setTemplateId)

  const changeTemplate = (id: string) => {
    if (id === templateId) return
    setTemplateId(id)
  }

  return (
    <CustomLayout>
      <Header label="模板" svg={<Icon component={gridSVG} />} />
      <div className={styles['template-list']}>
        {temList.map((item) => (
          <div
            className={`${styles['template-item']} ${
              templateId === item.id ? styles['active-template'] : ''
            }`}
            key={item.id}
            onClick={() => changeTemplate(item.id)}
          >
            <div className={styles['title-box']}>{item.templateName}</div>
          </div>
        ))}
      </div>
    </CustomLayout>
  )
}

export default Templates
