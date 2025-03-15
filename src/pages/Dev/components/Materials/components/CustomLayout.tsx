import React, { PropsWithChildren } from 'react'

const CustomLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="border-b-1 border-[#e4e4e7] py-6">{children}</div>
}

export default CustomLayout
