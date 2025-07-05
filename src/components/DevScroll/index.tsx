import styles from './index.module.scss'

const DevScroll = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles['dev-scroll-container']}>{children}</div>
}

export default DevScroll
