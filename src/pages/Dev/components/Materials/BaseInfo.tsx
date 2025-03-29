import { Avatar, Input } from 'antd'
import Header from '@/components/Header'
import {
  CheckSquareOutlined,
  CloseOutlined,
  HolderOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import CustomInput from './components/CustomInput'
import CustomLayout from '../../../../components/CustomLayout'
import { useState } from 'react'
import { AddItemType } from '@/types/dev'
import styles from './index.module.scss'

const BaseInfo = () => {
  const [itemList, setItemList] = useState<AddItemType[]>([])

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
    <CustomLayout>
      <Header
        icon={InfoCircleOutlined}
        label="基础信息"
        opMenu={false}
      ></Header>
      <div className={styles['avatar-name-box']}>
        <div className="avatar-img">
          <Avatar shape="circle" size={54} icon={<UserOutlined />} />
        </div>
        <div className={styles['img-url-box']}>
          <p className="text-sm text-[#18181b] mb-2">头像</p>
          <Input
            placeholder="https://..."
            style={{
              height: '36px',
            }}
          />
        </div>
      </div>
      <CustomInput label="姓名" placeholder="请输入您的姓名"></CustomInput>
      <CustomInput label="求职岗位" placeholder="请输入求职岗位"></CustomInput>
      <div className={styles['row-form-item']}>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="电话"
            placeholder="请输入您的联系方式"
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
          ></CustomInput>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput label="性别" placeholder="请输入您的性别"></CustomInput>
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput label="年龄" placeholder="请输入您的年龄"></CustomInput>
        </div>
      </div>
      {itemList.map((item) => {
        return (
          <div className="flex items-center justify-around mt-4" key={item.id}>
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
