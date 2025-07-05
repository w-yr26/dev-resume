import styles from './index.module.scss'
type mdEditorType = {
  value?: string
  onChange?: (val: string) => void
  onBlur?: (val: string) => void
}

const MdEditor = ({ value, onChange, onBlur }: mdEditorType) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const originVal = e.target.value
    // md内容以行为单位进行划分(后续对于行内元素，比如斜体、粗体，可以考虑使用正则)
    // 此处获取的文本内容格式还是String，但是在<Render />的时候，就需要转换为对应的md格式
    if (onChange) onChange(originVal)
  }

  const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const originVal = e.target.value
    // md内容以行为单位进行划分(后续对于行内元素，比如斜体、粗体，可以考虑使用正则)
    // 此处获取的文本内容格式还是String，但是在<Render />的时候，就需要转换为对应的md格式
    if (onBlur) onBlur(originVal)
  }

  return (
    <textarea
      className={styles['custom-textarea']}
      placeholder="支持输入markdown语法,行内代码、加粗、有/无序列表..."
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}

export default MdEditor
