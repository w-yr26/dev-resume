import styles from './index.module.scss'

const WelcomePage = ({
  left,
  right,
}: {
  left?: React.ReactElement
  right?: React.ReactElement
}) => {
  return (
    <>
      {left ?? null}
      <div className={styles['illustrate-container']}>
        <p className={styles['slogan']}>5分钟生成专业简历，轻松拿下面试机会</p>
        <p className={styles['subtitle']}>
          选择简历模板 | AI 内容优化 | 一键导出 PDF
        </p>
        <div className={styles['background-circles']}>
          <div className={styles['circle1']}></div>
          <div className={styles['circle2']}></div>
          <div className={styles['circle3']}></div>
        </div>
      </div>
      {right ?? null}
    </>
  )
}

export default WelcomePage
