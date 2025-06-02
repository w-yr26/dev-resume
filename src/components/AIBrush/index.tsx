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
  // AI润色准备完毕
  const [isPending, setIsPending] = useState(true)
  // 润色中
  const [isPolish, setIsPolish] = useState(false)
  const [respText, setRespText] = useState('')
  const brushRef = useRef<HTMLDivElement>(null)

  const aiChatRes = useMemo(() => {
    if (!infoList) return undefined
    const infoItem = infoList.find((i) => i.id === infoId)
    return infoItem?.aiDescription || infoItem?.aiContent
  }, [infoId, infoList])

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
    const response = await fetch(
      'http://7b395403.r39.cpolar.top/resume/AI/stream',
      {
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
      }
    )
    setIsPending(false)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    if (!response.body) return
    // 获取可读流
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()

      const chunk = decoder.decode(value)
      // 解析事件字段(以换行符为分割)
      const lines = chunk.split('\n').filter((i) => i)

      for (const line of lines) {
        if (line.startsWith('data:') && !line.includes('[DONE]')) {
          const cleanData = line
            .slice(5)
            .trim()
            .replace(/^"|"$/g, '')
            .replace(/\\n/g, '\n')
          await new Promise((resolve) => setTimeout(resolve, 50))
          setRespText((prev) => prev + cleanData)
        }
      }

      if (chunk.includes('[DONE]')) break
    }
    setIsPolish(false)
  }

  // 处理重新获取AI润色内容
  const handleRefresh = async (isRefresh: boolean) => {
    if (isPolish) return
    await handleBrush(isRefresh)
  }

  const handleCopy = async () => {
    if (isPolish) return
    await navigator.clipboard.writeText(respText)
  }

  const aiChatModal = () => (
    <div className={styles['ai-chat-modal']}>
      {isPending ? <Spin tip="思考中" /> : null}
      <div
        className={styles['chat-content']}
        style={{ whiteSpace: 'pre-wrap' }}
        ref={brushRef}
      >
        {respText}
      </div>
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
