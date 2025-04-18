import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { BgColorsOutlined } from '@ant-design/icons'
import styled from './index.module.scss'

const DownloadSetting = () => {
  return (
    <CustomLayout>
      <Header icon={BgColorsOutlined} label="导出"></Header>
      <div
        className={styled['down-load-box']}
        style={{
          marginBottom: '8px',
        }}
      >
        <div className={styled['icon-box']}>
          <BgColorsOutlined></BgColorsOutlined>
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
          <BgColorsOutlined></BgColorsOutlined>
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
