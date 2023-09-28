import { mergeAttributes, Node, posToDOMRect } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";

const deleteTagoreNodes = e => {
  const { state } = e.contentComponent;

  state?.renderers &&
    Object.values(state.renderers)
      ?.filter(({ props }) => props?.node?.type.name == "tagore")
      .forEach(({ props }) => props?.deleteNode());
};
export const TagoreCommandsExtension = Node.create({
  name: "tagore",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      content: {
        default: null,
        rendered: false,
      },
      type: {
        default: "block",
        rendered: false,
      },
      from: {
        default: null,
        rendered: false,
      },
      to: {
        default: null,
        rendered: false,
      },
    };
  },
  addKeyboardShortcuts() {
    return {
      "Space": () => {
        if (this.editor.view.state.selection.$head.parent.textContent==='')  return this.editor.commands.setTagoreContent();
      },
    };
  },
  addCommands() {
    return {
      setTagoreContent: options => props => {
        const { state, editor } = props;

        const { from, to } = state.selection;

        const text = state.doc.textBetween(from, to, " ");

        const nodePos = state.selection.$to.nodeAfter
          ? state.selection.$to.nodeAfter.nodeSize + to
          : to;

        props.commands.insertContentAt(nodePos, {
          type: "tagore",
          attrs: {
            content: text,
            type: "float",
            from,
            to,
          },
        });

        //   deleteTagoreNodes(editor)

        return true;
      },
    };
  },
  addOptions() {
    return {
      apiUrl: "http://localhost:8080",
      userId: "20",
      // system prompt
      content: null,
      menuItems: {},
      fetcher: null,
      sse: null,
      stream: false,
    };
  },

  parseHTML() {
    return [
      {
        tag: "tagore-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["tagore-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

export default TagoreCommandsExtension;
