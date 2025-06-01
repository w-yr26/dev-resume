import { Avatar, Input } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import deleteSVG from '@/assets/svg/delete.svg?react'
import React, { useState } from 'react'
import { chatRespType, subChatItemType } from '@/types/resume'
import { delCommentAPI, postNewCommentAPI } from '@/apis/resume'
import { useDevStore, useUserStore } from '@/store'
import ReplyBox from './ReplyBox'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import ChatLayout from './ChatLayout'

const ChatItem = ({
  chatItem,
  updateSubChatList,
  delSubChatList,
}: {
  chatItem: chatRespType
  updateSubChatList: (
    mainChmainCommentIdatId: string,
    subChat: subChatItemType
  ) => void
  delSubChatList: (
    mainCommentId: string,
    subCommentId?: string | undefined
  ) => void
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

  // 确认发布
  const pressEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    isMain: 0 | 1 = 0
  ) => {
    if (!e.shiftKey) {
      e.preventDefault() // 阻止换行
      const content = e.currentTarget.value
      // 乐观更新
      updateSubChatList(chatItem.mainCommentId, {
        content,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        replyId: currentSubChat // 通过currentSubChat判断当前回复的是主评论还是子评论
          ? currentSubChat.userId
          : chatItem.commentatorId,
        replyUsername: currentSubChat
          ? currentSubChat.username
          : chatItem.username,
        subCommentId: uuidv4(),
        userId,
        username: userName,
      })
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

  // 删除主评论
  const handleMainDel = async (
    commentMapId: string,
    isMain: 0 | 1,
    mainCommentId: string,
    resumeId: string,
    subCommentId: string | undefined = undefined
  ) => {
    // 乐观删除(删除主评论，其对应的子评论都要被删除；删除子评论，仅需删除它自身)
    delSubChatList(mainCommentId, subCommentId)
    // 接口调用删除
    await delCommentAPI(
      commentMapId,
      isMain,
      mainCommentId,
      resumeId,
      subCommentId
    )
  }

  return (
    <>
      <ChatLayout
        currentText={chatItem.nodeText}
        chatVal={chatVal}
        isPublishMain={false}
        userName={chatItem.username}
        placeholder={placeholder}
        createTime={chatItem.createTime}
        chatContent={chatItem.content}
        isInputShow={isInputShow}
        pressEnter={pressEnter}
        setChatVal={setChatVal}
        menuBar={
          <div className={styles['menu-box']}>
            <Icon
              component={commentSVG}
              onClick={() => {
                setIsInputShow(true)
              }}
            />
            <Icon
              component={deleteSVG}
              onClick={() =>
                handleMainDel(
                  chatItem.commentMapId,
                  1,
                  chatItem.mainCommentId,
                  resumeId
                )
              }
            />
          </div>
        }
      >
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
                    <Icon
                      component={deleteSVG}
                      onClick={() =>
                        handleMainDel(
                          chatItem.commentMapId,
                          0,
                          chatItem.mainCommentId,
                          resumeId,
                          subItem.subCommentId
                        )
                      }
                    />
                  </div>
                </div>
              </React.Fragment>
            ))
          : null}
      </ChatLayout>
    </>
  )
}

export default ChatItem
