import Token from "markdown-it/lib/token";
import { NodeSpec } from "prosemirror-model";
import { Plugin } from "prosemirror-state";
import {
  isTableSelected,
  isRowSelected,
  getCellsInColumn,
  selectRow,
  selectTable,
} from "@factly/scooter-shared-utils";
import { DecorationSet, Decoration } from "prosemirror-view";

import {
  callOrReturn,
  getExtensionField,
  mergeAttributes,
  Node,
} from "@tiptap/core";
import { selectionCell, table } from "@tiptap/pm/tables";

export const TableCell = Node.create({
  // get name() {
  //   return "td";
  // },
  name: "td",
  // name: 'tableCell', // tiptap
  content: "paragraph+", //tiptap // "paragraph+" // prosemirror
  tableRole: "cell",
  isolating: true,
  parseHTML: [{ tag: "td" }],
  renderHTML({ node, HTMLAttributes }) {
    const attributes = node.attrs.alignment
      ? { style: `text-align: ${node.attrs.alignment}` }
      : {};
    return ["td", mergeAttributes(attributes, HTMLAttributes), 0];
  },
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      colspan: {
        default: 1,
      },
      rowspan: {
        default: 1,
      },
      class: {
        default: null,
        rendered: true,
      },
      colwidth: {
        default: null,
        parseHTML: element => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? [parseInt(colwidth, 10)] : null;

          return value;
        },
      },
      alignment: { default: null, rendered: true },
    };
  },
  // attrs: {
  //   colspan: { default: 1 },
  //   rowspan: { default: 1 },
  //   alignment: { default: null },
  // },

  // get schema() {
  //   return {
  //     content: "paragraph+",
  //     tableRole: "cell",
  //     isolating: true,
  //     parseDOM: [{ tag: "td" }],
  //     toDOM(node) {
  //       return [
  //         "td",
  //         node.attrs.alignment
  //           ? { style: `text-align: ${node.attrs.alignment}` }
  //           : {},
  //         0,
  //       ];
  //     },
  //     attrs: {
  //       colspan: { default: 1 },
  //       rowspan: { default: 1 },
  //       alignment: { default: null },
  //     },
  //   };
  // },

  // toMarkdown() {
  //   // see: renderTable
  // },

  // parseMarkdown() {
  //   return {
  //     block: "td",
  //     getAttrs: (tok) => ({ alignment: tok.info }),
  //   };
  // },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: state => {
            const { doc, selection } = state;
            const decorations = [];
            const cells = getCellsInColumn(0)(selection);

            if (cells) {
              cells.forEach(({ pos }, index) => {
                if (index === 0) {
                  decorations.push(
                    Decoration.widget(pos + 1, () => {
                      let className = "grip-table";
                      const selected = isTableSelected(selection);

                      if (selected) {
                        className += " selected";
                      }
                      const grip = document.createElement("a");
                      grip.className = className;
                      grip.addEventListener("mousedown", event => {
                        event.preventDefault();
                        event.stopImmediatePropagation();

                        this.editor.view.dispatch(selectTable(state.tr));
                      });
                      // grip.addEventListener("click", (event) => {
                      //   event.preventDefault();
                      //   event.stopImmediatePropagation();

                      //   this.editor.view.dispatch(selectTable(state.tr));
                      // });
                      return grip;
                    })
                  );
                }
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const rowSelected = isRowSelected(index)(selection);

                    let className = "grip-row";
                    if (rowSelected) {
                      className += " selected";
                    }

                    if (index === 0) {
                      className += " first";
                    }
                    if (index === cells.length - 1) {
                      className += " last";
                    }

                    const grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", event => {
                      event.preventDefault();

                      event.stopImmediatePropagation();
                      this.editor.view.dispatch(
                        selectRow(
                          index,
                          event.metaKey || event.shiftKey
                        )(state.tr)
                      );
                    });
                    grip.addEventListener("click", event => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      this.editor.view.dispatch(
                        selectRow(
                          index,
                          event.metaKey || event.shiftKey
                        )(state.tr)
                      );
                    });
                    return grip;
                  })
                );
              });
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage,
    };

    return {
      tableRole: callOrReturn(
        getExtensionField(extension, "tableRole", context)
      ),
    };
  },
});
