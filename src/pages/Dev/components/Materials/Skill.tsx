import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { CompressOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'
import { useDevStore } from '@/store'

const Skill = () => {
  const { info: skillInfo, label } = useDevStore(
    (state) => state.devSchema.dataSource.SKILL_LIST
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  return (
    <CustomLayout>
      <Header label={label || '技能特长'} icon={CompressOutlined}></Header>
      <RichInput
        value={skillInfo}
        onChange={(val: string) => immerRichInfo(val, 'SKILL_LIST')}
      ></RichInput>
    </CustomLayout>
  )
}

export default Skill
