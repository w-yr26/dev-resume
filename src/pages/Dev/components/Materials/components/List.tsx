import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  HolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, Popover } from 'antd'
import styles from './index.module.scss'

type ListProps<T> = {
  data: T[]
  fieldMap: {
    id: keyof T
    title: keyof T
    subTitle: keyof T
    visible: keyof T
  }
  handleAdd: () => void
  handleVisible: (id: string) => void
  handleDel: (id: string) => void
}

const List = <T,>({
  data,
  fieldMap,
  handleAdd,
  handleVisible,
  handleDel,
}: ListProps<T>) => {
  const content = (item: T) => (
    <div className={styles['menu-list']}>
      <div
        className={styles['menu-item']}
        onClick={() => handleVisible(item[fieldMap.id] as string)}
      >
        <div className={styles['menu-icon-box']}>
          {item[fieldMap.visible] ? <CheckOutlined /> : ''}
        </div>
        <div className={styles['menu-item-label']}>可见</div>
      </div>
      <div className={styles['menu-item']}>
        <div className={styles['menu-icon-box']}>
          <EditOutlined />
        </div>
        <div className={styles['menu-item-label']}>编辑</div>
      </div>
      <div
        className={`${styles['menu-item']} ${styles['menu-item-del']}`}
        onClick={() => handleDel(item[fieldMap.id] as string)}
      >
        <div className={styles['menu-icon-box']}>
          <DeleteOutlined color="#c83c2d" />
        </div>
        <div className={styles['menu-item-label']}>删除</div>
      </div>
    </div>
  )
  return (
    <>
      <div className={styles['list-box']}>
        {data.map((item) => {
          return (
            <Popover
              key={String(item[fieldMap.id])}
              content={() => content(item)}
              trigger="click"
              placement="bottom"
            >
              <div
                className={styles['item-box']}
                style={{
                  backgroundColor: item[fieldMap.visible] ? '' : '#f7f4f4aa',
                }}
              >
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
            </Popover>
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
