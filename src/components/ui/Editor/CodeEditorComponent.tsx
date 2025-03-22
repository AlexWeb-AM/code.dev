import { CodeEditor } from "./CodeEditor"
import { EditorHeader } from "./EditorHeader"
export const CodeEditorComponent = () => {


  return (
    <div className="h-screen border-x border-neutral-500 w-1/2 bg-[#09090B]">
        <EditorHeader />
        <CodeEditor />
    </div>
  )
}
