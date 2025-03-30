import React from 'react'

const templatesStyle = {
  template1: {
    EDU_BG: {
      wrapper: 'template1-edu-bg-wrapper',
    },
  },
}

const configStyle = {
  commonStyle: {
    // fontSize: '14px',
    // padding: '12px',
    color: '#333',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  },
  templatesStyle,
}

export default configStyle
