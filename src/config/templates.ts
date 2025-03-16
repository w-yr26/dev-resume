import React from 'react'

const templatesStyle = {
  template1: {
    BASE_INFO: {
      layout: 'py-2',
    },
  },
}

const configStyle = {
  commonStyle: {
    fontSize: '14px',
    padding: '12px',
    color: '#333',
    boxSizing: 'border-box' as React.CSSProperties['boxSizing'],
  },
  templatesStyle,
}

export default configStyle
