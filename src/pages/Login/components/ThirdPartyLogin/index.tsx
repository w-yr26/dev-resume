import { Button } from 'antd';
import styles from './index.module.scss';


export const ThirdPartyLogin = () => {

  const handleGiteeLogin = async () => {
    
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>或者使用以下方式继续</p>
      <Button 
        type="primary" 
        className={styles.button}
        icon={<i className="fab fa-gitee" />}
        onClick={handleGiteeLogin}
      >
        Gitee登录
      </Button>
    </div>
  );
};