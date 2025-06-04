import {
  delTemAPI,
  getTemplatesAPI,
  putDiyTemplatesNameAPI,
} from '@/apis/template'
import Icon from '@ant-design/icons'
import AddSVG from '@/assets/svg/add.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'
import { useUserStore } from '@/store'
import { templateListType } from '@/types/ui'
import { useEffect, useState } from 'react'
import styles from '../Home/index.module.scss'
import { useNavigate } from 'react-router-dom'
import { Input, Modal, Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import CustomBtn from '@/components/CustomBtn'
import WorkItem from '@/components/WorkItem'
import DevModalFormItem from '@/components/DevModalFormItem'

const Templates = () => {
  const navigate = useNavigate()
  const userId = useUserStore((state) => state.info.id)
  const [temList, setTemList] = useState<templateListType[]>([])

  const [slug, setSlug] = useState('')
  const [selectId, setSelectId] = useState('')
  const [temTitle, setTemTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 获取模板列表
  const getTemList = async (userId: string) => {
    const {
      data: { diyTemplateList },
    } = await getTemplatesAPI(userId)

    setTemList(diyTemplateList)
  }

  useEffect(() => {
    getTemList(userId)
  }, [])

  const handleOpen = (id: string) => {
    navigate(`/design?temId=${id}`)
  }

  const produceRandomTitle = () => {
    const uuid = uuidv4()
    setTemTitle(uuid)
    setSlug(uuid)
  }

  // 删除
  const handleDel = async (id: string) => {
    await delTemAPI(id)
    setTemList(temList.filter((i) => i.id !== id))
  }

  const resetState = () => {
    setTemTitle('')
    setIsModalOpen(false)
  }

  // 创建/更新
  const handleClick = async () => {
    if (selectId) {
      await putDiyTemplatesNameAPI({
        id: selectId,
        newName: temTitle,
      })
    } else {
      // 创建
      navigate('/design')
    }
    await getTemList(userId)
    resetState()
  }

  return (
    <>
      <div className={styles['container-top']}>
        <h1>模板列表</h1>
      </div>
      <div className={styles['container-bottom']}>
        <div
          className={styles['resume-item']}
          onClick={() => setIsModalOpen(true)}
        >
          <div className={styles['icon-box']}>
            <Icon component={AddSVG} />
          </div>
          <div className={styles['resume-bottom']}>
            <p className={styles['resume-name']}>创建新模板</p>
            <p className={styles['update-time']}>从头开始构建</p>
          </div>
        </div>
        {temList.length
          ? temList.map((tem, index) => (
              <WorkItem
                key={tem.id}
                handleOpen={handleOpen}
                index={index}
                title={tem.name || tem.templateName || ''}
                workId={tem.id}
                updateTime={tem.updateTime}
                snapshot={tem.fastPhoto}
                setWorkTitle={setTemTitle}
                setSelectId={setSelectId}
                setIsModalOpen={setIsModalOpen}
                handleDel={handleDel}
              />
            ))
          : null}
      </div>
      <Modal
        styles={{
          mask: {
            backgroundColor: 'rgba(250, 250, 250, 0.9)',
          },
          content: {
            border: '1px solid #e4e4e7',
          },
        }}
        title={
          <>
            <Icon component={AddSVG} />
            <span style={{ marginLeft: '8px' }}>
              {selectId ? '编辑条目' : '创建新条目'}
            </span>
          </>
        }
        footer={[
          <CustomBtn
            key="create"
            label={selectId ? '更新' : '创建'}
            style={{
              width: '80px',
            }}
            onClick={handleClick}
          />,
        ]}
        open={isModalOpen}
        onCancel={resetState}
      >
        <div className={styles['create-form-container']}>
          <DevModalFormItem
            title="标题"
            primary={
              <Input
                className={styles['form-input']}
                value={temTitle}
                onChange={(e) => setTemTitle(e.target.value)}
              />
            }
            icon={
              <Tooltip title="点击生成随机标题">
                <Icon component={RandomSVG} />
              </Tooltip>
            }
            handleRandom={produceRandomTitle}
          />
          <DevModalFormItem
            title="备注"
            primary={
              <Input
                className={styles['form-input']}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            }
          />
        </div>
      </Modal>
    </>
  )
}

export default Templates
