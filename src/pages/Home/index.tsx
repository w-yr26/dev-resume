import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/store'
import styles from './index.module.scss'
// 引入icon图标
import Icon from '@ant-design/icons'
import ResumeSvg from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import DownloadSVG from '@/assets/svg/download.svg?react'
import ListSVG from '@/assets/svg/list.svg?react'
import GridSVG from '@/assets/svg/grid.svg?react'
import AddSVG from '@/assets/svg/add.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'

import {
  Avatar,
  Button,
  ConfigProvider,
  Input,
  message,
  Modal,
  Tooltip,
} from 'antd'
import { useEffect, useState } from 'react'
import { getResumePageAPI, postResumeCreateAPI } from '@/apis/resume'
import type { resumeItem } from '@/types/resume'
import CustomBtn from '@/components/CustomBtn'

const Home = () => {
  const { user_name } = useUserStore((state) => state.info)
  const userId = useUserStore((state) => state.info.id)

  const [page] = useState(1)
  const [resumeList, setResumeList] = useState<resumeItem[]>([])
  const PAGE_SIZE = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const getResumeList = async () => {
      const { data } = await getResumePageAPI(page, PAGE_SIZE, userId)
      setResumeList([...resumeList, ...data.records])
    }

    // getResumeList()
  }, [page])

  const handleCreateResume = async () => {
    if (!resumeTitle) return message.warning('请输入简历名称')
    // TODO：这里调用接口
    const { data } = await postResumeCreateAPI({
      randomId: uuidv4(),
      userId: userId,
      title: resumeTitle,
      slug,
      template_id: '1',
    })
    console.log('create success', data)

    setIsModalOpen(false)
  }

  const produceRandomTitle = () => {
    const uuid = uuidv4()
    setResumeTitle(uuid)
    setSlug(uuid)
  }

  return (
    <>
      <div className={styles['layout-container']}>
        {/* 左边栏 */}
        <div className={styles['left-container']}>
          {/* logo区域 */}
          <div className={styles['logo-area']} />

          {/* 左边栏目导航区域 */}
          <div className={styles['left-nav']}>
            <ul>
              <li className={`${styles['left-nav-item']} ${styles['active']}`}>
                <Icon
                  component={ResumeSvg}
                  style={{
                    rotate: '20deg',
                  }}
                />
                &nbsp;&nbsp; 简历
              </li>
              <li className={styles['left-nav-item']}>
                <Icon
                  component={SettingSVG}
                  style={{
                    rotate: '20deg',
                  }}
                />
                &nbsp;&nbsp; 设置
              </li>
            </ul>
          </div>

          {/* 左边账号栏目 */}
          <div className={styles['left-bottom']}>
            <div className={styles['account-box']}>
              <Avatar size={24}>{user_name}</Avatar>
              <div className={styles['account']}>{user_name}</div>
            </div>
            <p className={styles['version-box']}>DevResume 1.0.0</p>
          </div>
        </div>

        {/* 右边简历栏目部分 */}
        <div className={styles['right-container']}>
          {/* 头部 */}
          <div className={styles['top']}>
            <h1>简历</h1>
            <div>
              <Button
                icon={<Icon component={GridSVG} />}
                style={{
                  marginRight: '8px',
                }}
              >
                网格
              </Button>
              <Button icon={<Icon component={ListSVG} />}>列表</Button>
            </div>
          </div>

          {/* 底部 */}
          <div className={styles['bottom']}>
            {/* 新建部分 */}
            <div
              className={styles['resume-item']}
              onClick={() => setIsModalOpen(true)}
            >
              <div className={styles['icon-box']}>
                <Icon component={AddSVG} />
              </div>

              <div className={styles['resume-bottom']}>
                <p className={styles['resume-name']}>创建新简历</p>
                <p className={styles['update-time']}>从头开始构建</p>
              </div>
            </div>

            {/* 导入部分 */}
            <div className={styles['resume-item']}>
              <div className={styles['icon-box']}>
                <Icon component={DownloadSVG} className={styles['svg']} />
              </div>

              <div className={styles['resume-bottom']}>
                <p className={styles['resume-name']}>导入现有简历</p>
                <p className={styles['update-time']}>LinkedIn、JSON简历等</p>
              </div>
            </div>

            {/* 简历列表 */}
            {resumeList.length
              ? resumeList.map((item, index) => (
                  <div
                    className={`${styles['resume-item']} ${styles['animation-item']}`}
                    style={{
                      animationDelay: `0.${index + 1}s`,
                    }}
                    key={item.id}
                  >
                    <div className={styles['resume-bottom']}>
                      <p className={styles['resume-name']}>{item.title}</p>
                      <p className={styles['update-time']}>
                        最后更新于&nbsp;
                        <span
                          style={{
                            color: '#333',
                          }}
                        >
                          {item.updateTime}
                        </span>
                        &nbsp;前
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
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
          title={
            <>
              <Icon component={AddSVG} />
              <span style={{ marginLeft: '8px' }}>创建新条目</span>
            </>
          }
          footer={[
            <CustomBtn
              key="create"
              label="创建"
              style={{
                width: '80px',
              }}
              onClick={handleCreateResume}
            />,
          ]}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          <div className={styles['create-form-container']}>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>标题</p>
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
                    className={styles['form-input']}
                    value={resumeTitle}
                    onChange={(e) => setResumeTitle(e.target.value)}
                  />
                </ConfigProvider>
                <div
                  className={styles['random-box']}
                  onClick={produceRandomTitle}
                >
                  <Tooltip title="点击生成随机标题">
                    <Icon component={RandomSVG} />
                  </Tooltip>
                </div>
              </div>
              <div className={styles['sub-label']}>
                提示: 您可以根据职位来命名简历
              </div>
            </div>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>备注</p>
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
                    className={styles['form-input']}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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

export default Home
