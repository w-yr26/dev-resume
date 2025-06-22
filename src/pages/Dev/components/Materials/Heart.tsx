import CustomLayout from '@/components/CustomLayout/index'
import Header from '@/components/Header/index'
import Icon from '@ant-design/icons'
import HeartSVG from '@/assets/svg/dev/heart.svg?react'
import { useDevStore, useGlobalStore, useUserStore } from '@/store'
import CtxMenu from './components/CtxMenu'
import { useChangeLabel } from '@/hooks/useChangeLabel'
import { useEffect, useRef } from 'react'
import MdEditor from '@/components/MdEditor'
import { postModuleInfoAPI } from '@/apis/resume'

const Heart = () => {
  const resumeId = useDevStore((state) => state.resumeId)
  const userId = useUserStore((state) => state.info.id)
  const {
    info: [heartInfo],
    label,
    visible,
  } = useDevStore((state) => state.devSchema.dataSource.HEART_LIST)
  const immerRichInfo = useDevStore((state) => state.immerRichInfo)
  const setPosition = useGlobalStore((state) => state.setPosition)
  const { handleChange, isEdit, setIsEdit } = useChangeLabel('HEART_LIST')
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
        svg={<Icon component={HeartSVG} />}
        isEdit={isEdit}
        handleChange={handleChange}
        handleBlur={() => setIsEdit(false)}
      >
        <CtxMenu
          currentKey="HEART_LIST"
          visible={visible}
          renameLabel={() => setIsEdit(true)}
        />
      </Header>
      <MdEditor
        value={heartInfo?.interest}
        onChange={(val: string) => immerRichInfo(val, 'HEART_LIST')}
        onBlur={async (val: string) => {
          await postModuleInfoAPI({
            content: {
              info: val,
              // id: heartInfo.id === '-1' ? undefined : heartInfo.id,
            },
            resumeId,
            type: 'HEART_LIST',
            userId,
          })
        }}
      />
    </CustomLayout>
  )
}

export default Heart
