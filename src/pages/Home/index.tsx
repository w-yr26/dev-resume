import styles from './index.module.scss'
// import './iconfont/iconfont.css'

// 引入icon图标
import { DownloadOutlined,FileTextOutlined,SettingOutlined,AppstoreOutlined,BarsOutlined,PlusOutlined } from '@ant-design/icons'
import { Avatar,Button } from "antd";


const Home = () => {
 return(
    <div className={styles['layout-container']}>
      {/* 左边栏 */}
      <div className={styles['left']}>
          {/* logo区域 */}
          <div className={styles['logoArea']}>
            <div className={styles['logoPhoto']}>
              <a href="#">logo存放</a>
            </div>
          </div>
          {/* 左边栏目导航区域 */}
          <div className={styles['leftNav']}>
            <ul>
              <li><a href="#" className={styles['active']}>
              <FileTextOutlined rotate={-20}/>&nbsp;&nbsp;
                简历</a></li>
              <li><a href="#">
              <SettingOutlined />&nbsp;&nbsp;
                设置</a></li>
            </ul>
          </div>
          {/* 左边账号栏目 */}
          <div className={styles['leftAccount']}>
            <a href="#" className={styles['topA']}>
            <div className={styles['top']}>
                <div className={styles['photo']}>
                  <Avatar size={24}/>
                </div>
                <div className={styles['account']}>
                  123456
                </div>
            </div>
            </a>
            <div className={styles['textArea']}>
              {/* <ul>
                <li>已获得 <a href="#">MIT 许可</a></li>
                <li>来自社区，服务社区。</li>
                <li><a href="#">Amruth Pillai</a> 的热心项目</li>
              </ul> */}
              <p>及时简历 v4.4.5</p>
            </div>
          </div>
          
      </div>

      <div className={styles['rightResume']}>
        {/* 头部 */}
        <div className={styles['top']}>
          <h1>简历</h1>
          <div>
            {/* active选中 */}
          <Button className={styles['buttonStyle']}><AppstoreOutlined />网格</Button>
          <Button className={styles['buttonStyle']}><BarsOutlined />列表</Button>
          </div>
        </div>
        
        {/* 底部 */}
        <tbody>
          <div className={styles['bottom']}>
            {/* 新建部分 */}
            <div className={styles['createNewResume']}>
              <a href="#" className={styles['createA']}>
                <div className={styles['createNewResume-top']}>
                  <PlusOutlined style={{fontSize:'60px'}}/>
                </div>

                <div className={styles['createNewResume-bottom']}>
                  <p>创建新简历</p>
                  <div>从头开始构建</div>
                </div>
              </a>
            </div> 

            {/* 导入部分 */}
            <div className={styles['importFiles']}>
              <a href="#" className={styles['createA']}>
                  <div className={styles['importResume-top']}>
                    <DownloadOutlined style={{fontSize:'60px'}}/>
                  </div>

                  <div className={styles['importResume-bottom']}>
                    <p>导入现有简历</p>
                    <div>LinkedIn、JSON简历等</div>
                  </div>
              </a>
            </div>


            {/* 简历模板部分 */}
            {/* 每增加一个简历就在后面追加 */}
            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>

            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>

            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>

            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>

            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
                  最后更新于 <span>time前</span>
                </div>
              </div>
            </div>

            <div className={styles['resumePart']}>
              <div className={styles['resumePart-bottom']}>
                <div className={styles['resumeName']}>
                  我的简历
                </div>
                <div className={styles['updateTime']}>
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

export default Home;

