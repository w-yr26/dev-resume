import { Input, Upload } from 'antd'
import type { UploadProps } from 'antd'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import InfoSVG from '@/assets/svg/dev/info.svg?react'
import uploadSVG from '@/assets/svg/dev/upload.svg?react'
import CustomInput from './components/CustomInput'
import CustomLayout from '@/components/CustomLayout/index'
import React, { useRef } from 'react'
// import { AddItemType } from '@/types/dev'
import styles from './index.module.scss'
import './custom.scss'
import { useDevStore, useUserStore } from '@/store'
import { postUploadOneAPI } from '@/apis/user'
import { postModuleInfoAPI } from '@/apis/resume'
import { useElementPosition } from '@/hooks/useElementPosition'

const BaseInfo = () => {
  const baseinfoRef = useRef<HTMLDivElement>(null)
  const {
    info: [baseInfo],
  } = useDevStore((state) => state.devSchema.dataSource.BASE_INFO)
  const userId = useUserStore((state) => state.info.id)
  const resumeId = useDevStore((state) => state.resumeId)
  const changeBaseInfo = useDevStore((state) => state.immerBaseInfo)

  useElementPosition(baseinfoRef, 'BASE_INFO')

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    changeBaseInfo(e.target.value, key)
  }

  const updateDBInfo = async (
    e: React.FocusEvent<HTMLInputElement>,
    key: string
  ) => {
    await postModuleInfoAPI({
      type: 'BASE_INFO',
      resumeId,
      userId,
      content: {
        id: baseInfo.id,
        [key]: e.target.value,
      },
    })
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
    console.log('file', file)

    const fd = new FormData()
    fd.append('file', file)
    const { data: avatar } = await postUploadOneAPI(fd, 'avatar')

    // 保存数据库
    await postModuleInfoAPI({
      type: 'BASE_INFO',
      resumeId,
      userId,
      content: {
        id: baseInfo.id,
        avatar,
      },
    })
    // 更新store
    changeBaseInfo(avatar, 'avatar')
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
            placeholder=""
            value={baseInfo?.userName}
            onChange={(e) => {
              handleFieldChange(e, 'userName')
            }}
            onBlur={(e) => {
              updateDBInfo(e, 'userName')
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
            placeholder=""
            value={baseInfo?.gender}
            onChange={(e) => {
              handleFieldChange(e, 'gender')
            }}
            onBlur={(e) => {
              updateDBInfo(e, 'gender')
            }}
          />
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
            onBlur={(e) => {
              updateDBInfo(e, 'age')
            }}
          />
        </div>
      </div>
      <CustomInput
        label="求职岗位"
        placeholder="请输入求职岗位"
        value={baseInfo?.position}
        onChange={(e) => {
          handleFieldChange(e, 'position')
        }}
        onBlur={(e) => {
          updateDBInfo(e, 'position')
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
            onBlur={(e) => {
              updateDBInfo(e, 'phone')
            }}
          />
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
            onBlur={(e) => {
              updateDBInfo(e, 'email')
            }}
          />
        </div>
      </div>

      <CustomInput
        label="个人博客"
        placeholder="https://example.com"
        value={baseInfo?.tblob}
        onChange={(e) => {
          handleFieldChange(e, 'tblob')
        }}
        onBlur={(e) => {
          updateDBInfo(e, 'tblob')
        }}
      />
    </CustomLayout>
  )
}

export default BaseInfo
