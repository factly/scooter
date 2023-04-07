import { Plugin } from "@tiptap/pm/state";
import {
  isColumnSelected,
  getCellsInRow,
  selectColumn,
} from "@factly/scooter-shared-utils";
import { DecorationSet, Decoration } from "@tiptap/pm/view";

import { mergeAttributes, Node } from "@tiptap/core";

export const TableHeadCell = Node.create({
  name: "th",
  // name: "tableHeader", // tiptap
  content: "paragraph+", //tiptap //"paragraph+", //prosemirror
  tableRole: "header_cell",
  isolating: true,
  parseHTML: [{ tag: "th" }],
  renderHTML({ node, HTMLAttributes }) {
    const attributes = node.attrs.alignment
      ? { style: `text-align: ${node.attrs.alignment}` }
      : {};
    return ["th", mergeAttributes(attributes, HTMLAttributes), 0];
  },
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      colspan: { default: 1 },
      rowspan: { default: 1 },
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

  // get name() {
  //   return "th";
  // },

  // get schema() {
  //   return {
  //     content: "paragraph+",
  //     tableRole: "header_cell",
  //     isolating: true,
  //     parseDOM: [{ tag: "th" }],
  //     toDOM(node) {
  //       return [
  //         "th",
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
  //     block: "th",
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
            const cells = getCellsInRow(0)(selection);

            if (cells) {
              cells.forEach(({ pos }, index) => {
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const colSelected = isColumnSelected(index)(selection);
                    let className = "grip-column";
                    if (colSelected) {
                      className += " selected";
                    }
                    if (index === 0) {
                      className += " first";
                    } else if (index === cells.length - 1) {
                      className += " last";
                    }
                    const grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", event => {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                      this.editor.view.dispatch(
                        selectColumn(
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
});
