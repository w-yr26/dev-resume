import { HolderOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type ListProps<T> = {
  data: T[]
  fieldMap: {
    id: keyof T
    title: keyof T
    subTitle: keyof T
  }
  handleAdd: () => void
}

const List = <T,>({ data, fieldMap, handleAdd }: ListProps<T>) => {
  return (
    <>
      <div className="border-1 border-b-0 border-[#e4e4e7]">
        {data.map((item) => {
          return (
            <div
              key={String(item[fieldMap.id])}
              className="p-2 flex items-center box-border border-b-1 border-[#e4e4e7] hover:bg-[#f6f6f7] hover:cursor-help "
            >
              <HolderOutlined />
              <div className="ml-4">
                <p className="text-[#3f3f46] text-sm">
                  {String(item[fieldMap.title])}
                </p>
                <p className="text-[#71717a] text-[12px]">
                  {String(item[fieldMap.subTitle])}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-end mt-6">
        <Button icon={<PlusOutlined />} onClick={handleAdd}>
          添加一项
        </Button>
      </div>
    </>
  )
}

export default List
