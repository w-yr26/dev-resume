import MdEditor from '@/components/MdEditor'
import { useState } from 'react'

const Md = () => {
  const [editorVal, setEditorVal] = useState('')
  const handleChange = (val: string) => {
    setEditorVal(val)
  }

  return <MdEditor value={editorVal} onChange={handleChange} />
}

export default Md
