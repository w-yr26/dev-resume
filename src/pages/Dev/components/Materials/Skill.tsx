import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import SkillSVG from '@/assets/svg/dev/skill.svg?react'
import { useDevStore, useUserStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useRef } from 'react'
import MdEditor from '@/components/MdEditor'
import { postModuleInfoAPI } from '@/apis/resume'
import { useElementPosition } from '@/hooks/useElementPosition'

const skillIcon = <Icon component={SkillSVG} />

const Skill = () => {
  const resumeId = useDevStore((state) => state.resumeId)
  const userId = useUserStore((state) => state.info.id)
  const {
    info: [skillInfo],
    label,
    visible,
  } = useDevStore((state) => state.devSchema.dataSource.SKILL_LIST)

  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('SKILL_LIST')
  const skillRef = useRef<HTMLDivElement>(null)

  const handleSkillVal = (val: string) => {
    immerRichInfo(val, 'SKILL_LIST')
  }

  useElementPosition(skillRef, 'SKILL_LIST')

  return (
    <CustomLayout ref={skillRef}>
      <Header
        label={label || '技能特长'}
        svg={skillIcon}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="SKILL_LIST"
          visible={visible}
          renameLabel={() => setIsEdit(true)}
        />
      </Header>
      <MdEditor
        value={skillInfo?.content}
        onChange={(val: string) => handleSkillVal(val)}
        onBlur={async (val: string) => {
          await postModuleInfoAPI({
            content: {
              info: val,
              id: skillInfo.id === '-1' ? undefined : skillInfo.id,
            },
            resumeId,
            type: 'SKILL_LIST',
            userId,
          })
        }}
      />
    </CustomLayout>
  )
}

export default Skill
