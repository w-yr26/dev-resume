import { Divider } from 'antd'
import CustomBtn from '@/components/CustomBtn'

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
      <CustomBtn onClick={handleGiteeLogin} label="Gitee登录" />
    </>
  )
}
