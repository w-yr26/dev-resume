import { Avatar, Drawer, Input } from 'antd'
import styles from './index.module.scss'
import type { sideBarType } from '@/types/materials'
import React, { useEffect, useState } from 'react'
import { getAllCommentAPI, postNewCommentAPI } from '@/apis/resume'
import { chatRespType } from '@/types/resume'
import { useUserStore } from '@/store'
import Icon from '@ant-design/icons'
import commentSVG from '@/assets/svg/dev/comment.svg?react'
import ChatItem from './ChatItem'

const ChatSideBar = ({
  resumeId,
  sidebarOpened,
  currentText,
  selectedNodeKey,
  setSidebarOpened,
  setCurrentText,
}: sideBarType) => {
  const userName = useUserStore((state) => state.info.userName)
  const userId = useUserStore((state) => state.info.id)
  const [chatList, setChatList] = useState<chatRespType[]>([])
  const [isInputShow, setIsInputShow] = useState(true)
  const [chatVal, setChatVal] = useState('')

  useEffect(() => {
    const getChatList = async () => {
      const { data } = await getAllCommentAPI(resumeId)
      setChatList(data)
    }

    getChatList()
  }, [resumeId])

  // 新增评论
  const pressEnter = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    isMain: 0 | 1 = 1
  ) => {
    if (!e.shiftKey) {
      e.preventDefault() // 阻止换行
      const content = e.currentTarget.value
      // 调用接口提交评论
      await postNewCommentAPI({
        commentMapId: selectedNodeKey,
        commentatorId: Number(userId),
        content,
        isMain,
        nodeText: currentText,
        resumeRandomId: resumeId,
      })

      // TODO:更新评论列表
      setIsInputShow(false)
      setChatVal('')
      setCurrentText('')
    }
  }

  // 评论回复
  const handleReplay = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      setIsInputShow(false)
    }
  }

  return (
    <div className={styles['chat-side-container']}>
      <Drawer
        title="评论列表"
        placement="left"
        open={sidebarOpened}
        onClose={() => setSidebarOpened(false)}
      >
        {chatList.length
          ? chatList.map((chatItem) => (
              <ChatItem chatItem={chatItem} key={chatItem.mainCommentId} />
            ))
          : null}

        <div className={styles['bottom-chat']}>
          <div className={styles['quote-box']}>{currentText}</div>
          <div
            className={`${styles['body-box']} ${styles['comment-item-box']}`}
          >
            <div className={styles['left-box']}>
              <Avatar size="small">{userName}</Avatar>
            </div>
            <div className={`${styles['right-box']}`}>
              <div className={styles['right-top-box']}>
                <span className={styles['user-name']}>{userName}</span>
                {/* <span className={styles['date-box']}>
                  {chatItem.createTime}
                </span> */}
              </div>
              {/* <div className="chat-content-box">{chatItem.content}</div> */}
            </div>
          </div>
          {isInputShow ? (
            <div className={styles['input-box']}>
              <Input.TextArea
                autoFocus
                autoSize
                value={chatVal}
                placeholder="输入您的评论内容"
                onPressEnter={pressEnter}
                onChange={(e) => setChatVal(e.target.value)}
              />
            </div>
          ) : null}
        </div>
      </Drawer>
    </div>
  )
}

export default ChatSideBar
