import { useState, useEffect, useRef } from "react";
import { EditorState, Modifier, convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RteWrapper } from "./styled";
const Editor = dynamic(
  // eslint-disable-next-line import/dynamic-import-chunkname
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const HANDLED = "handled";

const RTE = ({ savedContent, passContentToParent }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  useEffect(() => {
    const contentState = stateFromHTML(savedContent);
    handleEditorChange(EditorState.createWithContent(contentState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedContent]);

  //this function fixes when making new lines
  const handleBeforeInput = (chars, editorState) => {
    const currentContentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    handleEditorChange(
      EditorState.push(
        editorState,
        Modifier.replaceText(currentContentState, selectionState, chars)
      )
    );

    return HANDLED;
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
    passContentToParent(draftToHtml(currentContentAsHTML));
    // setConvertedContent(draftToHtml(currentContentAsHTML));
  };

  // const createMarkup = (html) => {
  //   return {
  //     __html: DOMPurify.sanitize(html),
  //   };
  // };

  return (
    <RteWrapper>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        handleBeforeInput={handleBeforeInput}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        stripPastedStyles={true}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "list",
            "textAlign",
            "link",
            "emoji",
            "image",
            "remove",
            "history",
          ],
        }}
      />
      {/* <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div> */}
    </RteWrapper>
  );
};

export default RTE;
