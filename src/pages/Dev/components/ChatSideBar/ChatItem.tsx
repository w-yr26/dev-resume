import { Avatar, Input } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import React, { useState } from 'react'
import { chatRespType, subChatItemType } from '@/types/resume'
import { postNewCommentAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import ReplyBox from './ReplyBox'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const ChatItem = ({
  chatItem,
  updateSubChatList,
}: {
  chatItem: chatRespType
  updateSubChatList: (mainChatId: string, subChat: subChatItemType) => void
}) => {
  const userId = useUserStore((state) => state.info.id)
  const userName = useUserStore((state) => state.info.userName)
  const resumeId = useDevStore((state) => state.resumeId)
  const [isInputShow, setIsInputShow] = useState(false)
  const [chatVal, setChatVal] = useState('')
  const [placeholder, setPlaceholder] = useState('输入评论')
  const [currentSubChat, setCurrentSubChat] = useState<subChatItemType | null>(
    null
  )

  const optimisticUpdateSub = (content: string) => {
    updateSubChatList(chatItem.mainCommentId, {
      content,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      replyId: currentSubChat!.userId,
      replyUsername: currentSubChat!.username,
      subCommentId: uuidv4(),
      userId: userId,
      username: userName,
    })
  }

  const optimisticUpdateMain = (content: string) => {
    updateSubChatList(chatItem.mainCommentId, {
      content,
      createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      replyId: chatItem.commentatorId,
      replyUsername: chatItem.username,
      subCommentId: uuidv4(),
      userId,
      username: userName,
    })
  }

  const pressEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    isMain: 0 | 1 = 0
  ) => {
    if (!e.shiftKey) {
      e.preventDefault() // 阻止换行
      const content = e.currentTarget.value
      // 乐观更新
      if (currentSubChat) {
        optimisticUpdateSub(content)
      } else {
        optimisticUpdateMain(content)
      }
      setChatVal('')
      setIsInputShow(false)
      // 回复评论的评论，需要带上 mainCommentId 和 replyId
      await postNewCommentAPI({
        commentMapId: chatItem.commentMapId,
        commentatorId: Number(userId),
        content,
        isMain,
        resumeRandomId: resumeId,
        mainCommentId: Number(chatItem.mainCommentId),
        // 若currentSubChat有值，说明此时的是回复子评论的评论；反之，为回复主评论的评论，此时的“被评论者”的id要做区分
        replyId: !currentSubChat
          ? Number(chatItem.commentatorId)
          : Number(currentSubChat.userId),
      })
      if (currentSubChat) setCurrentSubChat(null)
    }
  }

  return (
    <div className={styles['bottom-chat']}>
      <div className={styles['quote-box']}>{chatItem.nodeText}</div>
      <div className={`${styles['body-box']} ${styles['comment-item-box']}`}>
        <div className={styles['left-box']}>
          <Avatar size="small">{chatItem.username}</Avatar>
        </div>
        <div className={`${styles['right-box']}`}>
          <div className={styles['right-top-box']}>
            <span className={styles['user-name']}>{chatItem.username}</span>
            <span className={styles['date-box']}>{chatItem.createTime}</span>
          </div>
          <div className="chat-content-box">{chatItem.content}</div>
        </div>
        <div className={styles['menu-box']}>
          <Icon
            component={commentSVG}
            onClick={() => {
              setIsInputShow(true)
            }}
          />
        </div>
      </div>
      {chatItem.subCommentVOList
        ? [...chatItem.subCommentVOList].map((subItem) => (
            <React.Fragment key={subItem.subCommentId}>
              <div
                className={`${styles['body-box']} ${styles['comment-item-box']}`}
              >
                <div className={styles['left-box']}>
                  <Avatar size="small">{chatItem.username}</Avatar>
                </div>
                <div className={styles['right-box']}>
                  <div className={styles['right-top-box']}>
                    <span className={styles['user-name']}>
                      {subItem.username}
                    </span>
                    <span className={styles['date-box']}>
                      {subItem.createTime}
                    </span>
                  </div>
                  <div className={styles['chat-content-box']}>
                    <ReplyBox userName={subItem.replyUsername} />{' '}
                    {subItem.content}
                  </div>
                </div>
                <div className={styles['menu-box']}>
                  <Icon
                    component={commentSVG}
                    onClick={() => {
                      setPlaceholder(`reply ${chatItem.username}: `)
                      setIsInputShow(true)
                      setCurrentSubChat(subItem)
                    }}
                  />
                </div>
              </div>
            </React.Fragment>
          ))
        : null}
      {isInputShow ? (
        <div className={styles['input-box']}>
          <Input.TextArea
            autoFocus
            autoSize
            value={chatVal}
            placeholder={placeholder}
            onPressEnter={pressEnter}
            onChange={(e) => setChatVal(e.target.value)}
          />
        </div>
      ) : null}
    </div>
  )
}

export default ChatItem
