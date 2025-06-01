import { getLinkInfoAPI } from '@/apis/resume'
import { useEffect, useState } from 'react'
import Unauthorized from '../Unauthorized'
import { useShareStore } from '@/store'

// 校验链接是否失效的高阶组件
const InvalidHoc = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: string | null
}) => {
  const updatePermissions = useShareStore((state) => state.updatePermissions)
  const updateTarget = useShareStore((state) => state.updateTarget)

  const [isUnauthorization, setIsUnauthorization] = useState(false)

  // 判断是否从分享页进入
  useEffect(() => {
    const getShareLinkInfo = async () => {
      if (token) {
        try {
          const { data } = await getLinkInfoAPI(token)
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

  return <>{isUnauthorization ? <Unauthorized /> : children}</>
}

export default InvalidHoc
