import Icon from '@ant-design/icons'
import WorkSVG from '@/assets/svg/dev/work.svg?react'
import brushSVG from '@/assets/svg/dev/brush.svg?react'
import copySVG from '@/assets/svg/copy.svg?react'
import refreshSVG from '@/assets/svg/dev/refresh.svg?react'
import Header from '@/components/Header/index'
import CustomLayout from '@/components/CustomLayout/index'
import AddBtn from './components/AddBtn'
import List from './components/List'
import CtxMenu from '@/pages/Dev/components/Materials/components/CtxMenu'
import {
  Form,
  Input,
  Modal,
  DatePicker,
  Button,
  Popover,
  Spin,
  Tooltip,
} from 'antd'
const { RangePicker } = DatePicker
import { useEffect, useMemo, useRef, useState } from 'react'
import { useDevStore, useGlobalStore, useUserStore } from '@/store'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useModalForm } from '@/hooks/useModalForm'
import type { WorkExpItemType } from '@/types/dev'
import styles from './index.module.scss'
import MdEditor from '@/components/MdEditor'

const WorkExperience = () => {
  const userId = useUserStore((state) => state.info.id)
  const token = useUserStore((state) => state.info.token)
  const resumeId = useDevStore((state) => state.resumeId)
  const storeWorkList = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.info
  )
  const label = useDevStore(
    (state) => state.devSchema.dataSource.WORK_EXP.label
  )
  const setPosition = useGlobalStore((state) => state.setPosition)

  const workRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (workRef.current) {
      const { y } = workRef.current.getBoundingClientRect()
      setPosition('WORK_EXP', y)
    }
  }, [])

  const {
    opened,
    formRef,
    infoId,
    handleDelItem,
    handleEdit,
    handleOk,
    handleVisible,
    resetState,
    handleOpen,
  } = useModalForm<WorkExpItemType>(storeWorkList, 'WORK_EXP')
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('EDU_BG')
  // AI润色准备完毕
  const [isPending, setIsPending] = useState(true)
  // 润色中
  const [isPolish, setIsPolish] = useState(false)
  const [respText, setRespText] = useState('')
  const brushRef = useRef<HTMLDivElement>(null)

  const aiChatRes = useMemo(
    () => storeWorkList.find((i) => i.id === infoId)?.aiDescription,
    [infoId, storeWorkList]
  )

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
  const handleBrush = async (type: string, isRefresh: boolean = false) => {
    if (aiChatRes && !isRefresh) {
      setRespText(aiChatRes)
      setIsPending(false)
      setIsPolish(false)
      return
    }
    if (isRefresh) setRespText('')
    const message = formRef.getFieldValue(type)
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
          type: 'WORK_EXP',
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
  const handleRefresh = async (type: string, isRefresh: boolean) => {
    if (isPolish) return
    await handleBrush(type, isRefresh)
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
          <Icon
            component={refreshSVG}
            onClick={() => handleRefresh('output', true)}
          />
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
    <>
      <CustomLayout ref={workRef}>
        <Header
          label={label || '工作/实习经历'}
          svg={<Icon component={WorkSVG} />}
          isEdit={isEdit}
          handleChange={handleChange}
          handleBlur={() => setIsEdit(false)}
        >
          <CtxMenu currentKey="WORK_EXP" renameLabel={() => setIsEdit(true)} />
        </Header>
        {storeWorkList.length === 0 ? (
          <AddBtn handleAdd={handleOpen} />
        ) : (
          <List
            type="WORK_EXP"
            data={storeWorkList}
            handleAdd={handleOpen}
            handleVisible={handleVisible}
            handleDel={handleDelItem}
            handleEdit={handleEdit}
            fieldMap={{
              id: 'id',
              title: 'company',
              subTitle: 'position',
              visible: 'visible',
            }}
          />
        )}
      </CustomLayout>
      <Modal
        title="创建新条目"
        okText="创建"
        cancelText="取消"
        width="50%"
        mask={true}
        footer={[
          <Button key="submit" onClick={handleOk}>
            {infoId ? '更新' : '创建'}
          </Button>,
        ]}
        centered={true}
        open={opened}
        onCancel={resetState}
      >
        <Form layout="vertical" requiredMark={false} form={formRef}>
          <div className={styles['row-form-item']}>
            <Form.Item
              label="公司"
              name="company"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="职位"
              name="position"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles['row-form-item']}>
            <Form.Item
              label="时间"
              name="date"
              layout="vertical"
              rules={[{ required: true }]}
              style={{
                flex: 1,
              }}
            >
              <RangePicker />
            </Form.Item>
            <Form.Item
              label="技术栈"
              name="techStack"
              layout="vertical"
              style={{
                flex: 1,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item label="项目概述" name="description" layout="vertical">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label={
              <div className={styles['form-item-header']}>
                <span className={styles['item-label']}>实习产出</span>
                <Popover
                  content={aiChatModal}
                  title={aiChatTitle}
                  trigger="click"
                >
                  <Tooltip title="AI 润色">
                    <Icon
                      component={brushSVG}
                      onClick={() => handleBrush('output')}
                    />
                  </Tooltip>
                </Popover>
              </div>
            }
            name="output"
            valuePropName="value"
            trigger="onChange"
            validateTrigger="onChange"
            rules={[{ required: true, message: '请输入产出内容' }]}
            layout="vertical"
          >
            <MdEditor />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default WorkExperience
