import { useState, useEffect } from 'react'
import { Form, Input, message } from 'antd'
import CustomBtn from '@/components/CustomBtn'
import styles from './index.module.scss'
import { getVerificationCodeAPI, postNewPwdAPI } from '@/apis/user'
import { useUserStore } from '@/store'

export const ResetPasswordForm = ({
  setShowResetPassword,
}: {
  setShowResetPassword: (val: boolean) => void
}) => {
  const [form] = Form.useForm()
  const { email } = useUserStore((state) => state.info)
  const [countdown, setCountdown] = useState(60)
  const [isCountdown, setIsCountdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isCountdown) return
    if (countdown === 0) {
      setIsCountdown(false)
      return
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, isCountdown])

  useEffect(() => {
    form.setFieldValue('email', email)
  }, [email, form])

  const handleSendCode = async () => {
    try {
      await form.validateFields(['email'])
      const email = form.getFieldValue('email')?.trim()
      console.log('email', email)

      setIsCountdown(true)
      await getVerificationCodeAPI(email)
    } catch (err) {
      console.log(err)
      message.error('请检查邮箱格式是否正确')
      // 重置倒计时相关的状态
      setCountdown(60)
      setIsCountdown(false)
    }
  }

  const handleRevisePSD = async () => {
    try {
      setIsLoading(true)
      await form.validateFields()
      const values = await form.validateFields()
      await postNewPwdAPI({ ...values })
      setShowResetPassword(false)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form form={form} name="reset-password-form" autoComplete="off">
      <Form.Item
        name="email"
        label={'原邮箱'}
        rules={[
          { required: true, message: '请输入您的注册邮箱' },
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
        ]}
        help=""
      >
        <Input
          className={styles['custom-input']}
          placeholder="user@example.com"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="新密码"
        rules={[
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码长度至少6位' },
        ]}
        help=""
      >
        <Input.Password
          className={styles['custom-input']}
          placeholder="请输入新密码"
        />
      </Form.Item>

      <div className={styles['raw-input']}>
        <Form.Item
          name="verificationCode"
          label="验证码"
          rules={[{ required: true, message: '请输入验证码' }]}
          style={{
            flex: 1,
            margin: 0,
            marginRight: '8px',
          }}
          help=""
        >
          <Input
            className={styles['custom-input']}
            placeholder="请输入6位验证码"
            maxLength={6}
          />
        </Form.Item>
        <CustomBtn
          disabled={isCountdown}
          label={!isCountdown ? '获取验证码' : `${countdown}s 后重新获取`}
          style={{
            width: '120px',
          }}
          onClick={handleSendCode}
        />
      </div>

      <Form.Item>
        <CustomBtn
          label={isLoading ? '提交中...' : '确认修改'}
          type="submit"
          onClick={handleRevisePSD}
        />
      </Form.Item>
    </Form>
  )
}
