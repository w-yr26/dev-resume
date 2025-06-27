import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
// import DragSVG from '@/assets/svg/dev/drag.svg?react'

import { Button, Popover } from 'antd'
import styles from './index.module.scss'
import { delModuleSingleInfoAPI } from '@/apis/resume'
import { useDevStore } from '@/store'
import { keyType } from '@/types/dev'

type ListProps<T> = {
  type?: keyType
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
  handleEdit: (id: string) => void
}

const List = <T,>({
  type,
  data,
  fieldMap,
  handleAdd,
  handleVisible,
  handleDel,
  handleEdit,
}: ListProps<T>) => {
  const resumeId = useDevStore((state) => state.resumeId)
  const delSingleInfo = async (item: T) => {
    const singleInfoId = item[fieldMap.id] as string
    // 调用API删除数据库记录
    const { code } = await delModuleSingleInfoAPI(singleInfoId, resumeId, type!)
    // 数据库正确删除了，才能删store的
    if (code === 1)
      // store删除
      handleDel(singleInfoId)
  }

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
      <div
        className={styles['menu-item']}
        onClick={() => handleEdit(item[fieldMap.id] as string)}
      >
        <div className={styles['menu-icon-box']}>
          <EditOutlined />
        </div>
        <div className={styles['menu-item-label']}>编辑</div>
      </div>
      <div
        className={`${styles['menu-item']} ${styles['menu-item-del']}`}
        onClick={() => delSingleInfo(item)}
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
                {/* <Icon component={DragSVG} /> */}
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
