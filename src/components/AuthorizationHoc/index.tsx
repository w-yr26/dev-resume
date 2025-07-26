import { useUserStore } from '@/store'

const AuthorizationHoc = ({ children }: { children: React.ReactNode }) => {
  const token = useUserStore((state) => state.info.token)

  if (!token) return null
  return children
}

export default AuthorizationHoc
