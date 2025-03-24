import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setCode } from "../../../slices/codeSlice";

export const CodeEditor: React.FC = () => {
  const monaco = useMonaco();
  const dispatch = useDispatch<AppDispatch>();
  const code = useSelector((state: RootState) => state.code.code);
  const language = useSelector((state: RootState) => state.code.language);

  console.log(language);

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        noImplicitAny: false,
        strict: false,
      });
      monaco.editor.defineTheme("myCustomTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "6A9955", fontStyle: "italic" },
          { token: "keyword", foreground: "569CD6", fontStyle: "bold" },
          { token: "string", foreground: "CE9178" },
          { token: "number", foreground: "B5CEA8" },
          { token: "variable", foreground: "9CDCFE" },
          { token: "type", foreground: "4EC9B0" },
          { token: "function", foreground: "DCDCAA" },
          { token: "boolean", foreground: "569CD6" },
          { token: "operator", foreground: "C586C0" },
        ],
        colors: {
          "editor.background": "#09090B",
          "editor.foreground": "#D4D4D4",
          "editor.lineHighlightBackground": "#FFFFFF0A",
          "editorCursor.foreground": "#ccc",
          "editorIndentGuide.background": "#444444",
          "editor.selectionBackground": "#264F78",
          "editor.selectionHighlightBackground": "#ADD6FF26",
          "editor.wordHighlightBackground": "#57575730",
          "editor.lineNumbers.foreground": "#858585",
          "editorGutter.background": "#09090B",
          "editorScrollbar.shadow": "#000000",
          "editorOverviewRuler.border": "#FFFFFF20",
        },
      });

      monaco.editor.setTheme("myCustomTheme");
    }
  }, [monaco]);

  const handleChange = (value: string | undefined) => {
    dispatch(setCode(value || ""));
  };

  return (
    <Editor
      height="100vh"
      language={language.toLowerCase()}
      value={code}
      theme="myCustomTheme"
      onChange={handleChange}
      options={{
        scrollbar: { vertical: "hidden", horizontal: "hidden" },
        overviewRulerLanes: 0,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 16,
      }}
    />
  );
};
