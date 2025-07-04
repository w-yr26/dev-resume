import { Button, Modal } from 'antd'
import styles from './index.module.scss'
import Icon from '@ant-design/icons'
import PDFSVG from '@/assets/svg/dev/pdf.svg?react'
import downloadSVG from '@/assets/svg/download.svg?react'
import DevTabs from '@/components/DevTabs'

const tabsOptions = [
  {
    key: 'server',
    label: '服务端打印',
  },
  {
    key: 'client',
    label: '浏览器打印',
  },
]

const PDFModal = ({
  activeTab,
  isModalOpen,
  setIsModalOpen,
  setActiveTab,
  handleExportPDF,
}: {
  activeTab: number
  isModalOpen: boolean
  setIsModalOpen: (val: boolean) => void
  setActiveTab: (idx: number) => void
  handleExportPDF: () => Promise<void>
}) => {
  return (
    <>
      <Modal
        styles={{
          mask: {
            backgroundColor: 'rgba(250, 250, 250, 0.9)',
          },
          content: {
            border: '1px solid #e4e4e7',
          },
        }}
        width="45%"
        title={
          <div>
            <Icon component={PDFSVG} />
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              导出PDF设置
            </span>
          </div>
        }
        closable={true}
        keyboard={true}
        maskClosable={true}
        footer={[
          <Button
            size="middle"
            key={'download'}
            icon={<Icon component={downloadSVG} />}
            onClick={handleExportPDF}
          >{`使用 ${activeTab === 0 ? '服务端' : '浏览器'} 导出`}</Button>,
        ]}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <DevTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={tabsOptions}
        />
        {activeTab === 0 ? (
          <div className={styles['info-box']}>
            <div className={styles['advantages-box']}>
              <p>优点</p>
              <ul>
                <li>样式一致性好</li>
                <li>不依赖客户端</li>
                <li>支持高级功能</li>
                <li>专业级输出</li>
              </ul>
            </div>
            <div className={styles['dis-advantages-box']}>
              <p>缺点</p>
              <ul>
                <li>服务端资源消耗</li>
                <li>可能有延迟</li>
                <li>依赖服务端负载和网络情况</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles['info-box']}>
            <div className={styles['advantages-box']}>
              <p>优点</p>
              <ul>
                <li>生成速度较快</li>
                <li>可自主选择导出配置</li>
                <li>导出前可预览效果</li>
                <li>无需额外配置</li>
              </ul>
            </div>
            <div className={styles['dis-advantages-box']}>
              <p>缺点</p>
              <ul>
                <li>文件体积大</li>
                <li>非全自动化，需自主进行交互</li>
                <li>部分浏览器存在兼容性</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default PDFModal
