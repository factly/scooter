import { Plugin, TextSelection } from "@tiptap/pm/state";
import {
  addColumnAfter,
  addColumnBefore,
  addRowBefore,
  addRowAfter,
  deleteColumn,
  deleteRow,
  deleteTable,
  goToNextCell,
  isInTable,
  tableEditing,
  toggleHeaderCell,
  toggleHeader,
  CellSelection,
  mergeCells,
  splitCell,
  setCellAttr,
  columnResizing,
} from "@tiptap/pm/tables";

// import { isInTable } from "@tiptap/prosemirror-tables";
import {
  addRowAt,
  //  createTable,
  getCellsInColumn,
  moveRow,
  setTextSelection,
  getRowIndexFromText,
} from "@factly/scooter-shared-utils";

import { Decoration, DecorationSet } from "@tiptap/pm/view";
import tablesRule from "./tableRules";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { mergeAttributes, Node } from "@tiptap/core";
import "./scooter-table.scss";
import { createTable } from "./createTable";
import { deleteTableWhenAllCellsSelected } from "./deleteTableWhenAllCellsSelected";
import { TableView } from "./TableView";

export const Table = Node.create({
  name: "table",
  content: "tr+",
  tableRole: "table",
  isolating: true,
  group: "block",
  selectable: true,
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: true,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: TableView,
      lastColumnResizable: true,
      allowTableNodeSelection: false,
    };
  },
  addAttributes() {
    return {
      class: {
        default: null,
        rendered: true,
      },
    };
  },
  parseHTML: [{ tag: "table" }],
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "scrollable-wrapper table-wrapper" },
      [
        "div",
        { class: "scrollable" },
        [
          "table",
          mergeAttributes({ class: "rme-table" }, HTMLAttributes),
          ["tbody", 0],
        ],
      ],
    ];
  },
  addCommands() {
    return {
      createTable:
        ({
          rowsCount,
          colsCount,
          withHeaderRow,
          // TODO: fix add withHeader, cellContent, options as well to createTable function
        }) =>
        ({ state, dispatch, editor }) => {
          const offset = state.tr.selection.anchor + 1;
          const nodes = createTable(state, rowsCount, colsCount, withHeaderRow);
          const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
          const resolvedPos = tr.doc.resolve(offset);
          tr.setSelection(TextSelection.near(resolvedPos));
          dispatch(tr);
          return true;
        },
      setColumnAttr:
        ({ index, alignment }) =>
        ({ state, dispatch }) => {
          const cells = getCellsInColumn(index)(state.selection) || [];
          let transaction = state.tr;
          cells.forEach(({ pos }) => {
            transaction = transaction.setNodeMarkup(pos, undefined, {
              alignment,
            });
          });
          dispatch(transaction);
          return true;
        },
      //  addColumnBefore: () => addColumnBefore,
      //  addColumnAfter: () => addColumnAfter,
      // deleteColumn: () => deleteColumn,
      // addRowAfter: ({ index }) => (
      //   state,
      //   dispatch
      // ) => {
      //   if (index === 0) {
      //     // A little hack to avoid cloning the heading row by cloning the row
      //     // beneath and then moving it to the right index.
      //     const tr = addRowAt(index + 2, true)(state.tr);
      //     dispatch(moveRow(index + 2, index + 1)(tr));
      //   } else {
      //     dispatch(addRowAt(index + 1, true)(state.tr));
      //   }
      //   return true;
      // },
      //  deleteRow: () => deleteRow,
      //  deleteTable: () => deleteTable,
      // toggleHeaderColumn: () => toggleHeaderColumn,
      //  toggleHeaderRow: () => toggleHeaderRow,
      //  toggleHeaderCell: () => toggleHeaderCell,
      addColumnBefore:
        () =>
        ({ state, dispatch }) => {
          return addColumnBefore(state, dispatch);
        },
      addColumnAfter:
        () =>
        ({ state, dispatch }) => {
          return addColumnAfter(state, dispatch);
        },
      deleteColumn:
        () =>
        ({ state, dispatch }) => {
          return deleteColumn(state, dispatch);
        },
      addRowBefore:
        () =>
        ({ state, dispatch }) => {
          return addRowBefore(state, dispatch);
        },
      addRowAfter:
        () =>
        ({ state, dispatch }) => {
          return addRowAfter(state, dispatch);
        },
      deleteRow:
        () =>
        ({ state, dispatch }) => {
          return deleteRow(state, dispatch);
        },
      deleteTable:
        () =>
        ({ state, dispatch }) => {
          return deleteTable(state, dispatch);
        },
      mergeCells:
        () =>
        ({ state, dispatch }) => {
          return mergeCells(state, dispatch);
        },
      splitCell:
        () =>
        ({ state, dispatch }) => {
          return splitCell(state, dispatch);
        },
      toggleHeaderColumn:
        () =>
        ({ state, dispatch }) => {
          return toggleHeader("column")(state, dispatch);
        },
      toggleHeaderRow:
        () =>
        ({ state, dispatch }) => {
          return toggleHeader("row")(state, dispatch);
        },
      toggleHeaderCell:
        () =>
        ({ state, dispatch }) => {
          return toggleHeaderCell(state, dispatch);
        },
      mergeOrSplit:
        () =>
        ({ state, dispatch }) => {
          if (mergeCells(state, dispatch)) {
            return true;
          }

          return splitCell(state, dispatch);
        },
      setCellAttribute:
        (name, value) =>
        ({ state, dispatch }) => {
          return setCellAttr(name, value)(state, dispatch);
        },
      goToNextCell:
        () =>
        ({ state, dispatch }) => {
          return goToNextCell(1)(state, dispatch);
        },
      goToPreviousCell:
        () =>
        ({ state, dispatch }) => {
          return goToNextCell(-1)(state, dispatch);
        },
      // fixTables:
      //   () => ({ state, dispatch }) => {
      //     if (dispatch) {
      //       fixTables(state)
      //     }

      //     return true
      //   },
      setCellSelection:
        position =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            const selection = CellSelection.create(
              tr.doc,
              position.anchorCell,
              position.headCell
            );

            tr.setSelection(selection);
          }

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.goToNextCell(),
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      "Cmd-Enter": () => {
        const state = this.editor.view.state;
        const dispatch = this.editor.view.dispatch;

        if (!isInTable(state)) {
          return false;
        }
        const index = getRowIndexFromText(state.selection);

        if (index === 0) {
          this.editor.commands.addRowAfter();

          // TODO: fix text selection after inserting a row

          // const cells = getCellsInColumn(0)(state.selection);

          // if (!cells) {
          //   return false;
          // }

          // const tr = addRowAt(index + 1, true)(state.tr);

          // dispatch(
          //   setTextSelection(cells[1].pos)(moveRow(index + 2, index + 1)(tr))
          // );
        } else {
          dispatch(addRowAt(index + 1, true)(state.tr));
        }
        return true;
      },
      Backspace: deleteTableWhenAllCellsSelected,
      "Mod-Backspace": deleteTableWhenAllCellsSelected,
      Delete: deleteTableWhenAllCellsSelected,
      "Mod-Delete": deleteTableWhenAllCellsSelected,
    };
  },
  addProseMirrorPlugins() {
    const isResizable = this.options.resizable && this.editor.isEditable;

    return [
      ...(isResizable
        ? [
            columnResizing({
              handleWidth: this.options.handleWidth,
              cellMinWidth: this.options.cellMinWidth,

              View: this.options.View,
              // TODO: PR for @types/prosemirror-tables

              lastColumnResizable: this.options.lastColumnResizable,
            }),
          ]
        : []),
      tableEditing(),
      new Plugin({
        props: {
          decorations: state => {
            const { doc } = state;
            const decorations = [];
            let index = 0;
            doc.descendants((node, pos) => {
              if (node.type.name !== this.name) {
                return;
              }

              const elements = document.getElementsByClassName("rme-table");
              const table = elements[index];

              if (!table) {
                return;
              }

              const element = table.parentElement;
              const shadowRight = !!(
                element && element.scrollWidth > element.clientWidth
              );

              if (shadowRight) {
                decorations.push(
                  Decoration.widget(
                    pos + 1,
                    () => {
                      const shadow = document.createElement("div");
                      shadow.className = "scrollable-shadow right";
                      return shadow;
                    },
                    {
                      key: "table-shadow-right",
                    }
                  )
                );
              }
              index++;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
  // schema() {
  //   return {
  //     content: "tr+",
  //     tableRole: "table",
  //     isolating: true,
  //     group: "block",
  //     parseDOM: [{ tag: "table" }],
  //     toDOM() {
  //       return [
  //         "div",
  //         { class: "scrollable-wrapper table-wrapper" },
  //         [
  //           "div",
  //           { class: "scrollable" },
  //           ["table", { class: "rme-table" }, ["tbody", 0]],
  //         ],
  //       ];
  //     },
  //   };
  // },
});
// export default class Table extends ProseMirrorNode {
//   get name() {
//     return "table";
//   }

//   get rulePlugins() {
//     return [tablesRule];
//   }

//   toMarkdown(state, node) {
//     state.renderTable(node);
//     state.closeBlock(node);
//   }

//   parseMarkdown() {
//     return { block: "table" };
//   }

//   get plugins() {

//   }
// }
