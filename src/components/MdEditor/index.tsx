import styles from './index.module.scss'
import { buildAST } from './utils/ast'
import { renderAST } from './utils/render'
import { tokenizer } from './utils/tokens'

type mdEditorType = {
  value: string
  onChange: (val: string) => void
}

const MdEditor = ({ value, onChange }: mdEditorType) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const originVal = e.target.value
    console.log(originVal)
    const tokens = tokenizer.tokenize(originVal)
    // console.log('tokens', tokens)
    const ast = buildAST(tokens)
    // console.log('ast', ast)
    const mdStr = renderAST(ast)
    console.log('mdStr', mdStr)

    // md内容以行为单位进行划分(后续对于行内元素，比如斜体、粗体，可以考虑使用正则)
    // console.log(originVal.split('\n'))

    // 这里需要经过一系列转换，换成md
    onChange(originVal)
  }
  return (
    <textarea
      className={styles['custom-textarea']}
      value={value}
      onChange={handleChange}
    />
  )
}

export default MdEditor
