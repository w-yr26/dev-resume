import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { CompressOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'

const Skill = () => {
  return (
    <CustomLayout>
      <Header label="技能特长" icon={CompressOutlined}></Header>
      <RichInput value="<p>test edu</p>"></RichInput>
    </CustomLayout>
  )
}

export default Skill
