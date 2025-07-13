import { Button, Divider, Popover, Steps } from 'antd'
import Icon from '@ant-design/icons'
import infoSVG from '@/assets/svg/dev/info.svg?react'
import { BASE_URL } from '@/utils/request'

const content = () => (
  <Steps
    size="small"
    items={[
      {
        title: '打开个人设置',
        status: 'wait',
      },
      {
        title: '选择邮箱管理',
        status: 'wait',
      },
      {
        title: '选择公开邮箱设置',
        status: 'wait',
      },
    ]}
  />
)

export const ThirdPartyLogin = () => {
  const handleGiteeLogin = () => {
    // 跳转至授权页面
    window.location.href = `${BASE_URL}/resume/user/gitee/redirect`
  }

  return (
    <>
      <Divider>
        <span
          style={{
            fontSize: '12px',
            color: '#2e3030',
            fontWeight: 400,
          }}
        >
          或使用以下方式继续{' '}
          <Popover content={content} placement="bottom" title="快捷登录指引">
            <Icon
              component={infoSVG}
              style={{
                cursor: 'pointer',
              }}
            />
          </Popover>
        </span>
      </Divider>
      <Button
        style={{
          height: '48px',
        }}
        onClick={handleGiteeLogin}
      >
        Gitee登录
      </Button>
    </>
  )
}
