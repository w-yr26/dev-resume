import { IdcardOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import RichInput from './components/RichInput'
import CustomLayout from '@/components/CustomLayout/index'
import { useDevStore } from '@/store'
const EduBg = () => {
  const { info } = useDevStore((state) => state.devSchema.dataSource.EDU_BG)
  const immerEduBg = useDevStore((state) => state.immerEduBg)
  const handleChange = (val: string) => {
    console.log('val', val)
    immerEduBg(val)
  }

  return (
    <CustomLayout>
      <Header label="教育背景" icon={IdcardOutlined}></Header>
      <RichInput value={info} onChange={handleChange}></RichInput>
    </CustomLayout>
  )
}

export default EduBg
