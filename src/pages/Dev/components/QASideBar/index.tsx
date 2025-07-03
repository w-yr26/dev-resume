import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useState } from 'react'
import { Empty, Typography } from 'antd'
import Icon from '@ant-design/icons'
import brainSVG from '@/assets/svg/dev/brain.svg?react'
import refreshSVG from '@/assets/svg/dev/refresh.svg?react'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import { BASE_URL } from '@/utils/request'
import { useDevStore, useUserStore } from '@/store'
import styles from './index.module.scss'

const QASideBar = () => {
  const token = useUserStore((state) => state.info.token)
  const userId = useUserStore((state) => state.info.id)
  const resumeId = useDevStore((state) => state.resumeId)

  const [activeTab, setActiveTab] = useState(0)
  const [buffer, setBuffer] = useState('') // 用于拼接字符
  const [isFinish, setIsFinish] = useState(false)
  const generatorQuestions = async () => {
    await fetchEventSource(
      `${BASE_URL}/resume/AI/generate?resumeId=${resumeId}&userId=${userId}`,
      {
        headers: {
          Authorization: token,
        },
        async onopen() {
          setIsFinish(false)
        },
        onmessage(ev) {
          const rawData = ev.data
          let parsedData
          try {
            parsedData = JSON.parse(rawData) // 去掉外层的引号，得到 "\n"
          } catch (_) {
            parsedData = rawData.replace(/"/g, '')
          }
          const text = parsedData.replace(/\\n/g, '\n') // 将字符串 "\n" 转为换行符
          setBuffer((prev) => prev + text)
        },
        onclose() {
          setIsFinish(true)
        },
      }
    )
  }

  return (
    <div className={styles['qa-side-container']}>
      <div className={styles['qa-list-title']}>
        <div>面试分析器</div>
      </div>

      <div className={styles['tooltip-card']}>
        <div className={styles['icon-box']}>
          <Icon component={brainSVG} />
        </div>
        <div className={styles['text-container']}>
          <p className={styles['title']}>AI分析说明</p>
          <p className={styles['description']}>
            AI会深度分析你的技术实现细节，识别关键技术点的复杂度，生成针对性的深度面试问题。每个问题都包含考察重点和可能的追问，帮你全面准备。
          </p>
        </div>
      </div>

      <div className={styles['ai-chat-container']}>
        <div className={styles['tabs-header']}>
          <div
            className={`${styles['tab-item']} ${
              activeTab === 0 ? styles['active-item'] : ''
            }`}
            onClick={() => setActiveTab(0)}
          >
            面试题库
          </div>
          <div
            className={`${styles['tab-item']} ${
              activeTab === 1 ? styles['active-item'] : ''
            }`}
            onClick={() => setActiveTab(1)}
          >
            历史记录
          </div>
        </div>

        {activeTab === 0 ? (
          <>
            {!buffer ? (
              <div className={styles['empty-box']} style={{ margin: '16px 0' }}>
                <Empty
                  description={
                    <Typography.Text>
                      <a onClick={generatorQuestions}>点击生成面试题</a>
                    </Typography.Text>
                  }
                />
              </div>
            ) : (
              <div className={styles['ai-chat-box']}>
                <div className={styles['chat-header']}>
                  <span className={styles['header-left']}>
                    <Icon
                      component={commentSVG}
                      style={{
                        marginRight: '8px',
                      }}
                    />
                    {isFinish ? '面试题' : '正在生成...'}
                  </span>

                  <div className={styles['header-right']}>
                    <Icon component={refreshSVG} />
                  </div>
                </div>

                <div className={styles['chat-content']}>{buffer}</div>
              </div>
            )}
          </>
        ) : null}

        {activeTab === 1 ? (
          <div className={styles['empty-box']} style={{ margin: '16px 0' }}>
            <Empty
              description={
                <Typography.Text>
                  暂无历史记录，
                  <a onClick={() => setActiveTab(0)}>去生成面试题</a>
                </Typography.Text>
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default QASideBar
