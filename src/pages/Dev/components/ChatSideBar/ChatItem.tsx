import { Avatar, Input } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import React, { useState } from 'react'
import { chatRespType } from '@/types/resume'
import { postNewCommentAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import ReplyBox from './ReplyBox'

const ChatItem = ({ chatItem }: { chatItem: chatRespType }) => {
  const userId = useUserStore((state) => state.info.id)
  const resumeId = useDevStore((state) => state.resumeId)
  const [isInputShow, setIsInputShow] = useState(false)
  const [chatVal, setChatVal] = useState('')
  const [placeholder, setPlaceholder] = useState('输入评论')
  const pressEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    isMain: 0 | 1 = 0
  ) => {
    if (!e.shiftKey) {
      e.preventDefault() // 阻止换行
      const content = e.currentTarget.value
      // 回复评论的评论，需要带上 mainCommentId 和 replyId
      const { data } = await postNewCommentAPI({
        commentMapId: chatItem.commentMapId,
        commentatorId: Number(userId),
        content,
        isMain,
        resumeRandomId: resumeId,
        mainCommentId: Number(chatItem.mainCommentId),
        replyId: Number(chatItem.commentatorId),
      })
      console.log('data', data)
      setChatVal('')
      // 更新评论列表
    }
  }
  // 回复评论 -> 回复主/副评论
  const handleReplay = () => {
    // await postNewCommentAPI()
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
