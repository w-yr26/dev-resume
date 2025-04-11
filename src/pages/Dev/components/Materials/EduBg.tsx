import { IdcardOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import RichInput from './components/RichInput'
import CustomLayout from '@/components/CustomLayout/index'
import { useDevStore } from '@/store'
const EduBg = () => {
  const { info, label } = useDevStore(
    (state) => state.devSchema.dataSource.EDU_BG
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)

  return (
    <CustomLayout>
      <Header label={label || '教育背景'} icon={IdcardOutlined}></Header>
      <RichInput
        value={info}
        onChange={(val: string) => immerRichInfo(val, 'EDU_BG')}
      ></RichInput>
    </CustomLayout>
  )
}

export default EduBg
