import styles from './index.module.scss'

type customBtnType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  onClick?: () => void
}

const CustomBtn = (props: customBtnType) => {
  const { label, onClick, disabled, type, ...reset } = props
  const handleClick = () => {
    if (disabled) return
    if (onClick) onClick()
  }
  return (
    <button type={type} className={styles['custom-btn-contaienr']} {...reset}>
      <div
        className={`${styles['main-box']} ${
          disabled ? styles['disabled-btn'] : ''
        }`}
        onClick={handleClick}
      >
        {label}
      </div>
    </button>
  )
}

export default CustomBtn
