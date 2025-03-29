import { HolderOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styles from './index.module.scss'

type ListProps<T> = {
  data: T[]
  fieldMap: {
    id: keyof T
    title: keyof T
    subTitle: keyof T
  }
  handleAdd: () => void
}

const List = <T,>({ data, fieldMap, handleAdd }: ListProps<T>) => {
  return (
    <>
      <div className={styles['list-box']}>
        {data.map((item) => {
          return (
            <div key={String(item[fieldMap.id])} className={styles['item-box']}>
              <HolderOutlined />
              <div className={styles['msg-box']}>
                <p className={styles['label-primary']}>
                  {String(item[fieldMap.title])}
                </p>
                <p className={styles['label-sub']}>
                  {String(item[fieldMap.subTitle])}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles['more-btn-box']}>
        <Button icon={<PlusOutlined />} onClick={handleAdd}>
          添加一项
        </Button>
      </div>
    </>
  )
}

export default List
