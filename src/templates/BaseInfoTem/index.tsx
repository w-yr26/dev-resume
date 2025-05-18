import { Image } from 'antd'
import styles from './index.module.scss'
import { useDevStore } from '@/store'

const labelMap = {
  userName: '姓名',
  position: '职位',
  phone: '手机',
  email: '邮箱',
  tblob: '个人博客',
  gender: '性别',
  age: '年龄',
}

const BaseInfoTem = () => {
  const baseInfo = useDevStore(
    (state) => state.devSchema.dataSource.BASE_INFO.info
  )

  // 逻辑：以BaseInfo这个模块为例，此时的布局是写死的，后面应该根据模板选择不同，替换成不同的布局样式
  return (
    <div className={styles['layout']}>
      <div className={styles['avatar-container']}>
        <Image width={100} height={130} src={baseInfo.avatar} />
      </div>
      <ul className={styles['info-container']}>
        {Object.entries(baseInfo).map(([key, value]) => {
          if (key === 'avatar') return ''
          return (
            <li key={key} className={styles['info-item']}>
              <span>{labelMap[key as keyof typeof labelMap]}：</span>
              <span>{value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BaseInfoTem
