import type { HeaderType } from '@/types/dev'
import styles from './index.module.scss'
import { Input } from 'antd'
import { useState } from 'react'

const Header = (props: HeaderType) => {
  const {
    label,
    icon: Icon,
    opMenu = true,
    children,
    isEdit,
    handleChange: propChange,
    handleBlur,
  } = props

  const [name, setName] = useState(label)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    if (propChange) propChange(newName)
  }

  return (
    <div className={styles['header-container']}>
      <div className={styles['header-left']}>
        <Icon />
        {isEdit ? (
          <Input
            value={name}
            autoFocus
            onChange={handleChange}
            onBlur={() => {
              if (handleBlur) handleBlur()
            }}
            className={styles['rename-input']}
          />
        ) : (
          <span className={styles['label']}>{label}</span>
        )}
      </div>
      {opMenu && children}
    </div>
  )
}

export default Header
