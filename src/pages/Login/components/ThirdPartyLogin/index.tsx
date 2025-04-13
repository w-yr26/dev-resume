import styles from './index.module.scss'
import CustomBtn from '@/components/CustomBtn'

export const ThirdPartyLogin = () => {
  const handleGiteeLogin = async () => {}

  return (
    <div className={styles.container}>
      <p className={styles.text}>或者使用以下方式继续</p>
      <CustomBtn onClick={handleGiteeLogin} label="Gitee登录" />
    </div>
  )
}
