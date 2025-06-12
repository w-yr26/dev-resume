import styles from './index.module.scss'

type customBtnType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
}

const CustomBtn = (props: customBtnType) => {
  const {
    label,
    icon,
    onClick,
    disabled,
    type = 'button',
    style,
    ...reset
  } = props
  const handleClick = () => {
    if (disabled) return
    if (onClick) onClick()
  }
  return (
    <button
      type={type}
      className={styles['custom-btn-contaienr']}
      {...reset}
      style={style}
    >
      <div
        className={`${styles['main-box']} ${
          disabled ? styles['disabled-btn'] : ''
        }`}
        onClick={handleClick}
      >
        {icon ? (
          <span
            style={{
              marginRight: '8px',
            }}
          >
            {icon}
          </span>
        ) : null}
        <span>{label}</span>
      </div>
    </button>
  )
}

export default CustomBtn
