import { v4 as uuidv4 } from 'uuid'
import { useUserStore } from '@/store'
import styles from './index.module.scss'
// 引入icon图标
import Icon from '@ant-design/icons'
// import DownloadSVG from '@/assets/svg/download.svg?react'
import ListSVG from '@/assets/svg/list.svg?react'
import GridSVG from '@/assets/svg/grid.svg?react'
import AddSVG from '@/assets/svg/add.svg?react'
import RandomSVG from '@/assets/svg/random.svg?react'

import { Button, Input, message, Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import {
  delResumeAPI,
  getResumePageAPI,
  postResumeCreateAPI,
  putUpdateNameAPI,
} from '@/apis/resume'
import type { resumeItem } from '@/types/resume'
import CustomBtn from '@/components/CustomBtn'
import { useNavigate } from 'react-router-dom'
import WorkItem from '@/components/WorkItem'
import DevModalFormItem from '@/components/DevModalFormItem'
import { BASE_URL } from '@/utils/request'

const Home = () => {
  const navigate = useNavigate()
  const userId = useUserStore((state) => state.info.id)
  const token = useUserStore((state) => state.info.token)
  const [page] = useState(1)
  const [resumeList, setResumeList] = useState<resumeItem[]>([])
  const PAGE_SIZE = 10
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resumeTitle, setResumeTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [selectId, setSelectId] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/resume/templates/getAll/${userId}`, {
      headers: {
        Authorization: token,
        'X-Pre-Load': 'true',
        'X-Max-Count': String(sessionStorage.getItem('preload_count') || 0),
      },
    })
      .then((res) => {
        if (res.status === 204) {
          console.log('预加载成功，无需解析响应')
          sessionStorage.setItem(
            'preload_count',
            String((Number(sessionStorage.getItem('preload_count')) || 0) + 1)
          )
          return // 直接结束，不进入下一个 .then()
        }
        return res.json()
      })
      .then((_) => {}) // 当前页面只是作为预请求数据而存在，并不需要消费该数据
      .catch((_) => {
        console.log('fetch err')
      })
  }, [])

  // 获取列表数据
  const getResumeList = useCallback(async () => {
    const { data } = await getResumePageAPI(page, PAGE_SIZE, userId)
    setResumeList(data.records)
  }, [page, userId])

  useEffect(() => {
    getResumeList()
  }, [page])

  const handleCreateResume = async () => {
    if (!resumeTitle) return message.warning('请输入简历名称')
    if (selectId) {
      // 更新
      await putUpdateNameAPI({
        randomId: selectId,
        title: resumeTitle,
      })
    } else {
      // 创建
      await postResumeCreateAPI({
        randomId: uuidv4(),
        userId: userId,
        title: resumeTitle,
        slug,
        template_id: '1',
      })
    }

    await getResumeList()
    setIsModalOpen(false)
    setSelectId('')
    setResumeTitle('')
  }

  const produceRandomTitle = () => {
    const uuid = uuidv4()
    setResumeTitle(uuid)
    setSlug(uuid)
  }

  const handleOpen = (id: string) => {
    navigate(`/dev/${id}`)
  }

  const handleDel = async (id: string) => {
    await delResumeAPI(id)
    await getResumeList()
  }

  return (
    <>
      {/* 头部 */}
      <div className={styles['container-top']}>
        <h1>简历</h1>
        {/* <div>
          <Button
            icon={<Icon component={GridSVG} />}
            style={{
              marginRight: '8px',
            }}
          >
            网格
          </Button>
          <Button icon={<Icon component={ListSVG} />}>列表</Button>
        </div> */}
      </div>

      {/* 底部 */}
      <div className={styles['container-bottom']}>
        {/* 新建部分 */}
        <div
          className={styles['resume-item']}
          onClick={() => setIsModalOpen(true)}
        >
          <div className={styles['icon-box']}>
            <Icon component={AddSVG} />
          </div>

          <div className={styles['resume-bottom']}>
            <p className={styles['resume-name']}>创建新简历</p>
            <p className={styles['update-time']}>从头开始构建</p>
          </div>
        </div>

        {/* 导入部分 */}
        {/* <div className={styles['resume-item']}>
          <div className={styles['icon-box']}>
            <Icon component={DownloadSVG} className={styles['svg']} />
          </div>

          <div className={styles['resume-bottom']}>
            <p className={styles['resume-name']}>导入现有简历</p>
            <p className={styles['update-time']}>LinkedIn、JSON简历等</p>
          </div>
        </div> */}

        {/* 简历列表 */}
        {resumeList.length
          ? resumeList.map((item, index) => (
              <WorkItem
                key={item.randomId}
                workId={item.randomId}
                title={item.title}
                updateTime={item.updateTime}
                index={index}
                handleDel={handleDel}
                handleOpen={handleOpen}
                setSelectId={setSelectId}
                setIsModalOpen={setIsModalOpen}
                setWorkTitle={setResumeTitle}
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
            onClick={handleCreateResume}
          />,
        ]}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className={styles['create-form-container']}>
          <DevModalFormItem
            title="标题"
            primary={
              <Input
                className={styles['form-input']}
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            }
            sub={
              <div className={styles['sub-label']}>
                提示: 您可以根据职位来命名简历
              </div>
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

export default Home
