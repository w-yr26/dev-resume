import { CustomIptType } from '@/types/dev'
import { Input } from 'antd'
import styles from './index.module.scss'

const CustomInput = (props: CustomIptType) => {
  const { label, placeholder, onChange, value } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  return (
    <div className={styles['custom-input-box']}>
      <p className={styles['label']}>{label}</p>
      <Input
        placeholder={placeholder}
        style={{
          height: '36px',
        }}
        onChange={(e) => handleChange(e)}
        value={value}
      />
    </div>
  )
}

export default CustomInput
