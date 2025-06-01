import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
import JsonSVG from '@/assets/svg/dev/json.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'
import styles from './index.module.scss'
import {
  Checkbox,
  Col,
  ConfigProvider,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from 'antd'
import CustomBtn from '@/components/CustomBtn'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getLinkListsAPI, postShareLinkAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import dayjs from 'dayjs'
import { linkItem } from '@/types/resume'
import LinkItem from './components/LinkItem'
import DevModalFormItem from '@/components/DevModalFormItem'

const durationOptions = [
  {
    value: 4,
    label: '4小时',
  },
  {
    value: 24,
    label: '24小时',
  },
  {
    value: 72,
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
  const resumeId = useDevStore((state) => state.resumeId)
  console.log('resumeId', resumeId)

  const userId = useUserStore((state) => state.info.id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pwd, setPwd] = useState<undefined | string>(undefined)
  const [emailList, setEmailList] = useState('')
  const [count, setCount] = useState(5)
  const [hour, setHour] = useState(4)
  const [linkList, setLinkList] = useState<linkItem[]>([])
  const [activeTab, setActiveTab] = useState<'setting' | 'history'>('setting')
  const [permissionArr, setPermissionArr] = useState<number[]>([1])

  useEffect(() => {
    if (!resumeId || !userId) return
    const getLinksList = async () => {
      const { data } = await getLinkListsAPI(userId, resumeId)
      setLinkList(data)
    }
    getLinksList()
  }, [resumeId, userId])

  const handleDelLinkList = (id: number) => {
    setLinkList(linkList.filter((i) => i.id !== id))
  }

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

  const resetState = () => {
    setCount(5)
    setHour(4)
    setPwd('')
    setEmailList('')
    setIsModalOpen(false)
  }

  // 设置邮箱权限
  const handleGroupChange = (val: number[]) => {
    setPermissionArr(val)
  }

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      message.success('分享链接已复制至剪切板')
    } catch (_) {
      message.error('分享失败，请稍后再试')
    }
  }

  const generatorShareLink = async () => {
    const { userList, isValid } = validateAndSplitUsers()
    if (!isValid) return message.warning('请按正确格式输入邮箱列表')
    const { data } = await postShareLinkAPI({
      resourceType: 'resume',
      maxVisits: count === -1 ? undefined : count,
      password: pwd ?? undefined,
      expireAt: dayjs().add(hour, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      accessType: userList.length ? 'private' : 'public',
      targetList: userList.length
        ? userList.map((i) => ({
            targetType: 'email',
            targetValue: i,
          }))
        : [],
      resourceId: resumeId,
      userId: Number(userId),
      permissions: JSON.stringify(permissionArr),
    })
    await handleCopy(data.share_url)
    resetState()
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
            activeTab === 'setting' ? (
              <CustomBtn
                key="create"
                label="生成分享链接"
                onClick={generatorShareLink}
              />
            ) : null,
          ]}
          open={isModalOpen}
          onCancel={() => resetState()}
        >
          <div className={styles['tab-bar']}>
            <div
              className={`${styles['tab-item-box']} ${
                styles[activeTab === 'setting' ? 'active-tab' : '']
              }`}
              onClick={() => setActiveTab('setting')}
            >
              分享设置
            </div>
            <div
              className={`${styles['tab-item-box']} ${
                styles[activeTab === 'history' ? 'active-tab' : '']
              }`}
              onClick={() => setActiveTab('history')}
            >
              分享历史
            </div>
          </div>
          {activeTab === 'setting' ? (
            <div className={styles['create-form-container']}>
              <div className={styles['raw-box']}>
                <DevModalFormItem
                  title="访问时间限制"
                  primary={
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
                        value={hour}
                        options={durationOptions}
                        onChange={(e) => setHour(e)}
                      />
                    </ConfigProvider>
                  }
                />
                <DevModalFormItem
                  title="访问次数限制"
                  primary={
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
                        value={count}
                        options={countOptions}
                        onChange={(e) => setCount(e)}
                      />
                    </ConfigProvider>
                  }
                />
              </div>
              <DevModalFormItem
                title="访问密码(可选)"
                primary={
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
                }
                icon={
                  <Tooltip title="点击生成随机密码">
                    <Icon component={RandomSVG} />
                  </Tooltip>
                }
                handleRandom={() => setPwd(uuidv4())}
              />
              <DevModalFormItem
                title="分享权限"
                primary={
                  <ConfigProvider
                    theme={{
                      components: {
                        Checkbox: {
                          colorPrimary: '#18181b',
                          colorPrimaryHover: '#18181b',
                          colorPrimaryBorder: '#18181b',
                        },
                      },
                    }}
                  >
                    <Checkbox.Group
                      style={{ width: '100%', color: 'red' }}
                      value={permissionArr}
                      onChange={(val) => handleGroupChange(val)}
                    >
                      <Row>
                        <Col span={12}>
                          <Checkbox value={1} disabled>
                            阅读
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value={2}>评论</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value={3}>编辑</Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox value={4}>复制</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </ConfigProvider>
                }
              />
              <DevModalFormItem
                title="分享人员邮箱"
                primary={
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
                }
              />
            </div>
          ) : (
            <div className={styles['history-box']}>
              <p>共 {linkList.length} 条分享记录</p>
              <div className={styles['history-list-box']}>
                {linkList.length
                  ? linkList.map((link, index) => (
                      <LinkItem
                        key={link.shareUrl}
                        link={link}
                        index={index}
                        handleDelLinkList={handleDelLinkList}
                        handleCopy={handleCopy}
                      />
                    ))
                  : null}
              </div>
            </div>
          )}
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default Share
