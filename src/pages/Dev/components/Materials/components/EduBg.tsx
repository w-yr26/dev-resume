import { IdcardOutlined } from '@ant-design/icons'
import Header from './Header'
import RichInput from './RichInput'
const EduBg = () => {
  return (
    <div className=" py-6">
      <Header label="教育背景" icon={IdcardOutlined}></Header>
      <RichInput></RichInput>
    </div>
  )
}

export default EduBg
