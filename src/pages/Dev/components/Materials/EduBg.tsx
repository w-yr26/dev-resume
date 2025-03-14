import { IdcardOutlined } from '@ant-design/icons'
import Header from './components/Header'
import RichInput from './components/RichInput'
const EduBg = () => {
  return (
    <div className="py-6 border-b-1 border-[#e4e4e7]">
      <Header label="教育背景" icon={IdcardOutlined}></Header>
      <RichInput></RichInput>
    </div>
  )
}

export default EduBg
