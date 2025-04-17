import React from 'react'
import styled from './index.module.scss'

type customFieldType = {
  children: React.ReactNode
  title: string
}

const CustomField = ({ children, title }: customFieldType) => {
  return (
    <div className={styled['custom-field-container']}>
      <p>{title}</p>
      {children}
    </div>
  )
}

export default CustomField
