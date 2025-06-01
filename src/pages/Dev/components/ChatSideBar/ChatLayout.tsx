import { Avatar, Input } from 'antd'
import styles from './index.module.scss'
import ReplyBox from './ReplyBox'
import React from 'react'

const ChatLayout = ({
  currentText,
  userName,
  isPublishMain,
  chatVal,
  createTime,
  chatContent,
  isInputShow,
  menuBar,
  replyBox,
  children,
  pressEnter,
  setChatVal,
}: {
  currentText: string
  userName: string
  isPublishMain: boolean
  chatVal: string
  createTime?: string
  chatContent?: string
  isInputShow?: boolean
  children?: React.ReactNode
  menuBar?: React.ReactNode
  replyBox?: React.ReactNode
  pressEnter: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    isMain: 0 | 1
  ) => Promise<void>
  setChatVal: (val: string) => void
}) => {
  return (
    <div className={styles['bottom-chat']}>
      <div className={styles['quote-box']}>{currentText}</div>
      <div className={`${styles['body-box']} ${styles['comment-item-box']}`}>
        <div className={styles['left-box']}>
          <Avatar size="small">{userName}</Avatar>
        </div>
        <div className={`${styles['right-box']}`}>
          <div className={styles['right-top-box']}>
            <span className={styles['user-name']}>{userName}</span>
            {createTime ? (
              <span className={styles['date-box']}>{createTime}</span>
            ) : null}
          </div>
          {chatContent ? (
            <div className={styles['chat-content-box']}>
              {replyBox ? replyBox : null}
              {chatContent}
            </div>
          ) : null}
          {menuBar ?? null}
        </div>
      </div>
      {children ?? null}
      {isPublishMain || isInputShow ? (
        <div className={styles['input-box']}>
          <Input.TextArea
            autoFocus={true}
            autoSize
            value={chatVal}
            placeholder="输入您的评论内容"
            onPressEnter={(e) => pressEnter(e, isPublishMain ? 1 : 0)}
            onChange={(e) => setChatVal(e.target.value)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ChatLayout
