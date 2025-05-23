import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import SkillSVG from '@/assets/svg/dev/skill.svg?react'
import { useDevStore, useGlobalStore, useUserStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useEffect, useRef } from 'react'
import MdEditor from '@/components/MdEditor'
import { postModuleInfoAPI } from '@/apis/resume'

const Skill = () => {
  const resumeId = useDevStore((state) => state.resumeId)
  const userId = useUserStore((state) => state.info.id)
  const {
    info: [skillInfo],
    label,
  } = useDevStore((state) => state.devSchema.dataSource.SKILL_LIST)

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
        svg={<Icon component={SkillSVG} />}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu currentKey="SKILL_LIST" renameLabel={() => setIsEdit(true)} />
      </Header>
      <MdEditor
        value={skillInfo?.content || ''}
        onChange={(val: string) => immerRichInfo(val, 'SKILL_LIST')}
        onBlur={async (val: string) => {
          await postModuleInfoAPI({
            content: {
              info: val,
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
