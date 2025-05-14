import React from 'react'
import styled from './index.module.scss'

type customFieldType = {
  children: React.ReactNode
  title: string
  style?: React.CSSProperties
}

const CustomField = ({ children, title, style = {} }: customFieldType) => {
  return (
    <div className={styled['custom-field-container']}>
      <p style={style}>{title}</p>
      {children}
    </div>
  )
}

export default CustomField
