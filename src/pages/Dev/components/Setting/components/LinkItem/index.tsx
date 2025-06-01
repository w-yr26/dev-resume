import { ConfigProvider, Input, Popconfirm, Switch, Tag } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import LinkSVG from '@/assets/svg/dev/link.svg?react'
import CopySVG from '@/assets/svg/copy.svg?react'
import DeleteSVG from '@/assets/svg/delete.svg?react'
import { linkItem } from '@/types/resume'
import { useState } from 'react'
import { delShareLink, postLinkStatusAPI } from '@/apis/resume'

const LinkItem = ({
  link,
  index,
  handleDelLinkList,
  handleCopy,
}: {
  link: linkItem
  index: number
  handleDelLinkList: (id: number) => void
  handleCopy: (url: string) => void
}) => {
  const [isChecked, setIsChecked] = useState(Boolean(link.isActive))
  const handleChecked = async (val: boolean) => {
    // 更新视图状态
    setIsChecked(val)
    // 更新数据库状态
    await postLinkStatusAPI({
      isActive: val ? 1 : 0,
      shareToken: link.shareToken,
    })
  }

  const handleDel = async () => {
    await delShareLink(link.shareToken)
    handleDelLinkList(link.id)
  }

  return (
    <div className={styles['share-item']} key={link.id}>
      <div className={styles['icon-box']}>
        <Icon component={LinkSVG} />
      </div>
      <div className={styles['item-body']}>
        <div className={styles['body-top']}>
          <div className={styles['top-left']}>
            <span>分享链接 #{index} </span>
            <Tag>{link.accessType}</Tag>
            <Tag color={isChecked ? 'green' : 'gold'}>
              {isChecked ? '活跃' : '禁用'}
            </Tag>
          </div>
          <div className={styles['top-right']}>
            <div className={styles['switch-box']}>
              <ConfigProvider
                theme={{
                  components: {
                    Switch: {
                      handleShadow: 'none',
                      colorPrimary: '#18181b',
                      colorPrimaryHover: '#18181b',
                    },
                  },
                }}
              >
                <Switch
                  size="small"
                  checked={isChecked}
                  onChange={handleChecked}
                />
              </ConfigProvider>
            </div>
            <div className={styles['del-box']}>
              <Popconfirm
                title="温馨提示"
                description="您确认删除当前分享链接吗?"
                onConfirm={handleDel}
                okText="确认"
                cancelText="取消"
              >
                <Icon component={DeleteSVG} />
              </Popconfirm>
            </div>
          </div>
        </div>
        <div className={styles['body-bottom']}>
          <div>创建时间: {link.createTime}</div>
          <div>
            <span>过期时间: {link.expireAt}</span>
            <span>
              访问限制:{' '}
              <span style={{ color: '#ff5848' }}>{link.maxVisits}</span>
            </span>
            <span>已访问: {link.visitCount}</span>
          </div>
        </div>
        <div className={styles['body-link-box']}>
          <Input
            className={styles['custom-input']}
            disabled
            value={link.shareUrl}
          />
          <div
            className={styles['copy-box']}
            onClick={() => handleCopy(link.shareUrl)}
          >
            <Icon component={CopySVG} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkItem
