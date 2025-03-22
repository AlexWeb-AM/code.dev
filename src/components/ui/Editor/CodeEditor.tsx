import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

export const CodeEditor: React.FC = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("myCustomTheme", {
        base: "vs-dark", // Наследуем базовую темную тему
        inherit: true,
        rules: [
          { token: "comment", foreground: "6A9955", fontStyle: "italic" }, // Зеленые комментарии
          { token: "keyword", foreground: "569CD6", fontStyle: "bold" }, // Синие ключевые слова
          { token: "string", foreground: "CE9178" }, // Оранжевые строки
          { token: "number", foreground: "B5CEA8" }, // Светло-зеленые числа
          { token: "variable", foreground: "9CDCFE" }, // Голубые переменные
          { token: "type", foreground: "4EC9B0" }, // Бирюзовые классы и интерфейсы
          { token: "function", foreground: "DCDCAA" }, // Желтые функции
          { token: "boolean", foreground: "569CD6" }, // Синий `true/false`
          { token: "operator", foreground: "C586C0" }, // Розовые операторы
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

  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      defaultValue="// Write Code ......"
      theme="myCustomTheme"
      options={{
        scrollbar: { vertical:'hidden', horizontal: "hidden" }, 
        overviewRulerLanes:0,
      }}
    />
  );
};
