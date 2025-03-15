import { PlusOutlined } from '@ant-design/icons'

const AddBtn: React.FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <div
      className="flex justify-center items-center mt-4 w-full h-[48px] box-border border-1 border-dashed border-[#e4e4e7] bg-[#f8f8f9] hover:bg-[#f4f4f5] hover:cursor-help"
      onClick={handleAdd}
    >
      <PlusOutlined />
      <span className="ml-4  text-sm">添加一项</span>
    </div>
  )
}

export default AddBtn
