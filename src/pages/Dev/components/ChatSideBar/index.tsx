import { Avatar, Input } from 'antd'
import styles from './index.module.scss'
import type { sideBarType } from '@/types/materials'
import React, { useEffect, useState } from 'react'
import { getAllCommentAPI, postNewCommentAPI } from '@/apis/resume'
import { chatRespType, subChatItemType } from '@/types/resume'
import { useUserStore } from '@/store'
import ChatItem from './ChatItem'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import Icon from '@ant-design/icons'
import ArrowLeftSVG from '@/assets/svg/dev/arrowLeft.svg?react'

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

  // 更新评论列表
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

  // 删除评论列表
  const delSubChatList = (
    mainCommentId: string,
    subCommentId: string | undefined = undefined
  ) => {
    if (!subCommentId) {
      // 没有副评论id，说明此时删除的是主评论
      const newChatList = chatList.filter(
        (i) => i.mainCommentId !== mainCommentId
      )
      setChatList(newChatList)
    } else {
      // 删除某一条子评论，无需考虑连带关系，只需删除对应的评论数据即可
      const newChatList = chatList.map((i) => {
        if (i.mainCommentId !== mainCommentId) return i
        else {
          return {
            ...i,
            subCommentVOList:
              i.subCommentVOList?.filter(
                (sub) => sub.subCommentId !== subCommentId
              ) || [],
          }
        }
      })
      setChatList(newChatList)
    }
  }

  // 关闭评论列表，重置状态
  const onCloseDrawer = () => {
    setSidebarOpened(false)
    setIsInputShow(true)
  }

  return (
    <div
      className={`${styles['chat-side-container']} ${
        sidebarOpened ? styles['expand-box'] : styles['shrink-box']
      }`}
    >
      <div className={styles['chat-list-title']}>
        <div>评论({chatList.length})</div>
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={onCloseDrawer}
        >
          <Icon component={ArrowLeftSVG} />
        </div>
      </div>
      <div className={styles['chat-list-body']}>
        {chatList.length
          ? chatList.map((chatItem) => (
              <ChatItem
                chatItem={chatItem}
                key={chatItem.mainCommentId}
                updateSubChatList={updateSubChatList}
                delSubChatList={delSubChatList}
              />
            ))
          : null}

        {isInputShow && currentText ? (
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
      </div>
    </div>
  )
}

export default ChatSideBar
