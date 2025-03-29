import { CustomIptType } from '@/types/dev'
import { Input } from 'antd'
import styles from './index.module.scss'

const CustomInput: React.FC<CustomIptType> = (props) => {
  const { label, placeholder } = props
  return (
    <div className={styles['custom-input-box']}>
      <p className={styles['label']}>{label}</p>
      <Input
        placeholder={placeholder}
        style={{
          height: '36px',
        }}
      />
    </div>
  )
}

export default CustomInput
