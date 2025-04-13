import { useState, useEffect } from 'react'
import { Form, Input, Row, Col, message } from 'antd'
import CustomBtn from '@/components/CustomBtn'
import styles from './index.module.scss'
import { getVerificationCodeAPI, postNewPwdAPI } from '@/apis/user'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'

interface ResetPasswordFormProps {
  onFinish: (values: any) => void
  isLoading: boolean
}

export const ResetPasswordForm = ({
  onFinish,
  isLoading,
}: ResetPasswordFormProps) => {
  const [countdown, setCountdown] = useState(0)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [form] = Form.useForm()
  const [isSendingCode, setIsSendingCode] = useState(false)
  const { email } = useUserStore((state) => state.info)
  const navigate = useNavigate()

  useEffect(() => {
    form.setFieldValue('email', email)
  }, [email, form])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleSendCode = async () => {
    if (countdown > 0) return
    await handleSendVerificationCode()
  }

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  const handleSendVerificationCode = async () => {
    try {
      await form.validateFields(['email', 'newPassword'])

      const email = form.getFieldValue('email')?.trim()
      setIsSendingCode(true)
      const { code } = await getVerificationCodeAPI(email)

      if (code === 1) {
        message.success('验证码已发送至您的邮箱')
        setIsCodeSent(true)
        setCountdown(30)
      }
    } catch (err) {
      console.log(err)
      message.error('请检查邮箱、密码格式')
      return
    }
  }

  const handleRevisePSD = async () => {
    const values = await form.validateFields()
    console.log(values)
    const { code } = await postNewPwdAPI({ ...values })
    if (code) {
      message.success('密码修改成功')
      navigate('/login')
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      name="reset-password-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        label={'邮箱'}
        rules={[
          { required: true, message: '请输入您的注册邮箱' },
          {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: '请输入有效的邮箱地址',
          },
          {
            validator: (_, value) => {
              if (value && value.trim() === '') {
                return Promise.reject('邮箱不能仅为空格')
              }
              return Promise.resolve()
            },
          },
        ]}
        normalize={(value) => value.trim()}
      >
        <Input className={styles.input} placeholder="user@example.com" />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="新密码"
        rules={[
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码长度至少6位' },
        ]}
      >
        <Input.Password className={styles.input} placeholder="请输入新密码" />
      </Form.Item>

      <Form.Item
        name="verificationCode"
        label="验证码"
        rules={[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位数字' },
        ]}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Input
              className={styles.input}
              placeholder="请输入6位验证码"
              maxLength={6}
            />
          </Col>
          <Col span={8}>
            <CustomBtn
              disabled={isSendingCode || countdown > 0}
              label={
                isSendingCode
                  ? '发送中...'
                  : countdown > 0
                  ? formatCountdown(countdown as number)
                  : isCodeSent
                  ? '重新获取验证码'
                  : '获取验证码'
              }
              onClick={handleSendCode}
            />
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <CustomBtn
          label={isLoading ? '提交中...' : '确认修改'}
          type="submit"
          onClick={handleRevisePSD}
          disabled={true}
        />
      </Form.Item>
    </Form>
  )
}
