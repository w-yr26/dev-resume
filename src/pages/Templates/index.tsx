import { delTemAPI, getTemplatesAPI } from '@/apis/template'
import Icon from '@ant-design/icons'
import AddSVG from '@/assets/svg/add.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'
import { useUserStore } from '@/store'
import { templateListType } from '@/types/ui'
import { useEffect, useState } from 'react'
import styles from '../Home/index.module.scss'
import { useNavigate } from 'react-router-dom'
import { ConfigProvider, Input, Modal, Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import CustomBtn from '@/components/CustomBtn'
import WorkItem from '@/components/WorkItem'

const Templates = () => {
  const navigate = useNavigate()
  const userId = useUserStore((state) => state.info.id)
  const [temList, setTemList] = useState<templateListType[]>([])

  const [slug, setSlug] = useState('')
  const [selectId, setSelectId] = useState('')
  const [temTitle, setTemTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getTemList = async (userId: string) => {
      const {
        data: { diyTemplateList, templateList },
      } = await getTemplatesAPI(userId)

      setTemList([...templateList, ...diyTemplateList])
    }
    getTemList(userId)
  }, [])

  const handleOpen = (id: string) => {
    navigate(`/design/${id}`)
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

  // 创建/更新
  const handleClick = () => {}

  return (
    <>
      <div className={styles['container-top']}>
        <h1>模板列表</h1>
      </div>
      <div className={styles['container-bottom']}>
        <div
          className={styles['resume-item']}
          onClick={() => navigate('/design')}
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
              // <div
              //   className={`${styles['resume-item']} ${styles['animation-item']}`}
              //   style={{
              //     animationDelay: `0.${index + 1}s`,
              //   }}
              //   key={tem.id}
              // >
              //   <div className={styles['resume-bottom']}>
              //     <p className={styles['resume-name']}>
              //       {tem.name || tem.templateName}
              //     </p>
              //     <p className={styles['update-time']}>
              //       最后更新于&nbsp;
              //       <span
              //         style={{
              //           color: '#333',
              //         }}
              //       >
              //         {tem.updateTime}
              //       </span>
              //       &nbsp;前
              //     </p>
              //   </div>
              // </div>
              <WorkItem
                key={tem.id}
                handleOpen={handleOpen}
                index={index}
                title={tem.name || tem.templateName || ''}
                workId={tem.id}
                setWorkTitle={setTemTitle}
                updateTime={tem.updateTime}
                setSelectId={setSelectId}
                setIsModalOpen={setIsModalOpen}
                handleDel={handleDel}
              />
            ))
          : null}
      </div>

      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: '#fafafa',
              footerBg: '#fafafa',
              headerBg: '#fafafa',
              boxShadow: 'none',
            },
          },
        }}
      >
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
          onCancel={() => setIsModalOpen(false)}
        >
          <div className={styles['create-form-container']}>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>标题</p>
              <div className={styles['body']}>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: '#18181b',
                        hoverBorderColor: '#18181b',
                        activeShadow: 'none',
                      },
                    },
                  }}
                >
                  <Input
                    className={styles['form-input']}
                    value={temTitle}
                    onChange={(e) => setTemTitle(e.target.value)}
                  />
                </ConfigProvider>
                <div
                  className={styles['random-box']}
                  onClick={produceRandomTitle}
                >
                  <Tooltip title="点击生成随机标题">
                    <Icon component={RandomSVG} />
                  </Tooltip>
                </div>
              </div>
              <div className={styles['sub-label']}>
                提示: 您可以根据职位来命名简历
              </div>
            </div>
            <div className={styles['create-form-item']}>
              <p className={styles['label']}>备注</p>
              <div className={styles['body']}>
                <ConfigProvider
                  theme={{
                    components: {
                      Input: {
                        activeBorderColor: '#18181b',
                        hoverBorderColor: '#18181b',
                        activeShadow: 'none',
                      },
                    },
                  }}
                >
                  <Input
                    className={styles['form-input']}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default Templates
