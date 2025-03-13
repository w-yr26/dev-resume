import { Avatar, Input } from 'antd'
import Header from './Header'
import {
  CheckSquareOutlined,
  CloseOutlined,
  HolderOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import CustomInput from './CustomInput'
import { useState } from 'react'
import { AddItemType } from '@/types/dev'

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
    <div className="base-info-container border-b-1 border-[#e4e4e7] py-6">
      <Header
        icon={InfoCircleOutlined}
        label="基础信息"
        opMenu={false}
      ></Header>
      <div className="flex items-center h-[64px]">
        <div className="avatar-img">
          <Avatar shape="circle" size={54} icon={<UserOutlined />} />
        </div>
        <div className="ml-4 flex-1">
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
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex-1 mr-4">
          <CustomInput
            label="电话"
            placeholder="请输入您的联系方式"
          ></CustomInput>
        </div>
        <div className="flex-1">
          <CustomInput
            label="电子邮件"
            placeholder="请输入您的邮件"
          ></CustomInput>
          {/* <CustomInput
            label="个人博客"
            placeholder="https://example.com"
          ></CustomInput> */}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex-2 mr-4">
          <CustomInput
            label="个人博客"
            placeholder="https://example.com"
          ></CustomInput>
        </div>
        <div className="flex-1 mr-2">
          <CustomInput label="性别" placeholder="请输入您的性别"></CustomInput>
        </div>
        <div className="flex-1">
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
      <div className="flex items-center h-[48px]">
        <PlusOutlined color="#3f3f46" />
        <span
          className="ml-4 text-[#3f3f46] hover:underline hover:cursor-help"
          onClick={handleAddItem}
        >
          添加自定义字段
        </span>
      </div>
    </div>
  )
}

export default BaseInfo
