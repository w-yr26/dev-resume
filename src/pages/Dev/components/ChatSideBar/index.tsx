import { Avatar, Drawer, Input } from 'antd'
import styles from './index.module.scss'
import type { commentItem, sideBarType } from '@/types/materials'
import React, { useState } from 'react'

const ChatSideBar = ({
  sidebarOpened,
  currentText,
  selectedNodeKey,
  setSidebarOpened,
  setCurrentText,
}: sideBarType) => {
  const [chatList, setChatList] = useState<commentItem[]>([])
  const [isInputShow, setIsInputShow] = useState(false)

  // 新增评论
  const pressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault() // 阻止换行
      console.log('提交评论:', e.currentTarget.value)
      // 调用接口提交评论
      // 更新评论列表
      setChatList([
        ...chatList,
        {
          id: new Date().getTime(),
          nodeKey: selectedNodeKey,
          quote_content: currentText,
          chat_list: [
            {
              avatar: 'U',
              chat_content: e.currentTarget.value,
              date: '2025-05-02',
              id: new Date().getTime(),
              userName: 'zs',
            },
          ],
        },
      ])
      setCurrentText('')
      // 这里触发你的评论提交逻辑
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
              <React.Fragment key={chatItem.id}>
                <div className={styles['bottom-chat']}>
                  <div className={styles['quote-box']}>
                    {chatItem.quote_content}
                  </div>
                  {chatItem.chat_list
                    ? chatItem.chat_list.map((chatDetainItem) => (
                        <React.Fragment key={chatDetainItem.id}>
                          <div className={styles['body-box']}>
                            <div className={styles['left-box']}>
                              <Avatar size="small">{chatDetainItem.id}</Avatar>
                            </div>
                            <div className={styles['right-box']}>
                              <div className={styles['right-top-box']}>
                                <span className={styles['user-name']}>
                                  {chatDetainItem.userName}
                                </span>
                                <span className={styles['date-box']}>
                                  {chatDetainItem.date}
                                </span>
                              </div>
                              <div className="chat-content-box">
                                {chatDetainItem.chat_content}
                              </div>
                            </div>
                          </div>
                          {isInputShow ? (
                            <div className={styles['input-box']}>
                              <Input.TextArea
                                placeholder="输入评论"
                                autoFocus
                                autoSize
                                onPressEnter={handleReplay}
                              />
                            </div>
                          ) : (
                            <div
                              className={styles['reply-box']}
                              onClick={() => setIsInputShow(true)}
                            >
                              回复...
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    : null}
                </div>
              </React.Fragment>
            ))
          : null}
        {currentText ? (
          <div className={styles['bottom-chat']}>
            <div className={styles['quote-box']}>{currentText}</div>
            <div className={styles['body-box']}>
              <div className={styles['left-box']}>
                <Avatar size="small">User</Avatar>
              </div>
              <div className={styles['right-box']}>吴昱锐</div>
            </div>
            <div className={styles['input-box']}>
              <Input.TextArea
                placeholder="输入评论"
                autoFocus
                autoSize
                onPressEnter={pressEnter}
              />
            </div>
          </div>
        ) : null}
      </Drawer>
    </div>
  )
}

export default ChatSideBar
