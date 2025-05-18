import { Input, Upload } from 'antd'
import type { UploadProps } from 'antd'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import InfoSVG from '@/assets/svg/dev/info.svg?react'
import uploadSVG from '@/assets/svg/dev/upload.svg?react'
import CustomInput from './components/CustomInput'
import CustomLayout from '@/components/CustomLayout/index'
import React, { useEffect, useRef } from 'react'
// import { AddItemType } from '@/types/dev'
import styles from './index.module.scss'
import './custom.scss'
import { useDevStore, useGlobalStore } from '@/store'
import { postUploadOneAPI } from '@/apis/user'

const BaseInfo = () => {
  const baseinfoRef = useRef<HTMLDivElement>(null)
  const {
    info: [baseInfo],
  } = useDevStore((state) => state.devSchema.dataSource.BASE_INFO)
  const changeBaseInfo = useDevStore((state) => state.immerBaseInfo)
  const setPosition = useGlobalStore((state) => state.setPosition)

  useEffect(() => {
    if (baseinfoRef.current) {
      const { y } = baseinfoRef.current.getBoundingClientRect()
      setPosition('BASE_INFO', y)
    }
  }, [])

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    changeBaseInfo(e.target.value, key)
  }

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none', fontSize: '18px' }}
      type="button"
    >
      <Icon component={uploadSVG}></Icon>
    </button>
  )

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const file = options.file
    const fd = new FormData()
    fd.append('image', file)
    const { data } = await postUploadOneAPI(fd)
    console.log('data', data)
  }

  return (
    <CustomLayout ref={baseinfoRef}>
      <Header
        svg={<Icon component={InfoSVG} />}
        label="基础信息"
        opMenu={false}
      />
      <div className={styles['avatar-name-box']}>
        <div className="avatar-img">
          {/* <Avatar
            shape="circle"
            size={54}
            icon={<Icon component={userSVG} />}
          /> */}
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleUpload}
          >
            {baseInfo?.avatar ? (
              <img
                src={baseInfo?.avatar}
                alt="avatar"
                style={{ width: '80px', height: '80px', borderRadius: '50%' }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className={styles['img-url-box']}>
          <p className={styles['label']}>头像</p>
          <Input
            placeholder="https://..."
            style={{
              height: '36px',
            }}
            disabled
            value={baseInfo?.avatar}
          />
        </div>
      </div>

      <div className={styles['row-form-item']}>
        <div
          style={{
            flex: 2,
          }}
        >
          <CustomInput
            label="姓名"
            placeholder="请输入您的姓名"
            value={baseInfo?.userName}
            onChange={(e) => {
              handleFieldChange(e, 'userName')
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="性别"
            placeholder="请输入您的性别"
            value={baseInfo?.gender}
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
            value={baseInfo?.age}
            onChange={(e) => {
              handleFieldChange(e, 'age')
            }}
          ></CustomInput>
        </div>
      </div>
      <CustomInput
        label="求职岗位"
        placeholder="请输入求职岗位"
        value={baseInfo?.position}
        onChange={(e) => {
          handleFieldChange(e, 'position')
        }}
      />
      <div className={styles['row-form-item']}>
        <div
          style={{
            flex: 1,
          }}
        >
          <CustomInput
            label="电话"
            placeholder="请输入您的联系方式"
            value={baseInfo?.phone}
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
            value={baseInfo?.email}
            onChange={(e) => {
              handleFieldChange(e, 'email')
            }}
          ></CustomInput>
        </div>
      </div>

      <CustomInput
        label="个人博客"
        placeholder="https://example.com"
        value={baseInfo?.tblob}
        onChange={(e) => {
          handleFieldChange(e, 'tblob')
        }}
      />
    </CustomLayout>
  )
}

export default BaseInfo
