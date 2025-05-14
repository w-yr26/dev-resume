import styles from './index.module.scss'

const CustomRaw = ({
  children,
  label,
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <div className={styles['custom-raw']}>
      <div className={styles['raw-left']}>{label}</div>
      <div className={styles['raw-right']}>{children}</div>
    </div>
  )
}

export default CustomRaw
