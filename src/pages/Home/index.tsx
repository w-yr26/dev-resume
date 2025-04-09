import styles from './index.module.scss'
// import './iconfont/iconfont.css'

// 引入icon图标
import {
  DownloadOutlined,
  FileTextOutlined,
  SettingOutlined,
  AppstoreOutlined,
  BarsOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Avatar, Button } from 'antd'

const Home = () => {
  return (
    <div className={styles['layout-container']}>
      {/* 左边栏 */}
      <div className={styles['left-container']}>
        {/* logo区域 */}
        <div className={styles['logo-area']}>
          <div className={styles['logo-photo']}>
            <a href="#">logo存放</a>
          </div>
        </div>

        {/* 左边栏目导航区域 */}
        <div className={styles['left-nav']}>
          <ul>
            <li>
              <a href="#" className={styles['active']}>
                <FileTextOutlined rotate={-20} />
                &nbsp;&nbsp; 简历
              </a>
            </li>
            <li>
              <a href="#">
                <SettingOutlined />
                &nbsp;&nbsp; 设置
              </a>
            </li>
          </ul>
        </div>

        {/* 左边账号栏目 */}
        <div className={styles['left-account']}>
          <a href="#" className={styles['top-alink']}>
            <div className={styles['top']}>
              <div className={styles['photo']}>
                <Avatar size={24} />
              </div>
              <div className={styles['account']}>123456</div>
            </div>
          </a>
          <div className={styles['text-area']}>
            {/* <ul>
                <li>已获得 <a href="#">MIT 许可</a></li>
                <li>来自社区，服务社区。</li>
                <li><a href="#">Amruth Pillai</a> 的热心项目</li>
              </ul> */}
            <p>及时简历 v4.4.5</p>
          </div>
        </div>
      </div>

      {/* 右边简历栏目部分 */}
      <div className={styles['right-container']}>
        {/* 头部 */}
        <div className={styles['top']}>
          <h1>简历</h1>
          <div>
            {/* active选中 */}
            <Button className={styles['button-style']}>
              <AppstoreOutlined />
              网格
            </Button>
            <Button className={styles['button-style']}>
              <BarsOutlined />
              列表
            </Button>
          </div>
        </div>

        {/* 底部 */}
        <tbody>
          <div className={styles['bottom']}>
            {/* 新建部分 */}
            <div className={styles['create-new-resume']}>
              <a href="#" className={styles['createA']}>
                <div className={styles['create-new-resume-top']}>
                  <PlusOutlined style={{ fontSize: '60px' }} />
                </div>

                <div className={styles['create-new-resume-bottom']}>
                  <p>创建新简历</p>
                  <div>从头开始构建</div>
                </div>
              </a>
            </div>

            {/* 导入部分 */}
            <div className={styles['import-files']}>
              <a href="#" className={styles['createA']}>
                <div className={styles['import-resume-top']}>
                  <DownloadOutlined style={{ fontSize: '60px' }} />
                </div>

                <div className={styles['import-resume-bottom']}>
                  <p>导入现有简历</p>
                  <div>LinkedIn、JSON简历等</div>
                </div>
              </a>
            </div>

            {/* 简历模板部分 */}
            {/* 每增加一个简历就在后面追加 */}
            <div className={styles['resume-part']}>
              <div className={styles['resume-part-bottom']}>
                <div className={styles['resume-name']}>我的简历</div>
                <div className={styles['update-time']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>
            <div className={styles['resume-part']}>
              <div className={styles['resume-part-bottom']}>
                <div className={styles['resume-name']}>我的简历</div>
                <div className={styles['update-time']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>
            <div className={styles['resume-part']}>
              <div className={styles['resume-part-bottom']}>
                <div className={styles['resume-name']}>我的简历</div>
                <div className={styles['update-time']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>
          </div>
        </tbody>
      </div>
    </div>
  )
}

export default Home
