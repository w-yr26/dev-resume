import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { HeartOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'
import { useDevStore } from '@/store'

const Heart = () => {
  const { info: heartInfo, label } = useDevStore(
    (state) => state.devSchema.dataSource.HEART_LIST
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  return (
    <CustomLayout>
      <Header label={label || '兴趣爱好'} icon={HeartOutlined}></Header>
      <RichInput
        value={heartInfo}
        onChange={(val: string) => immerRichInfo(val, 'HEART_LIST')}
      ></RichInput>
    </CustomLayout>
  )
}

export default Heart
