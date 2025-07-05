import { fetchEventSource } from '@microsoft/fetch-event-source'
import { useEffect, useRef, useState } from 'react'
import { Empty, Spin, Tag, Typography } from 'antd'
import Icon from '@ant-design/icons'
import brainSVG from '@/assets/svg/dev/brain.svg?react'
import refreshSVG from '@/assets/svg/dev/refresh.svg?react'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import eyeSVG from '@/assets/svg/dev/eye.svg?react'
import eyeoffSVG from '@/assets/svg/dev/eyeoff.svg?react'
import calendarSVG from '@/assets/svg/dev/calendar.svg?react'
import { BASE_URL } from '@/utils/request'
import { useDevStore, useUserStore } from '@/store'
import styles from './index.module.scss'
import DevTabs from '@/components/DevTabs'
import { getInterviewHistoryAPI } from '@/apis/resume'
import type { questionRespItem } from '@/types/resume'
import DevScroll from '@/components/DevScroll'

const tabsOptions = [
  {
    key: 'chat',
    label: '面试题库',
  },
  {
    key: 'history',
    label: '历史记录',
  },
]

const QASideBar = () => {
  const token = useUserStore((state) => state.info.token)
  const userId = useUserStore((state) => state.info.id)
  const resumeId = useDevStore((state) => state.resumeId)

  const [activeTab, setActiveTab] = useState(0)
  const [buffer, setBuffer] = useState('')
  // 对话是否完成
  const [isFinish, setIsFinish] = useState(false)
  // 对话是否处于建立连接状态
  const [isPending, setIsPending] = useState(false)
  const [historyList, setHistoryList] = useState<
    (questionRespItem & {
      isShow: boolean
    })[]
  >([])
  const brushRef = useRef<HTMLDivElement>(null)
  const isFetch = useRef(false)

  const generatorQuestions = async () => {
    setIsPending(true)
    await fetchEventSource(
      `${BASE_URL}/resume/AI/generate?resumeId=${resumeId}&userId=${userId}`,
      {
        headers: {
          Authorization: token,
        },
        async onopen() {
          setIsPending(false)
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
          setBuffer((prev) => {
            return prev + text
          })
        },
        onclose() {
          setIsFinish(true)
        },
      }
    )
  }

  useEffect(() => {
    if (brushRef.current) {
      brushRef.current.scrollTop = brushRef.current.scrollHeight
    }
  }, [brushRef.current?.scrollHeight])

  // 重新生成面试题
  const resetChat = () => {
    setBuffer('')
    generatorQuestions()
  }

  useEffect(() => {
    const getHistoryList = async () => {
      const { data } = await getInterviewHistoryAPI(resumeId, userId)
      setHistoryList(
        data.map((i) => ({
          ...i,
          isShow: false,
        }))
      )
    }

    if (isFetch.current) return

    getHistoryList()
    isFetch.current = true
  }, [])

  const setItemPreview = (id: string) => {
    setHistoryList(
      historyList.map((i) => {
        if (i.batchId !== id) return i
        else
          return {
            ...i,
            isShow: !i.isShow,
          }
      })
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
        <DevTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={tabsOptions}
        />
        {activeTab === 0 ? (
          <Spin spinning={isPending}>
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

                  <div className={styles['header-right']} onClick={resetChat}>
                    <Icon component={refreshSVG} />
                  </div>
                </div>

                <div className={styles['chat-content']} ref={brushRef}>
                  {buffer}
                </div>
              </div>
            )}
          </Spin>
        ) : null}

        {activeTab === 1 ? (
          !historyList.length ? (
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
          ) : (
            <DevScroll>
              <div className={styles['history-list']}>
                {historyList.map((batchItem) => (
                  <div
                    className={styles['batch-item-box']}
                    key={batchItem.batchId}
                  >
                    {!batchItem.isShow ? (
                      <div className={styles['chat-item']}>
                        <div className={styles['chat-header']}>
                          <div className="header-left">
                            <Icon component={calendarSVG} />
                            <span
                              style={{
                                marginLeft: '4px',
                              }}
                            >
                              {batchItem.questions[0].createTime.split(' ')[0]}
                            </span>
                          </div>
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => setItemPreview(batchItem.batchId)}
                          >
                            <Icon component={eyeSVG} />
                          </span>
                        </div>
                        <div className={styles['chat-body']}>
                          {batchItem.questions.length}道面试题
                        </div>
                        <Tag>{batchItem.batchId}</Tag>
                      </div>
                    ) : (
                      <div className={styles['preview-item']}>
                        <div className={styles['preview-header']}>
                          <Tag>{batchItem.batchId}</Tag>
                          <span
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => setItemPreview(batchItem.batchId)}
                          >
                            <Icon component={eyeoffSVG} />
                          </span>
                        </div>
                        <div className={styles['question-list']}>
                          {batchItem.questions.map((q, index) => (
                            <div className={styles['question-item']} key={q.id}>
                              <div className={styles['question-content-box']}>
                                {index + 1}. {q.question}
                              </div>
                              <div className={styles['focus-points-list']}>
                                <strong>考察重点</strong>
                                {q.focusPoint}
                              </div>
                              <div className={styles['follow-up-list']}>
                                <strong>追问方向</strong>
                                <ul>
                                  {q.followUpList.map((follow, idx) => (
                                    <li key={idx}>{follow}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DevScroll>
          )
        ) : null}
      </div>
    </div>
  )
}

export default QASideBar
