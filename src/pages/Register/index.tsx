import { Form, Input } from 'antd'
import styles from './index.module.scss'
import './custom.style.scss'
import CustomBtn from '@/components/CustomBtn'
import { postRegisterAPI, postRegisterCodeAPI } from '@/apis/user'
import { useNavigate } from 'react-router-dom'

type FieldType = {
  username?: string
  password?: string
  verificationCode?: string
  email?: string
}
const Register = () => {
  const [formRef] = Form.useForm()
  const navigate = useNavigate()

  const handleGetCode = async () => {
    const email = formRef.getFieldValue('email')
    if (!email) return console.log('请输入邮箱')

    await postRegisterCodeAPI(email)
  }

  const handleSubmit = async () => {
    const data = await formRef.getFieldsValue()
    await postRegisterAPI(data)
    navigate('/login', {
      replace: true,
    })
  }

  return (
    <div className={styles['register-layout']}>
      <div className={styles['illustrate-container']}>
        <p className={styles['slogan']}>5分钟生成专业简历，轻松拿下面试机会</p>
        <p className={styles['subtitle']}>
          选择简历模板 | AI 内容优化 | 一键导出 PDF
        </p>
        <div className={styles['background-circles']}>
          <div className={styles['circle1']}></div>
          <div className={styles['circle2']}></div>
          <div className={styles['circle3']}></div>
        </div>
      </div>
      <div className={styles['form-container']}>
        <div className={styles['top-icon-box']}>
          <div className={styles['inner-box']} />
        </div>
        <div className={styles['info-box']}>
          <div className={styles['primary-title']}>创建您的账户</div>
          <div className={styles['sub-title']}>请填写以下信息完成注册</div>
        </div>
        <div className="form-box">
          <Form
            name="register-form"
            autoComplete="off"
            layout="vertical"
            form={formRef}
            onFinish={handleSubmit}
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true }]}
              help=""
            >
              <Input className={styles['custom-input']} />
            </Form.Item>
            <Form.Item<FieldType>
              label="电子邮箱"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
                { required: true, message: '请输入电子邮箱' },
              ]}
              help=""
            >
              <Input className={styles['custom-input']} />
            </Form.Item>
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
              help=""
            >
              <Input.Password className={styles['custom-input']} />
            </Form.Item>
            <div className={styles['raw-input']}>
              <Form.Item<FieldType>
                label="验证码"
                name="verificationCode"
                rules={[{ required: true }]}
                layout="horizontal"
                style={{
                  flex: 1,
                  height: 'auto',
                  margin: 0,
                  marginRight: '8px',
                }}
                help=""
              >
                <Input className={styles['custom-input']} />
              </Form.Item>
              <CustomBtn
                type="button"
                label="点击获取验证码"
                style={{
                  width: '150px',
                }}
                onClick={handleGetCode}
              />
            </div>
            <Form.Item>
              <CustomBtn type="submit" label="注册" />
            </Form.Item>
          </Form>
        </div>
        <div className={styles['navigate-to-login-box']}>
          <span>已有账户? </span>
          <span
            className={styles['login-label']}
            onClick={() => navigate('/login')}
          >
            登录
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
