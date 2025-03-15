import { IdcardOutlined } from '@ant-design/icons'
import Header from './components/Header'
import RichInput from './components/RichInput'
import CustomLayout from '../../../../components/CustomLayout'
const EduBg = () => {
  return (
    <CustomLayout>
      <Header label="教育背景" icon={IdcardOutlined}></Header>
      <RichInput></RichInput>
    </CustomLayout>
  )
}

export default EduBg
