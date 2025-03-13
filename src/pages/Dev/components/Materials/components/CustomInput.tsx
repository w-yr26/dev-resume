import { CustomIptType } from '@/types/dev'
import { Input } from 'antd'

const CustomInput: React.FC<CustomIptType> = (props) => {
  const { label, placeholder } = props
  return (
    <div className="mt-2">
      <p className="text-sm text-[#18181b] mb-2">{label}</p>
      <Input
        placeholder={placeholder}
        style={{
          height: '36px',
        }}
      />
    </div>
  )
}

export default CustomInput
