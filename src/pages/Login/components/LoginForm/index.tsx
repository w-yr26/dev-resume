import { Form, Input } from 'antd'
import CustomBtn from '@/components/CustomBtn'
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
        <CustomBtn
          type="submit"
          disabled={isLoading}
          label={isLoading ? '登录中...' : '登录'}
        />
        <a onClick={onForgotPassword} className={styles['forgot-link']}>
          忘记密码？
        </a>
      </Form.Item>
    </Form>
  )
}
