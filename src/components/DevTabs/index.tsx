import styles from './index.module.scss'

type tabItemType = {
  label: string
  key: string
}

const DevTabs = ({
  activeTab,
  setActiveTab,
  options,
}: {
  activeTab: number
  setActiveTab: (val: number) => void
  options: tabItemType[]
}) => {
  return (
    <>
      <div className={styles['dev-tabs-header']}>
        {options.map((option, index) => {
          return (
            <div
              className={`${styles['dev-tab-item']} ${
                activeTab === index ? styles['dev-active-item'] : ''
              }`}
              key={option.key}
              onClick={() => setActiveTab(index)}
            >
              {option.label}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DevTabs
