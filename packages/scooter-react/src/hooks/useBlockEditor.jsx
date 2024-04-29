import { useEditor } from "@tiptap/react";

export const useBlockEditor = ({
  extensions,
  initialValue,
  autoFocus,
  editorProps,
  onBlur,
  onFocus,
}) => {
  const editor = useEditor({
    extensions,
    content: initialValue,
    injectCSS: false,
    autofocus: autoFocus && "end",
    editorProps,
    parseOptions: {
      preserveWhitespace: true,
    },
    onUpdate: ({ editor }) => {
      // return onChange({
      //   html: editor.getHTML(),
      //   json: editor.getJSON(),
      //   text: editor.getText(),
      // });
    },
    onTransaction({ editor, transaction }) {
      // const a = checkForTagoreNodes(editor);
      // setIsTagoreNodePresent(a);
      // Transaction occurred.
    },
    onFocus,
    onBlur,
  });

  window.editor = editor;

  return editor;
};
