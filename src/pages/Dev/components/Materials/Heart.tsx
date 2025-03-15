import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { HeartOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'

const Heart = () => {
  return (
    <CustomLayout>
      <Header label="兴趣爱好" icon={HeartOutlined}></Header>
      <RichInput value="<p>test heart</p>"></RichInput>
    </CustomLayout>
  )
}

export default Heart
