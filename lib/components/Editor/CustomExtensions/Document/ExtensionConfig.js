import Document from "@tiptap/extension-document";
import { Plugin, PluginKey } from "prosemirror-state";

export default Document.extend({
  content: "root",

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleClick(view, pos) {
            const { state } = view;
            const lastNodeInDoc = state.doc.lastChild;
            const nodeBeforeClick = state.doc.resolve(pos).nodeBefore;

            if (lastNodeInDoc && nodeBeforeClick) {
              const isNodesEqual = lastNodeInDoc.eq(nodeBeforeClick);
              const isInlineNode = lastNodeInDoc.isInline;
              const isTextContentNode = ["paragraph", "text"].includes(
                lastNodeInDoc.type.name
              );

              if (isNodesEqual && !isInlineNode && !isTextContentNode) {
                editor.commands.insertContentAt(pos, {
                  type: "paragraph",
                  content: "",
                });
              }
            }
          },
        },
      }),
    ];
  },
});
