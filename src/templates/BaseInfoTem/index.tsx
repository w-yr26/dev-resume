import { useAppSelector } from '@/hooks'
import { Image } from 'antd'
import './index.css'

const labelMap = {
  user_name: '姓名',
  position: '职位',
  phone: '手机',
  email: '邮箱',
  blob: '个人博客',
  gender: '性别',
  age: '年龄',
}

const BaseInfoTem = () => {
  const baseInfo = useAppSelector(
    (state) => state.dev.dataSource.BASE_INFO.info
  )

  return (
    <div className="layout">
      <div className="avatar-container">
        <Image width={120} height={150} src={baseInfo.avatar} />
      </div>
      <ul className="info-container">
        {Object.entries(baseInfo).map(([key, value]) => {
          if (key === 'avatar') return ''
          return (
            <li key={key} className="info-item">
              <span>{labelMap[key]}：</span>
              <span>{value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BaseInfoTem
