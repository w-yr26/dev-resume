import { useShareStore } from '@/store'
import { memo } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// 按钮/组件级别的权限控制高阶组件，按权限控制
const AuthorizationHoc = memo(
  ({
    children,
    permission = 1,
    isOrigin = true,
    isOnlyOrigin = false,
  }: {
    children: React.ReactNode
    permission: 1 | 2 | 3 | 4
    isOrigin: boolean // 是否为原链接进入
    type?: string // 打备注，调试进行权限控制的组件
    isOnlyOrigin?: boolean // 是否只有作者可见
  }) => {
    // 权限列表
    // 1：阅读
    // 2：评论
    // 3：编辑
    // 4. 复制
    const permissionsList = useShareStore((state) => state.permissions)

    // 原链接，无限制
    if (isOrigin) return children
    // 仅作者可见
    if (isOnlyOrigin && !isOrigin) return null
    // 仅有在权限范围内才可见
    return <>{permissionsList.includes(permission) ? children : null}</>
  }
)

export default AuthorizationHoc
