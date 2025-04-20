import Icon from '@ant-design/icons'
import EduSVG from '@/assets/svg/dev/edu.svg?react'
import Header from '@/components/Header/index'
import RichInput from './components/RichInput'
import CustomLayout from '@/components/CustomLayout/index'
import { useDevStore, useGlobalStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useEffect, useRef } from 'react'
const EduBg = () => {
  const edubgRef = useRef<HTMLDivElement>(null)
  const setPosition = useGlobalStore((state) => state.setPosition)

  useEffect(() => {
    if (edubgRef.current) {
      const { y } = edubgRef.current.getBoundingClientRect()
      setPosition('EDU_BG', y)
    }
  }, [])

  const { info, label } = useDevStore(
    (state) => state.devSchema.dataSource.EDU_BG
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('EDU_BG')

  return (
    <CustomLayout ref={edubgRef}>
      <Header
        label={label || '教育背景'}
        svg={<Icon component={EduSVG} />}
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
