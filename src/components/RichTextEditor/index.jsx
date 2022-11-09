import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './index.scss'

const RichTextEditor = ({ value, changeValue }) => {
  return <ReactQuill className="publish-quill" theme="snow" value={value} onChange={(val) => changeValue(val)} />
}

export default RichTextEditor