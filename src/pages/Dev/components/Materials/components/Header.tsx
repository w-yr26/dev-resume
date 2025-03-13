import type { HeaderType } from '@/types/dev'
import CtxMenu from './CtxMenu'

const Header: React.FC<HeaderType> = (props) => {
  const { label, icon: Icon, opMenu = true } = props

  return (
    <div className="flex items-center justify-between h-12">
      <div className="flex items-center">
        <Icon />
        <span className="text-[#09090b] text-2xl font-black ml-4">{label}</span>
      </div>
      {opMenu && <CtxMenu />}
    </div>
  )
}

export default Header
