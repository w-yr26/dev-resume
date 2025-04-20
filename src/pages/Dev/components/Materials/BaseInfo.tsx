import { Avatar, Input } from 'antd'
import Header from '@/components/Header/index'
import Icon, {
  CheckSquareOutlined,
  CloseOutlined,
  HolderOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import InfoSVG from '@/assets/svg/dev/info.svg?react'
import CustomInput from './components/CustomInput'
import CustomLayout from '@/components/CustomLayout/index'
import { useEffect, useRef, useState } from 'react'
import { AddItemType } from '@/types/dev'
import styles from './index.module.scss'
import { useDevStore, useGlobalStore } from '@/store'

const BaseInfo = () => {
  const baseinfoRef = useRef<HTMLDivElement>(null)
  const { info } = useDevStore((state) => state.devSchema.dataSource.BASE_INFO)
  const changeBaseInfo = useDevStore((state) => state.immerBaseInfo)
  const setPosition = useGlobalStore((state) => state.setPosition)

  useEffect(() => {
    if (baseinfoRef.current) {
      const { y } = baseinfoRef.current.getBoundingClientRect()
      setPosition('BASE_INFO', y)
    }
  }, [])

  const [itemList, setItemList] = useState<AddItemType[]>([])

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    changeBaseInfo(e.target.value, key)
  }

  const handleAddItem = () => {
    setItemList([
      ...itemList,
      {
        label: 'undefined',
        value: 'undefined',
        id: new Date().getTime(),
      },
    ])
  }

  const handleDelItem = (id: number) => {
    setItemList(itemList.filter((item) => item.id !== id))
  }

  return (
    <CustomLayout ref={baseinfoRef}>
      <Header
        icon={InfoCircleOutlined}
        svg={<Icon component={InfoSVG} />}
        label="基础信息"
        opMenu={false}
      ></Header>
      <div className={styles['avatar-name-box']}>
        <div className="avatar-img">
          <Avatar shape="circle" size={54} icon={<UserOutlined />} />
        </div>
        <div className={styles['img-url-box']}>
          <p className={styles['label']}>头像</p>
          <Input
            placeholder="https://..."
            style={{
              height: '36px',
            }}
            disabled
            value={info.avatar}
          />
        </div>
      </div>
      <CustomInput
        label="姓名"
        placeholder="请输入您的姓名"
        value={info.user_name}
        onChange={(e) => {
          handleFieldChange(e, 'user_name')
        }}
      ></CustomInput>
      <CustomInput
        label="求职岗位"
        placeholder="请输入求职岗位"
        value={info.position}
        onChange={(e) => {
          handleFieldChange(e, 'position')
        }}
      ></CustomInput>
      <div className={styles['row-form-item']}>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="电话"
            placeholder="请输入您的联系方式"
            value={info.phone}
            onChange={(e) => {
              handleFieldChange(e, 'phone')
            }}
          ></CustomInput>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="电子邮件"
            placeholder="请输入您的邮件"
            value={info.email}
            onChange={(e) => {
              handleFieldChange(e, 'email')
            }}
          ></CustomInput>
        </div>
      </div>
      <div className={styles['row-form-item']}>
        <div
          style={{
            flex: 2,
          }}
        >
          <CustomInput
            label="个人博客"
            placeholder="https://example.com"
            value={info.blob}
            onChange={(e) => {
              handleFieldChange(e, 'blob')
            }}
          ></CustomInput>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="性别"
            placeholder="请输入您的性别"
            value={info.gender}
            onChange={(e) => {
              handleFieldChange(e, 'gender')
            }}
          ></CustomInput>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="年龄"
            placeholder="请输入您的年龄"
            value={info.age}
            onChange={(e) => {
              handleFieldChange(e, 'age')
            }}
          ></CustomInput>
        </div>
      </div>
      {itemList.map((item) => {
        return (
          <div className={styles['info-list-item']} key={item.id}>
            <HolderOutlined className="hover:cursor-help" />
            <CheckSquareOutlined />
            <Input
              style={{
                height: '36px',
                width: '40%',
              }}
              defaultValue={item.label}
            ></Input>
            <Input
              style={{
                height: '36px',
                width: '40%',
              }}
              defaultValue={item.value}
            ></Input>
            <CloseOutlined
              className="hover:cursor-help"
              onClick={() => {
                handleDelItem(item.id)
              }}
            />
          </div>
        )
      })}
      <div className={styles['custom-field-box']}>
        <PlusOutlined color="#3f3f46" />
        <span className={styles['custom-label']} onClick={handleAddItem}>
          添加自定义字段
        </span>
      </div>
    </CustomLayout>
  )
}

export default BaseInfo
