import { Form, Input, Tooltip } from 'antd'
import type { FormProps } from 'antd'
import styles from './index.module.scss'
import CustomBtn from '@/components/CustomBtn'

type FieldType = {
  username?: string
  password?: string
  verificationCode?: string
  email?: string
}
const Register = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles['register-layout']}>
      <div className={styles['illustrate-container']}>
        <p className={styles['slogan']}>3分钟生成专业简历，轻松拿下面试机会</p>
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
              validateStatus="error"
              hasFeedback={false}
              help={null}
            >
              <Tooltip
                title={'请输入您的用户名'}
                defaultOpen={true}
                placement="topRight"
              >
                <Input className={styles['custom-input']} />
              </Tooltip>
            </Form.Item>
            <Form.Item<FieldType>
              label="电子邮箱"
              name="email"
              rules={[{ required: true, message: '请输入电子邮箱' }]}
            >
              <Input className={styles['custom-input']} />
            </Form.Item>
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password className={styles['custom-input']} />
            </Form.Item>
            <div className={styles['raw-input']}>
              <Form.Item<FieldType>
                label="验证码"
                name="verificationCode"
                rules={[{ required: true, message: '请输入邮箱验证码' }]}
                layout="horizontal"
                style={{
                  width: '90%',
                  height: 'auto',
                  margin: 0,
                  marginRight: '8px',
                }}
              >
                <Input.Password className={styles['custom-input']} />
              </Form.Item>
              <CustomBtn label="注册" />
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
