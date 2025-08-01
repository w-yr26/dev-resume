import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import shareSVG from '@/assets/svg/dev/share.svg?react'
import JsonSVG from '@/assets/svg/dev/json.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'
import styles from './index.module.scss'
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Empty,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tooltip,
} from 'antd'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getLinkListsAPI, postShareLinkAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import dayjs from 'dayjs'
import type { linkItem, shareUserItem } from '@/types/resume'
import LinkItem from './components/LinkItem'
import DevModalFormItem from '@/components/DevModalFormItem'
import { useElementPosition } from '@/hooks/useElementPosition'
import DevTabs from '@/components/DevTabs'

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

const tabsOptions = [
  {
    key: 'setting',
    label: '分享设置',
  },
  {
    key: 'history',
    label: '分享历史',
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
  const userId = useUserStore((state) => state.info.id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pwd, setPwd] = useState<undefined | string>(undefined)
  const [emailList, setEmailList] = useState('')
  const [count, setCount] = useState(5)
  const [hour, setHour] = useState(4)
  const [linkList, setLinkList] = useState<linkItem[]>([])
  const [activeTab, setActiveTab] = useState(0)
  const [permissionArr, setPermissionArr] = useState<number[]>([1])

  const shareRef = useRef<HTMLDivElement>(null)
  useElementPosition(shareRef, 'share')

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

    const targetList = userList.length
      ? userList.map(
          (i): shareUserItem => ({
            targetType: 'email',
            targetValue: i,
          })
        )
      : []

    const { data } = await postShareLinkAPI({
      resourceType: 'resume',
      maxVisits: count === -1 ? undefined : count,
      password: pwd ?? undefined,
      expireAt: dayjs().add(hour, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      accessType: userList.length ? 'private' : 'public',
      targetList,
      resourceId: resumeId,
      userId: Number(userId),
      permissions: JSON.stringify(permissionArr),
    })
    await handleCopy(data.share_url)
    setLinkList((prev) => {
      return [
        {
          accessType: userList.length ? 'private' : 'public',
          createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          expireAt: dayjs().add(hour, 'hours').format('YYYY-MM-DD HH:mm:ss'),
          id: new Date().getTime(),
          isActive: 1,
          isDeleted: 0,
          maxVisits: count === -1 ? undefined : count,
          permissions: JSON.stringify(permissionArr),
          resourceId: resumeId,
          shareToken: '',
          shareUrl: data.share_url,
          userId: Number(userId),
          visitCount: 0,
        },
        ...prev,
      ]
    })
    resetState()
  }

  return (
    <>
      <CustomLayout ref={shareRef}>
        <Header label="分享" svg={<Icon component={shareSVG} />} />
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
          activeTab === 0 ? (
            <Button key="create" onClick={generatorShareLink}>
              生成分享链接
            </Button>
          ) : null,
        ]}
        open={isModalOpen}
        onCancel={() => resetState()}
      >
        <DevTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={tabsOptions}
        />
        {activeTab === 0 ? (
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
                <Input
                  className={styles['custom-input']}
                  placeholder="设置访问密码"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
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
              }
            />
            <DevModalFormItem
              title="分享人员邮箱"
              primary={
                <Input
                  className={styles['custom-input']}
                  placeholder="输入邮箱地址(当前仅支持@163.com)，按分号或逗号分隔"
                  value={emailList}
                  onChange={(e) => setEmailList(e.target.value)}
                />
              }
            />
          </div>
        ) : (
          <div className={styles['history-box']}>
            <p>共 {linkList.length} 条分享记录</p>
            <div className={styles['history-list-box']}>
              {linkList.length ? (
                linkList.map((link, index) => (
                  <LinkItem
                    key={link.shareUrl}
                    link={link}
                    index={index}
                    handleDelLinkList={handleDelLinkList}
                    handleCopy={handleCopy}
                  />
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default Share
