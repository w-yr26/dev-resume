import { getLinkInfoAPI, postVerifyLinkAPI } from '@/apis/resume'
import { useEffect, useState } from 'react'
import Unauthorized from '../Unauthorized'
import { useShareStore, useUserStore } from '@/store'
import { Button, Input, Modal } from 'antd'
import DevModalFormItem from '@/components/DevModalFormItem'
import styles from '@/pages/Home/index.module.scss'

// 校验链接是否失效或者当前用户是否在目标列表的高阶组件
const InvalidHoc = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: string | null
}) => {
  const email = useUserStore((state) => state.info.email)
  const updatePermissions = useShareStore((state) => state.updatePermissions)
  const updateTarget = useShareStore((state) => state.updateTarget)
  // 链接是否失效
  const [isUnauthorization, setIsUnauthorization] = useState(false)
  // 用户是否在人员范畴内(默认是在人员范畴内的)
  const [isWithinRange, setIsWithinRange] = useState(true)
  const [pwd, setPwd] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 判断是否从分享页进入
  useEffect(() => {
    const getShareLinkInfo = async () => {
      if (token) {
        try {
          const { data } = await getLinkInfoAPI(token)
          if (data!.targets) {
            const idx = data?.targets.findIndex((i) => i.targetValue === email)
            setIsWithinRange(idx !== -1)
          }
          updateTarget(data!.targets)
          updatePermissions(JSON.parse(data!.permissions))
          if (data?.shareLink.password) setIsModalOpen(true)
        } catch (_) {
          // 当链接失效、链接过期、抵达最大访问次数时，都会走这里
          setIsUnauthorization(true)
        }
      }
    }
    getShareLinkInfo()
  }, [token])

  const validatePwd = async () => {
    await postVerifyLinkAPI({
      password: pwd,
      shareToken: token!,
    })
    setIsModalOpen(false)
  }

  return (
    <>
      {isUnauthorization || !isWithinRange ? (
        <Unauthorized type={isUnauthorization ? 'expired' : 'beyond'} />
      ) : (
        children
      )}

      <Modal
        styles={{
          mask: {
            backgroundColor: 'rgba(250, 250, 250, 0.9)',
          },
          content: {
            border: '1px solid #e4e4e7',
          },
        }}
        title="密码校验"
        closable={false}
        keyboard={false}
        maskClosable={false}
        footer={[
          <Button
            style={{
              width: '100%',
              height: '48px',
            }}
            key="create"
            onClick={validatePwd}
          >
            校验
          </Button>,
        ]}
        open={isModalOpen && !(isUnauthorization || !isWithinRange)}
      >
        <div className={styles['create-form-container']}>
          <DevModalFormItem
            title="标题"
            primary={
              <Input
                className={styles['form-input']}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            }
          />
        </div>
      </Modal>
    </>
  )
}

export default InvalidHoc
