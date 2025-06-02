import { getLinkInfoAPI } from '@/apis/resume'
import { useEffect, useState } from 'react'
import Unauthorized from '../Unauthorized'
import { useShareStore, useUserStore } from '@/store'

// 校验链接是否失效或者当前用户是否在目标列表的高阶组件
const InvalidHoc = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: string | null
}) => {
  const email = useUserStore((state) => state.info.email)
  const updatePermissions = useShareStore((state) => state.updatePermissions)
  const updateTarget = useShareStore((state) => state.updateTarget)
  // 链接是否失效
  const [isUnauthorization, setIsUnauthorization] = useState(false)
  // 用户是否在人员范畴内(默认是在人员范畴内的)
  const [isWithinRange, setIsWithinRange] = useState(true)
  // 判断是否从分享页进入
  useEffect(() => {
    const getShareLinkInfo = async () => {
      if (token) {
        try {
          const { data } = await getLinkInfoAPI(token)
          if (data!.targets) {
            const idx = data?.targets.findIndex((i) => i.targetValue === email)
            setIsWithinRange(idx !== -1)
          }
          updateTarget(data!.targets)
          updatePermissions(JSON.parse(data!.permissions))
        } catch (_) {
          // 当链接失效、链接过期、抵达最大访问次数时，都会走这里
          setIsUnauthorization(true)
        }
      }
    }
    getShareLinkInfo()
  }, [token])

  return (
    <>
      {isUnauthorization || !isWithinRange ? (
        <Unauthorized type={isUnauthorization ? 'expired' : 'beyond'} />
      ) : (
        children
      )}
    </>
  )
}

export default InvalidHoc
