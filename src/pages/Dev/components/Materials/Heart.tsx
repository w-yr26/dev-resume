import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import { HeartOutlined } from '@ant-design/icons'
import RichInput from './components/RichInput'
import { useDevStore, useGlobalStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useEffect, useRef } from 'react'

const Heart = () => {
  const { info: heartInfo, label } = useDevStore(
    (state) => state.devSchema.dataSource.HEART_LIST
  )
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const setPosition = useGlobalStore((state) => state.setPosition)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('SKILL_LIST')
  const heartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heartRef.current) {
      const { y } = heartRef.current.getBoundingClientRect()
      setPosition('HEART_LIST', y)
    }
  }, [])

  return (
    <CustomLayout ref={heartRef}>
      <Header
        label={label || '兴趣爱好'}
        icon={HeartOutlined}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="HEART_LIST"
          renameLabel={() => setIsEdit(true)}
        ></CtxMenu>
      </Header>
      <RichInput
        value={heartInfo}
        onChange={(val: string) => immerRichInfo(val, 'HEART_LIST')}
      ></RichInput>
    </CustomLayout>
  )
}

export default Heart
