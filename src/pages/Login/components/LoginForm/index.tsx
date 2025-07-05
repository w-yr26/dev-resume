import { Button, Form, Input } from 'antd'
import styles from './index.module.scss'
import commonStyles from '../../index.module.scss'
import '@/pages/Register/custom.style.scss'
interface LoginFormProps {
  onFinish: (values: any) => void
  isLoading: boolean
  onForgotPassword?: () => void
}

export const LoginForm = ({
  onFinish,
  isLoading,
  onForgotPassword,
}: LoginFormProps) => {
  const [form] = Form.useForm()
  const handleLogin = async () => {
    const values = await form.validateFields()
    await onFinish(values)
  }

  return (
    <Form
      name="login-form"
      form={form}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          {
            type: 'email',
            message: '请输入有效的邮箱地址',
          },
        ]}
      >
        <Input
          className={commonStyles['custom-input']}
          placeholder="user@example.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度至少6位' },
        ]}
      >
        <Input.Password
          className={commonStyles['custom-input']}
          placeholder="password123"
        />
      </Form.Item>

      <Form.Item>
        <Button
          style={{
            width: '100%',
            height: '48px',
          }}
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? '登录中...' : '登录'}
        </Button>
        <a onClick={onForgotPassword} className={styles['forgot-link']}>
          忘记密码？
        </a>
      </Form.Item>
    </Form>
  )
}
