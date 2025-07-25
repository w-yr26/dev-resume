import Icon from '@ant-design/icons'
import brushSVG from '@/assets/svg/dev/brush.svg?react'
import copySVG from '@/assets/svg/copy.svg?react'
import refreshSVG from '@/assets/svg/dev/refresh.svg?react'
import { Popover, Spin, Tooltip } from 'antd'
import { useDevStore, useUserStore } from '@/store'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.scss'
import { FormInstance } from 'antd/lib'
import { allKeyType } from '@/types/dev'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { BASE_URL } from '@/utils/request'

type AIBrushPropType<
  T extends { id: string; aiDescription?: string; aiContent?: string }
> = {
  infoId: string
  fieldType: string
  moduleType: allKeyType
  formRef: FormInstance<any>
  infoList: T[]
}

const AIBrush = <
  T extends { id: string; aiDescription?: string; aiContent?: string }
>({
  infoId,
  fieldType,
  moduleType,
  formRef,
  infoList,
}: AIBrushPropType<T>) => {
  const userId = useUserStore((state) => state.info.id)
  const token = useUserStore((state) => state.info.token)
  const resumeId = useDevStore((state) => state.resumeId)

  const aiChatRes = useMemo(() => {
    if (!infoList) return undefined
    const infoItem = infoList.find((i) => i.id === infoId)
    return infoItem?.aiDescription || infoItem?.aiContent
  }, [infoId, infoList])

  // AI润色准备完毕
  const [isPending, setIsPending] = useState(true)
  // 润色中
  const [isPolish, setIsPolish] = useState(false)
  const [respText, setRespText] = useState(aiChatRes)
  const brushRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (brushRef.current) {
      brushRef.current.scrollTop = brushRef.current.scrollHeight
    }
  }, [respText])

  /**
   * 处理流式输出
   * @param type 当前选择润色的表单项名称
   * @param isRefresh 是否重新获取润色内容
   */
  const handleBrush = async (isRefresh: boolean = false) => {
    if (aiChatRes && !isRefresh) {
      setRespText(aiChatRes)
      setIsPending(false)
      setIsPolish(false)
      return
    }
    if (isRefresh) setRespText('')
    const message = formRef.getFieldValue(fieldType)
    setIsPolish(true)
    setIsPending(true)
    await fetchEventSource(`${BASE_URL}/resume/AI/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        message,
        resumeId,
        userId: Number(userId),
        type: moduleType,
      }),
      async onopen() {
        setIsPending(false)
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
        setRespText((prev) => prev + text)
      },
      onerror(err) {
        console.log('fetch err==', err)
      },
      onclose() {
        setIsPolish(false)
      },
    })
    setIsPolish(false)
  }

  // 处理重新获取AI润色内容
  const handleRefresh = async (isRefresh: boolean) => {
    if (isPolish) return
    await handleBrush(isRefresh)
  }

  const handleCopy = async () => {
    if (isPolish) return
    await navigator.clipboard.writeText(respText || '')
  }

  const aiChatModal = () => (
    <div className={styles['ai-chat-modal']}>
      <Spin spinning={isPending}>
        <div
          className={styles['chat-content']}
          style={{ whiteSpace: 'pre-wrap' }}
          ref={brushRef}
        >
          {respText}
        </div>
      </Spin>
    </div>
  )

  const aiChatTitle = () => (
    <div className={styles['ai-chat-title']}>
      <span>润色结果</span>
      <span>
        {aiChatRes ? (
          <Icon component={refreshSVG} onClick={() => handleRefresh(true)} />
        ) : null}
        <Icon
          component={copySVG}
          style={{
            marginLeft: '8px',
          }}
          onClick={handleCopy}
        />
      </span>
    </div>
  )

  return (
    <Popover content={aiChatModal} title={aiChatTitle} trigger="click">
      <Tooltip title="AI 润色">
        <Icon component={brushSVG} onClick={() => handleBrush()} />
      </Tooltip>
    </Popover>
  )
}

export default AIBrush
