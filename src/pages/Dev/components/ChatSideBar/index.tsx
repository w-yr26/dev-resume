import { Avatar, Drawer, Input } from 'antd'
import styles from './index.module.scss'
import type { sideBarType } from '@/types/materials'
import React, { useEffect, useState } from 'react'
import { getAllCommentAPI, postNewCommentAPI } from '@/apis/resume'
import { chatRespType, subChatItemType } from '@/types/resume'
import { useUserStore } from '@/store'
import ChatItem from './ChatItem'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

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
      // 乐观更新
      setChatList([
        ...chatList,
        {
          commentatorId: userId,
          commentMapId: selectedNodeKey,
          content,
          createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          mainCommentId: uuidv4(),
          resumeRandomId: resumeId,
          subCommentVOList: [],
          nodeText: currentText,
          username: userName,
        },
      ])
      setIsInputShow(false)
      setChatVal('')
      setCurrentText('')
      // 调用接口提交评论
      await postNewCommentAPI({
        commentMapId: selectedNodeKey,
        commentatorId: Number(userId),
        content,
        isMain,
        nodeText: currentText,
        resumeRandomId: resumeId,
      })
    }
  }

  const updateSubChatList = (mainChatId: string, subChat: subChatItemType) => {
    const newChatList = chatList.map((i) => {
      if (i.mainCommentId !== mainChatId) return i
      else {
        return {
          ...i,
          subCommentVOList: i.subCommentVOList
            ? [...i.subCommentVOList, subChat]
            : [subChat],
        }
      }
    })

    setChatList(newChatList)
  }

  // 关闭抽屉，重置状态
  const onCloseDrawer = () => {
    setSidebarOpened(false)
    setIsInputShow(true)
  }

  return (
    <div className={styles['chat-side-container']}>
      <Drawer
        title="评论列表"
        placement="left"
        open={sidebarOpened}
        onClose={onCloseDrawer}
      >
        {chatList.length
          ? chatList.map((chatItem) => (
              <ChatItem
                chatItem={chatItem}
                key={chatItem.mainCommentId}
                updateSubChatList={updateSubChatList}
              />
            ))
          : null}

        {isInputShow ? (
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
                </div>
              </div>
            </div>
            <div className={styles['input-box']}>
              <Input.TextArea
                autoFocus={true}
                autoSize
                value={chatVal}
                placeholder="输入您的评论内容"
                onPressEnter={pressEnter}
                onChange={(e) => setChatVal(e.target.value)}
              />
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  )
}

export default ChatSideBar
