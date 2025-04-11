import { IdcardOutlined } from '@ant-design/icons'
import Header from '@/components/Header/index'
import RichInput from './components/RichInput'
import CustomLayout from '@/components/CustomLayout/index'
import { useDevStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
const EduBg = () => {
  const { info, label } = useDevStore(
    (state) => state.devSchema.dataSource.EDU_BG
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('EDU_BG')

  return (
    <CustomLayout>
      <Header
        label={label || '教育背景'}
        icon={IdcardOutlined}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="EDU_BG"
          renameLabel={() => setIsEdit(true)}
        ></CtxMenu>
      </Header>
      <RichInput
        value={info}
        onChange={(val: string) => immerRichInfo(val, 'EDU_BG')}
      ></RichInput>
    </CustomLayout>
  )
}

export default EduBg
