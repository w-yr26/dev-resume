import { useShareStore, useUserStore } from '@/store'
import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// 按钮/组件级别的权限控制高阶组件
const AuthorizationHoc = ({
  children,
  permission = 1,
  isOrigin = true,
}: {
  children: React.ReactNode
  permission: 1 | 2 | 3 | 4
  isOrigin: boolean
}) => {
  // 权限列表
  // 1：阅读
  // 2：评论
  // 3：编辑
  // 4. 复制
  const permissionsList = useShareStore((state) => state.permissions)
  // 分享人员列表(若为null，说明无限制)
  const targetUsers = useShareStore((state) => state.targetUsers)
  const email = useUserStore((state) => state.info.email)

  const shareUsersEmailList = useMemo(() => {
    if (!targetUsers) return null
    else return targetUsers.map((i) => i.targetValue)
  }, [targetUsers])

  // 先校验当前用户是否在目标列表里面
  // 剩下的要么是无限制访问人员邮箱、要么是用户在目标列表里面
  // 有权限：
  // 1. 要么没有划定用户范围 shareUsersEmailList = null
  // 2. 要么在用户范围内
  // 3. 且当前待校验组件有对应的权限
  const hasAccess = useMemo(
    () =>
      (!shareUsersEmailList || shareUsersEmailList.includes(email)) &&
      permissionsList.includes(permission),
    [shareUsersEmailList, email, permissionsList, permission]
  )

  if (isOrigin) return children

  return (
    <AnimatePresence>
      {hasAccess ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative', zIndex: 'inherit' }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default AuthorizationHoc
