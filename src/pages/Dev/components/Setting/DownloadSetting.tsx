import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import Icon from '@ant-design/icons'
import OutputSVG from '@/assets/svg/dev/output.svg?react'
import PDFSVG from '@/assets/svg/dev/pdf.svg?react'
import JsonSVG from '@/assets/svg/dev/json.svg?react'
import styled from './index.module.scss'
import { useEffect, useRef } from 'react'
import { useGlobalStore } from '@/store'

const DownloadSetting = () => {
  const outputRef = useRef<HTMLDivElement>(null)
  const setPosition = useGlobalStore((state) => state.setPosition)
  useEffect(() => {
    if (outputRef.current) {
      const { y } = outputRef.current.getBoundingClientRect()
      setPosition('output', y)
    }
  }, [])
  return (
    <CustomLayout ref={outputRef}>
      <Header label="导出" svg={<Icon component={OutputSVG} />} />
      <div
        className={styled['down-load-box']}
        style={{
          marginBottom: '8px',
        }}
      >
        <div className={styled['icon-box']}>
          <Icon component={JsonSVG} />
        </div>
        <div className={styled['content-box']}>
          <div className={styled['title']}>JSON</div>
          <div className={styled['subtitle']}>
            下载简历的快照数据，该文件可用于您以后导入简历，甚至可以与他人在本网站共享
          </div>
        </div>
      </div>
      <div className={styled['down-load-box']}>
        <div className={styled['icon-box']}>
          <Icon component={PDFSVG} />
        </div>
        <div className={styled['content-box']}>
          <div className={styled['title']}>PDF</div>
          <div className={styled['subtitle']}>
            下载您的PDF版本建立，该文件可用于打印简历、发送给招聘人员或上传到招聘网站
          </div>
        </div>
      </div>
    </CustomLayout>
  )
}

export default DownloadSetting
