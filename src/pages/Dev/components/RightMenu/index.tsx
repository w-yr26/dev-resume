import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  DownloadOutlined,
  FullscreenExitOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  LayoutOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'

const toolMenu = [
  {
    icon: <AppstoreAddOutlined />,
    label: '模板',
  },
  {
    icon: <LayoutOutlined />,
    label: '布局',
  },
  {
    icon: <BgColorsOutlined />,
    label: '主题',
  },
  {
    icon: <FullscreenExitOutlined />,
    label: '全局',
  },
  {
    icon: <DownloadOutlined />,
    label: '导出',
  },
  {
    icon: <ImportOutlined />,
    label: '导入',
  },
  {
    icon: <InfoCircleOutlined />,
    label: '信息',
  },
]

const RightMenu = () => {
  return (
    <div className="w-12 h-full py-4 box-border flex flex-col justify-center items-center border-l border-[#e4e4e7]">
      <ul className="menu-right-list flex flex-col justify-center">
        {toolMenu.map((item) => {
          return (
            <li
              key={item.label}
              className="p-2 hover:rounded-sm hover:border hover:border-transparent hover:bg-[#f4f4f5] dark:hover:bg-[#18181b]"
            >
              <Tooltip placement="right" title={item.label}>
                {item.icon}
              </Tooltip>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RightMenu
