import { mergeAttributes, Node, posToDOMRect } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";
import axios from "axios";
import { TextSelection } from "prosemirror-state";

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
      "Mod-/": () => {
        return this.editor.commands.setTagoreContent();
      },
    };
  },
  addCommands() {
    return {
      setTagoreContent: options => props => {
        const { state } = props;
        const { from, to } = state.selection;

        const text = state.doc.textBetween(from, to, " ");

        const nodePos = state.selection.$to.nodeAfter
          ? state.selection.$to.nodeAfter.nodeSize + to
          : to;

        props.commands.insertContentAt(nodePos, {
          type: "tagore",
          attrs: { content: text, type: "float", from, to },
        });

        return true;
      },
      setTagoreComponent: options => props => {
        const { state } = props;

        // props.view.state.selection
        // const node = props.editor.state.schema.nodes.paragraph.create(
        //   { content: "replaced content" }
        // );
        // console.log({ node })
        const { from, to } = props.view.state.selection;
        // props.editor.chain().focus().insertContentAt({
        //   from: selection.from,
        //   to: selection.to
        // }, "").insertContentAt(selection.from, 'Replaced content').run();
        // create tagore node with content

        props.editor.chain().focus().insertContent("hello").run();
        //.setSelection(new TextSelection(from, to))
        //  .insertContent([
        //   {
        //     type: this.name,
        //     attrs: { content: options.content, type: options.type, from, to }
        //   },
        // ]);
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
