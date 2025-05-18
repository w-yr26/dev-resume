import styles from './index.module.scss'

const ModuleLayout = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div className={`${styles['custom-setting-box']}`}>
      <div className={styles['custom-title']}>{title}</div>
      {children}
    </div>
  )
}

export default ModuleLayout
