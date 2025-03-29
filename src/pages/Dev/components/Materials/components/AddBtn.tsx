import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const AddBtn: React.FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <div className={styles['add-btn-box']} onClick={handleAdd}>
      <PlusOutlined />
      <span className="ml-4  text-sm">添加一项</span>
    </div>
  )
}

export default AddBtn
