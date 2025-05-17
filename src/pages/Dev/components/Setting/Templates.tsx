import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import gridSVG from '@/assets/svg/grid.svg?react'
import type { templateListType } from '@/types/ui'
import styles from './index.module.scss'

const Templates = ({ temList }: { temList: templateListType[] }) => {
  // console.log('temList', temList)

  return (
    <CustomLayout>
      <Header label="模板" svg={<Icon component={gridSVG} />} />
      <div className={styles['template-list']}>
        {temList.map((item) => (
          <div className={styles['template-item']} key={item.id}>
            <div className={styles['title-box']}>{item.templateName}</div>
          </div>
        ))}
      </div>
    </CustomLayout>
  )
}

export default Templates
