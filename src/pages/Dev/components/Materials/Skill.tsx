import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { CompressOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'
import { useDevStore, useGlobalStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useEffect, useRef } from 'react'

const Skill = () => {
  const { info: skillInfo, label } = useDevStore(
    (state) => state.devSchema.dataSource.SKILL_LIST
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const setPosition = useGlobalStore((state) => state.setPosition)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('SKILL_LIST')
  const skillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (skillRef.current) {
      const { y } = skillRef.current.getBoundingClientRect()
      setPosition('SKILL_LIST', y)
    }
  }, [])

  return (
    <CustomLayout ref={skillRef}>
      <Header
        label={label || '技能特长'}
        icon={CompressOutlined}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="SKILL_LIST"
          renameLabel={() => setIsEdit(true)}
        ></CtxMenu>
      </Header>
      <RichInput
        value={skillInfo}
        onChange={(val: string) => immerRichInfo(val, 'SKILL_LIST')}
      ></RichInput>
    </CustomLayout>
  )
}

export default Skill
