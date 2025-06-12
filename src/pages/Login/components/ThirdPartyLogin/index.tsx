import { Divider, Popover, Steps } from 'antd'
import CustomBtn from '@/components/CustomBtn'
import Icon from '@ant-design/icons'
import resumeSVG from '@/assets/svg/resume.svg?react'

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
    window.location.href =
      'http://5d0cfcb7.r39.cpolar.top/resume/user/gitee/redirect'
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
          或使用以下方式继续
        </span>
      </Divider>
      <CustomBtn
        label="Gitee登录"
        icon={
          <Popover content={content} placement="bottom" title="快捷登录指引">
            <Icon component={resumeSVG} />
          </Popover>
        }
        onClick={handleGiteeLogin}
      />
    </>
  )
}
