import type { HeaderType } from '@/types/dev'

const Header: React.FC<HeaderType> = (props) => {
  const { label, icon: Icon } = props
  return (
    <div className="flex items-center h-12">
      <div>
        <Icon />
      </div>
      <span className="text-[#09090b] text-2xl font-black ml-4">{label}</span>
    </div>
  )
}

export default Header
