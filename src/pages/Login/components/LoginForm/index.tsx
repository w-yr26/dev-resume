import { Form, Input, Button } from 'antd'
import styles from './index.module.scss'

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
  return (
    <Form
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入有效的邮箱地址',
          },
        ]}
      >
        <Input className={styles.input} placeholder="user@example.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度至少6位' },
        ]}
      >
        <Input.Password className={styles.input} placeholder="password123" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.button}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? '登录中...' : '登录'}
        </Button>
        <a
          onClick={onForgotPassword}
          className={styles['forgot-link']}
          style={{
            fontSize: '12px',
          }}
        >
          忘记密码？
        </a>
      </Form.Item>
    </Form>
  )
}
