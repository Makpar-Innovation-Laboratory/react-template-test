import React, { useState, useContext } from "react";
import { EditorState } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { Context } from '../../../App'
export default function MyEditor() {
  const context = useContext(Context)
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log('marking')
    context.handleSetMarkdown(createMarkup(convertedContent))
  }
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  //   const editor = React.useRef(null);
  //   function focusEditor() {
  //     editor.current.focus();
  //   }

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
    //   onClick={focusEditor}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
    </div>
  );
}

