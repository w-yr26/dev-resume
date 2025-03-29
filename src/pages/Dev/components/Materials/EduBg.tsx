import { IdcardOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import RichInput from './components/RichInput'
import CustomLayout from '../../../../components/CustomLayout/index'
const EduBg = () => {
  return (
    <CustomLayout>
      <Header label="教育背景" icon={IdcardOutlined}></Header>
      <RichInput value="<p>test edu</p>"></RichInput>
    </CustomLayout>
  )
}

export default EduBg
