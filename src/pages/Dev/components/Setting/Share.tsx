import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
import JsonSVG from '@/assets/svg/dev/json.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'
import styles from './index.module.scss'
import { ConfigProvider, Input, message, Modal, Select, Tooltip } from 'antd'
import CustomBtn from '@/components/CustomBtn'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const durationOptions = [
  {
    value: '4h',
    label: '4小时',
  },
  {
    value: '24h',
    label: '24小时',
  },
  {
    value: '3d',
    label: '3天',
  },
]

const countOptions = [
  {
    value: 1,
    label: '1次',
  },
  {
    value: 5,
    label: '5次',
  },
  {
    value: 10,
    label: '10次',
  },
  {
    value: -1,
    label: '无限制',
  },
]

const normalizeSeparators = (input: string) => {
  // 将全角逗号、分号替换为半角
  return input
    .replace(/，/g, ',') // 全角逗号
    .replace(/；/g, ';') // 全角分号
}

const Share = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pwd, setPwd] = useState('')
  const [emailList, setEmailList] = useState('')

  // 分割、校验
  const validateAndSplitUsers = () => {
    // 1. 标准化分隔符
    const normalized = normalizeSeparators(emailList.trim())
    // 校验：是否只包含合法字符（字母、数字、@、点、分隔符、空格）
    const hasIllegalChar = /[^a-zA-Z0-9@._,\s;，；]/.test(emailList)

    // 校验：是否有连续分隔符或空邮箱（忽略空格）
    const cleaned = normalized.replace(/\s+/g, '') // 去除所有空格
    const hasConsecutiveSeparators = /([,;]){2,}/.test(cleaned)

    // 拆分并清理邮箱
    const userList = normalized
      .split(/[,;，；]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0)

    // 校验是否全部是 @163.com 的邮箱
    const allEmailsValid = userList.every((email) =>
      /^[a-zA-Z0-9._-]+@163\.com$/.test(email)
    )

    return {
      userList,
      isValid: !hasIllegalChar && !hasConsecutiveSeparators && allEmailsValid,
    }
  }

  const generatorShareLink = () => {
    if (!emailList) return message.warning('请输入目标分享用户邮箱')
    const { userList, isValid } = validateAndSplitUsers()
    if (!isValid) return message.warning('请按正确格式输入邮箱列表')
    console.log(userList)
  }

  return (
    <>
      <CustomLayout>
        <Header label="分享" svg={<Icon component={OutputSVG} />} />
        <div
          className={styles['down-load-box']}
          style={{
            marginBottom: '8px',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <div className={styles['icon-box']}>
            <Icon component={JsonSVG} />
          </div>
          <div className={styles['content-box']}>
            <div className={styles['title']}>链接</div>
            <div className={styles['subtitle']}>配置分享设置并生成链接</div>
          </div>
        </div>
      </CustomLayout>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: '#fafafa',
              footerBg: '#fafafa',
              headerBg: '#fafafa',
              boxShadow: 'none',
            },
          },
        }}
      >
        <Modal
          styles={{
            mask: {
              backgroundColor: 'rgba(250, 250, 250, 0.9)',
            },
            content: {
              border: '1px solid #e4e4e7',
            },
          }}
          title="分享设置"
          width={600}
          footer={[
            <CustomBtn
              key="create"
              label="生成分享链接"
              onClick={generatorShareLink}
            />,
          ]}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className={styles['create-form-container']}>
            <div className={styles['raw-box']}>
              <div className={styles['create-form-item']}>
                <p className={styles['label']}>链接过期时间</p>
                <div className={styles['body']}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          activeBorderColor: '#18181b',
                          hoverBorderColor: '#18181b',
                          activeOutlineColor: 'none',
                          optionSelectedBg: 'none',
                          selectorBg: '#fafafa',
                          optionHeight: 35,
                        },
                      },
                    }}
                  >
                    <Select
                      className={styles['custom-input']}
                      defaultValue="4h"
                      options={durationOptions}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div className={styles['create-form-item']}>
                <p className={styles['label']}>最大访问次数</p>
                <div className={styles['body']}>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          activeBorderColor: '#18181b',
                          hoverBorderColor: '#18181b',
                          activeOutlineColor: 'none',
                          optionSelectedBg: 'none',
                          selectorBg: '#fafafa',
                          optionHeight: 35,
                        },
                      },
                    }}
                  >
                    <Select
                      className={styles['custom-input']}
                      defaultValue={5}
                      options={countOptions}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>访问密码(可选)</p>
              <div className={`${styles['body']} ${styles['raw-box']}`}>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: '#18181b',
                        hoverBorderColor: '#18181b',
                        activeShadow: 'none',
                      },
                    },
                  }}
                >
                  <Input
                    className={styles['custom-input']}
                    placeholder="设置访问密码"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                </ConfigProvider>
                <div
                  className={styles['random-box']}
                  onClick={() => setPwd(uuidv4())}
                >
                  <Tooltip title="点击生成随机密码">
                    <Icon component={RandomSVG} />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>分享人员邮箱</p>
              <div className={styles['body']}>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: '#18181b',
                        hoverBorderColor: '#18181b',
                        activeShadow: 'none',
                      },
                    },
                  }}
                >
                  <Input
                    className={styles['custom-input']}
                    placeholder="输入邮箱地址(@163.com)，按分号或逗号分隔"
                    value={emailList}
                    onChange={(e) => setEmailList(e.target.value)}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default Share
