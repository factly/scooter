import {
  CellSelection,
  TableMap,
  addColumn,
  addRow,
  removeColumn,
  removeRow,
} from "@tiptap/pm/tables";
import { Selection } from "@tiptap/pm/state";
import { Slice } from "@tiptap/pm/model";
import { findParentNode, findParentNodeClosestToPos } from "./selection";
import { setTextSelection, safeInsert } from "./transforms";
import {
  cloneTr,
  tableNodeTypes,
  findTableClosestToPos,
  createCell,
  isRectSelected,
  moveTableRow,
  moveTableColumn,
  checkInvalidMovements,
} from "./helpers";

// :: (selection: Selection) → ?{pos: number, start: number, node: ProseMirrorNode}
// Iterates over parent nodes, returning the closest table node.
//
// ```javascript
// const table = findTable(selection);
// ```
export const findTable = selection =>
  findParentNode(
    node => node.type.spec.tableRole && node.type.spec.tableRole === "table"
  )(selection);

// :: (selection: Selection) → boolean
// Checks if current selection is a `CellSelection`.
//
// ```javascript
// if (isCellSelection(selection)) {
//   // ...
// }
// ```
export const isCellSelection = selection => {
  return selection instanceof CellSelection;
};

// :: (selection: Selection) → ?{left: number, right: number, top: number, bottom: number}
// Get the selection rectangle. Returns `undefined` if selection is not a CellSelection.
//
// ```javascript
// const rect = getSelectionRect(selection);
// ```
export const getSelectionRect = selection => {
  if (!isCellSelection(selection)) {
    return;
  }
  const start = selection.$anchorCell.start(-1);
  const map = TableMap.get(selection.$anchorCell.node(-1));
  return map.rectBetween(
    selection.$anchorCell.pos - start,
    selection.$headCell.pos - start
  );
};

// :: (columnIndex: number) → (selection: Selection) → boolean
// Checks if entire column at index `columnIndex` is selected.
//
// ```javascript
// const className = isColumnSelected(i)(selection) ? 'selected' : '';
// ```
export const isColumnSelected = columnIndex => selection => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));
    return isRectSelected({
      left: columnIndex,
      right: columnIndex + 1,
      top: 0,
      bottom: map.height,
    })(selection);
  }

  return false;
};

// :: (rowIndex: number) → (selection: Selection) → boolean
// Checks if entire row at index `rowIndex` is selected.
//
// ```javascript
// const className = isRowSelected(i)(selection) ? 'selected' : '';
// ```
export const isRowSelected = rowIndex => selection => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));
    return isRectSelected({
      left: 0,
      right: map.width,
      top: rowIndex,
      bottom: rowIndex + 1,
    })(selection);
  }

  return false;
};

// :: (selection: Selection) → boolean
// Checks if entire table is selected
//
// ```javascript
// const className = isTableSelected(selection) ? 'selected' : '';
// ```
export const isTableSelected = selection => {
  if (isCellSelection(selection)) {
    const map = TableMap.get(selection.$anchorCell.node(-1));
    return isRectSelected({
      left: 0,
      right: map.width,
      top: 0,
      bottom: map.height,
    })(selection);
  }

  return false;
};

// :: (columnIndex: union<number, [number]>) → (selection: Selection) → ?[{pos: number, start: number, node: ProseMirrorNode}]
// Returns an array of cells in a column(s), where `columnIndex` could be a column index or an array of column indexes.
//
// ```javascript
// const cells = getCellsInColumn(i)(selection); // [{node, pos}, {node, pos}]
// ```
export const getCellsInColumn = columnIndex => selection => {
  const table = findTable(selection);
  if (table) {
    const map = TableMap.get(table.node);
    const indexes = Array.isArray(columnIndex)
      ? columnIndex
      : Array.from([columnIndex]);
    return indexes.reduce((acc, index) => {
      if (index >= 0 && index <= map.width - 1) {
        const cells = map.cellsInRect({
          left: index,
          right: index + 1,
          top: 0,
          bottom: map.height,
        });
        return acc.concat(
          cells.map(nodePos => {
            const node = table.node.nodeAt(nodePos);
            const pos = nodePos + table.start;
            return { pos, start: pos + 1, node };
          })
        );
      }
    }, []);
  }
};

// :: (rowIndex: union<number, [number]>) → (selection: Selection) → ?[{pos: number, start: number, node: ProseMirrorNode}]
// Returns an array of cells in a row(s), where `rowIndex` could be a row index or an array of row indexes.
//
// ```javascript
// const cells = getCellsInRow(i)(selection); // [{node, pos}, {node, pos}]
// ```
export const getCellsInRow = rowIndex => selection => {
  const table = findTable(selection);
  if (table) {
    const map = TableMap.get(table.node);
    const indexes = Array.isArray(rowIndex) ? rowIndex : Array.from([rowIndex]);
    return indexes.reduce((acc, index) => {
      if (index >= 0 && index <= map.height - 1) {
        const cells = map.cellsInRect({
          left: 0,
          right: map.width,
          top: index,
          bottom: index + 1,
        });
        return acc.concat(
          cells.map(nodePos => {
            const node = table.node.nodeAt(nodePos);
            const pos = nodePos + table.start;
            return { pos, start: pos + 1, node };
          })
        );
      }
    }, []);
  }
};

// :: (selection: Selection) → ?[{pos: number, start: number, node: ProseMirrorNode}]
// Returns an array of all cells in a table.
//
// ```javascript
// const cells = getCellsInTable(selection); // [{node, pos}, {node, pos}]
// ```
export const getCellsInTable = selection => {
  const table = findTable(selection);
  if (table) {
    const map = TableMap.get(table.node);
    const cells = map.cellsInRect({
      left: 0,
      right: map.width,
      top: 0,
      bottom: map.height,
    });
    return cells.map(nodePos => {
      const node = table.node.nodeAt(nodePos);
      const pos = nodePos + table.start;
      return { pos, start: pos + 1, node };
    });
  }
};

const select = type => (index, expand) => tr => {
  const table = findTable(tr.selection);
  const isRowSelection = type === "row";
  if (table) {
    const map = TableMap.get(table.node);

    // Check if the index is valid
    if (index >= 0 && index < (isRowSelection ? map.height : map.width)) {
      let left = isRowSelection ? 0 : index;
      let top = isRowSelection ? index : 0;
      let right = isRowSelection ? map.width : index + 1;
      let bottom = isRowSelection ? index + 1 : map.height;

      if (expand) {
        const cell = findCellClosestToPos(tr.selection.$from);
        if (!cell) {
          return tr;
        }

        const selRect = map.findCell(cell.pos - table.start);
        if (isRowSelection) {
          top = Math.min(top, selRect.top);
          bottom = Math.max(bottom, selRect.bottom);
        } else {
          left = Math.min(left, selRect.left);
          right = Math.max(right, selRect.right);
        }
      }

      const cellsInFirstRow = map.cellsInRect({
        left,
        top,
        right: isRowSelection ? right : left + 1,
        bottom: isRowSelection ? top + 1 : bottom,
      });

      const cellsInLastRow =
        bottom - top === 1
          ? cellsInFirstRow
          : map.cellsInRect({
              left: isRowSelection ? left : right - 1,
              top: isRowSelection ? bottom - 1 : top,
              right,
              bottom,
            });

      const head = table.start + cellsInFirstRow[0];
      const anchor = table.start + cellsInLastRow[cellsInLastRow.length - 1];
      const $head = tr.doc.resolve(head);
      const $anchor = tr.doc.resolve(anchor);

      return cloneTr(tr.setSelection(new CellSelection($anchor, $head)));
    }
  }
  return tr;
};

// :: (columnIndex: number, expand: ?boolean) → (tr: Transaction) → Transaction
// Returns a new transaction that creates a `CellSelection` on a column at index `columnIndex`.
// Use the optional `expand` param to extend from current selection.
//
// ```javascript
// dispatch(
//   selectColumn(i)(state.tr)
// );
// ```
export const selectColumn = select("column");

// :: (rowIndex: number, expand: ?boolean) → (tr: Transaction) → Transaction
// Returns a new transaction that creates a `CellSelection` on a column at index `rowIndex`.
// Use the optional `expand` param to extend from current selection.
//
// ```javascript
// dispatch(
//   selectRow(i)(state.tr)
// );
// ```
export const selectRow = select("row");

// :: (selection: Selection) → (tr: Transaction) → Transaction
// Returns a new transaction that creates a `CellSelection` on the entire table.
//
// ```javascript
// dispatch(
//   selectTable(i)(state.tr)
// );
// ```
export const selectTable = tr => {
  const table = findTable(tr.selection);
  if (table) {
    const { map } = TableMap.get(table.node);
    if (map && map.length) {
      const head = table.start + map[0];
      const anchor = table.start + map[map.length - 1];
      const $head = tr.doc.resolve(head);
      const $anchor = tr.doc.resolve(anchor);

      return cloneTr(tr.setSelection(new CellSelection($anchor, $head)));
    }
  }
  return tr;
};

// :: (cell: {pos: number, node: ProseMirrorNode}, schema: Schema) → (tr: Transaction) → Transaction
// Returns a new transaction that clears the content of a given `cell`.
//
// ```javascript
// const $pos = state.doc.resolve(13);
// dispatch(
//   emptyCell(findCellClosestToPos($pos), state.schema)(state.tr)
// );
// ```
export const emptyCell = (cell, schema) => tr => {
  if (cell) {
    const content = tableNodeTypes(schema).cell.createAndFill().content;
    if (!cell.node.content.eq(content)) {
      tr.replaceWith(
        cell.pos,
        cell.pos + cell.node.nodeSize - 1,
        new Slice(content, 0, 0)
      );
      return cloneTr(tr);
    }
  }
  return tr;
};

// :: (columnIndex: number) → (tr: Transaction) → Transaction
// Returns a new transaction that adds a new column at index `columnIndex`.
//
// ```javascript
// dispatch(
//   addColumnAt(i)(state.tr)
// );
// ```
export const addColumnAt = columnIndex => tr => {
  const table = findTable(tr.selection);
  if (table) {
    const map = TableMap.get(table.node);
    if (columnIndex >= 0 && columnIndex <= map.width) {
      return cloneTr(
        addColumn(
          tr,
          {
            map,
            tableStart: table.start,
            table: table.node,
          },
          columnIndex
        )
      );
    }
  }
  return tr;
};

// :: (originRowIndex: number, targetRowIndex: targetColumnIndex, options?: MovementOptions) → (tr: Transaction) → Transaction
// Returns a new transaction that moves the origin row to the target index;
//
// by default "tryToFit" is false, that means if you try to move a row to a place
// where we will need to split a row with merged cells it'll throw an exception, for example:
//
// ```
//      ____________________________
//     |      |      |             |
//  0  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
//     |      |             |      |
//  1  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  2  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
// ```
//
// if you try to move the row 0 to the row index 1 with tryToFit false,
// it'll throw an exception since you can't split the row 1;
// but if "tryToFit" is true, it'll move the row using the current direction.
//
// We defined current direction using the target and origin values
// if the origin is greater than the target, that means the course is `bottom-to-top`,
// so the `tryToFit` logic will use this direction to determine
// if we should move the column to the right or the left.
//
// for example, if you call the function using `moveRow(0, 1, { tryToFit: true })`
// the result will be:
// ```
//      ____________________________
//     |      |             |      |
//  0  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  1  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
//     |      |      |             |
//  2  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
// ```
//
// since we could put the row zero on index one,
// we pushed to the best place to fit the row index 0,
// in this case, row index 2.
//
//
// -------- HOW TO OVERRIDE DIRECTION --------
//
// If you set "tryToFit" to "true", it will try to figure out the best direction
// place to fit using the origin and target index, for example:
//
//
// ```
//      ____________________________
//     |      |      |             |
//  0  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
//     |      |             |      |
//  1  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  2  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
//     |      |             |      |
//  3  |  A4  |     B4      |      |
//     |______|______ ______|      |
//     |      |      |      |  D2  |
//  4  |  A5  |  B5  |  C3  |      |
//     |______|______|______|______|
// ```
//
//
// If you try to move the row 0 to row index 4 with "tryToFit" enabled, by default,
// the code will put it on after the merged rows,
// but you can override it using the "direction" option.
//
// -1: Always put the origin before the target
// ```
//      ____________________________
//     |      |             |      |
//  0  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  1  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
//     |      |      |             |
//  2  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
//     |      |             |      |
//  3  |  A4  |     B4      |      |
//     |______|______ ______|      |
//     |      |      |      |  D2  |
//  4  |  A5  |  B5  |  C3  |      |
//     |______|______|______|______|
// ```
//
//  0: Automatically decide the best place to fit
// ```
//      ____________________________
//     |      |             |      |
//  0  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  1  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
//     |      |             |      |
//  2  |  A4  |     B4      |      |
//     |______|______ ______|      |
//     |      |      |      |  D2  |
//  3  |  A5  |  B5  |  C3  |      |
//     |______|______|______|______|
//     |      |      |             |
//  4  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
// ```
//
//  1: Always put the origin after the target
// ```
//      ____________________________
//     |      |             |      |
//  0  |  A2  |     B2      |      |
//     |______|______ ______|      |
//     |      |      |      |  D1  |
//  1  |  A3  |  B3  |  C2  |      |
//     |______|______|______|______|
//     |      |             |      |
//  2  |  A4  |     B4      |      |
//     |______|______ ______|      |
//     |      |      |      |  D2  |
//  3  |  A5  |  B5  |  C3  |      |
//     |______|______|______|______|
//     |      |      |             |
//  4  |  A1  |  B1  |     C1      |
//     |______|______|______ ______|
// ```
//
// ```javascript
// dispatch(
//   moveRow(x, y, options)(state.tr)
// );
// ```
export const moveRow = (originRowIndex, targetRowIndex, opts) => tr => {
  const defaultOptions = { tryToFit: false, direction: 0 };
  const options = Object.assign(defaultOptions, opts);
  const table = findTable(tr.selection);
  if (!table) {
    return tr;
  }

  const { indexes: indexesOriginRow } =
    getSelectionRangeInRow(originRowIndex)(tr);
  const { indexes: indexesTargetRow } =
    getSelectionRangeInRow(targetRowIndex)(tr);

  if (indexesOriginRow.indexOf(targetRowIndex) > -1) {
    return tr;
  }

  if (!options.tryToFit && indexesTargetRow.length > 1) {
    checkInvalidMovements(
      originRowIndex,
      targetRowIndex,
      indexesTargetRow,
      "row"
    );
  }

  const newTable = moveTableRow(
    table,
    indexesOriginRow,
    indexesTargetRow,
    options.direction
  );

  return cloneTr(tr).replaceWith(
    table.pos,
    table.pos + table.node.nodeSize,
    newTable
  );
};

// :: (originColumnIndex: number, targetColumnIndex: targetColumnIndex, options?: MovementOptions) → (tr: Transaction) → Transaction
// Returns a new transaction that moves the origin column to the target index;
//
// by default "tryToFit" is false, that means if you try to move a column to a place
// where we will need to split a column with merged cells it'll throw an exception, for example:
//
// ```
//    0      1         2
//  ____________________________
// |      |      |             |
// |  A1  |  B1  |     C1      |
// |______|______|______ ______|
// |      |             |      |
// |  A2  |     B2      |      |
// |______|______ ______|      |
// |      |      |      |  D1  |
// |  A3  |  B3  |  C2  |      |
// |______|______|______|______|
// ```
//
//
// if you try to move the column 0 to the column index 1 with tryToFit false,
// it'll throw an exception since you can't split the column 1;
// but if "tryToFit" is true, it'll move the column using the current direction.
//
// We defined current direction using the target and origin values
// if the origin is greater than the target, that means the course is `right-to-left`,
// so the `tryToFit` logic will use this direction to determine
// if we should move the column to the right or the left.
//
// for example, if you call the function using `moveColumn(0, 1, { tryToFit: true })`
// the result will be:
//
// ```
//    0       1             2
// _____________________ _______
// |      |             |      |
// |  B1  |     C1      |  A1  |
// |______|______ ______|______|
// |             |      |      |
// |     B2      |      |  A2  |
// |______ ______|      |______|
// |      |      |  D1  |      |
// |  B3  |  C2  |      |  A3  |
// |______|______|______|______|
// ```
//
// since we could put the column zero on index one,
// we pushed to the best place to fit the column 0, in this case, column index 2.
//
// -------- HOW TO OVERRIDE DIRECTION --------
//
// If you set "tryToFit" to "true", it will try to figure out the best direction
// place to fit using the origin and target index, for example:
//
//
// ```
//     0      1       2     3      4      5       6
//   _________________________________________________
//  |      |      |             |      |             |
//  |  A1  |  B1  |     C1      |  E1  |     F1      |
//  |______|______|______ ______|______|______ ______|
//  |      |             |      |             |      |
//  |  A2  |     B2      |      |     E2      |      |
//  |______|______ ______|      |______ ______|      |
//  |      |      |      |  D1  |      |      |  G2  |
//  |  A3  |  B3  |  C3  |      |  E3  |  F3  |      |
//  |______|______|______|______|______|______|______|
// ```
//
//
// If you try to move the column 0 to column index 5 with "tryToFit" enabled, by default,
// the code will put it on after the merged columns,
// but you can override it using the "direction" option.
//
// -1: Always put the origin before the target
//
// ```
//     0      1       2     3      4      5       6
//   _________________________________________________
//  |      |             |      |      |             |
//  |  B1  |     C1      |  A1  |  E1  |     F1      |
//  |______|______ ______|______|______|______ ______|
//  |             |      |      |             |      |
//  |     B2      |      |  A2  |     E2      |      |
//  |______ ______|      |______|______ ______|      |
//  |      |      |  D1  |      |      |      |  G2  |
//  |  B3  |  C3  |      |  A3  |  E3  |  F3  |      |
//  |______|______|______|______|______|______|______|
// ```
//
//  0: Automatically decide the best place to fit
//
// ```
//     0      1       2     3      4      5       6
//   _________________________________________________
//  |      |             |      |             |      |
//  |  B1  |     C1      |  E1  |     F1      |  A1  |
//  |______|______ ______|______|______ ______|______|
//  |             |      |             |      |      |
//  |     B2      |      |     E2      |      |  A2  |
//  |______ ______|      |______ ______|      |______|
//  |      |      |  D1  |      |      |  G2  |      |
//  |  B3  |  C3  |      |  E3  |  F3  |      |  A3  |
//  |______|______|______|______|______|______|______|
// ```
//
//  1: Always put the origin after the target
//
// ```
//     0      1       2     3      4      5       6
//   _________________________________________________
//  |      |             |      |             |      |
//  |  B1  |     C1      |  E1  |     F1      |  A1  |
//  |______|______ ______|______|______ ______|______|
//  |             |      |             |      |      |
//  |     B2      |      |     E2      |      |  A2  |
//  |______ ______|      |______ ______|      |______|
//  |      |      |  D1  |      |      |  G2  |      |
//  |  B3  |  C3  |      |  E3  |  F3  |      |  A3  |
//  |______|______|______|______|______|______|______|
// ```
//
// ```javascript
// dispatch(
//   moveColumn(x, y, options)(state.tr)
// );
// ```
export const moveColumn =
  (originColumnIndex, targetColumnIndex, opts) => tr => {
    const defaultOptions = { tryToFit: false, direction: 0 };
    const options = Object.assign(defaultOptions, opts);
    const table = findTable(tr.selection);
    if (!table) {
      return tr;
    }

    const { indexes: indexesOriginColumn } =
      getSelectionRangeInColumn(originColumnIndex)(tr);
    const { indexes: indexesTargetColumn } =
      getSelectionRangeInColumn(targetColumnIndex)(tr);

    if (indexesOriginColumn.indexOf(targetColumnIndex) > -1) {
      return tr;
    }

    if (!options.tryToFit && indexesTargetColumn.length > 1) {
      checkInvalidMovements(
        originColumnIndex,
        targetColumnIndex,
        indexesTargetColumn,
        "column"
      );
    }

    const newTable = moveTableColumn(
      table,
      indexesOriginColumn,
      indexesTargetColumn,
      options.direction
    );

    return cloneTr(tr).replaceWith(
      table.pos,
      table.pos + table.node.nodeSize,
      newTable
    );
  };

// :: (rowIndex: number, clonePreviousRow?: boolean) → (tr: Transaction) → Transaction
// Returns a new transaction that adds a new row at index `rowIndex`. Optionally clone the previous row.
//
// ```javascript
// dispatch(
//   addRowAt(i)(state.tr)
// );
// ```
//
// ```javascript
// dispatch(
//   addRowAt(i, true)(state.tr)
// );
// ```
export const addRowAt = (rowIndex, clonePreviousRow) => tr => {
  const table = findTable(tr.selection);
  if (table) {
    const map = TableMap.get(table.node);
    const cloneRowIndex = rowIndex - 1;

    if (clonePreviousRow && cloneRowIndex >= 0) {
      return cloneTr(cloneRowAt(cloneRowIndex)(tr));
    }

    if (rowIndex >= 0 && rowIndex <= map.height) {
      return cloneTr(
        addRow(
          tr,
          {
            map,
            tableStart: table.start,
            table: table.node,
          },
          rowIndex
        )
      );
    }
  }
  return tr;
};

// :: (cloneRowIndex: number) → (tr: Transaction) → Transaction
// Returns a new transaction that adds a new row after `cloneRowIndex`, cloning the row attributes at `cloneRowIndex`.
//
// ```javascript
// dispatch(
//   cloneRowAt(i)(state.tr)
// );
// ```
export const cloneRowAt = rowIndex => tr => {
  const table = findTable(tr.selection);
  if (table) {
    const map = TableMap.get(table.node);

    if (rowIndex >= 0 && rowIndex <= map.height) {
      const tableNode = table.node;
      const tableNodes = tableNodeTypes(tableNode.type.schema);

      let rowPos = table.start;
      for (let i = 0; i < rowIndex + 1; i++) {
        rowPos += tableNode.child(i).nodeSize;
      }

      const cloneRow = tableNode.child(rowIndex);
      // Re-create the same nodes with same attrs, dropping the node content.
      let cells = [];
      let rowWidth = 0;
      cloneRow.forEach(cell => {
        // If we're copying a row with rowspan somewhere, we dont want to copy that cell
        // We'll increment its span below.
        if (cell.attrs.rowspan === 1) {
          rowWidth += cell.attrs.colspan;
          cells.push(
            tableNodes[cell.type.spec.tableRole].createAndFill(
              cell.attrs,
              cell.marks
            )
          );
        }
      });

      // If a higher row spans past our clone row, bump the higher row to cover this new row too.
      if (rowWidth < map.width) {
        let rowSpanCells = [];
        for (let i = rowIndex; i >= 0; i--) {
          let foundCells = filterCellsInRow(i, (cell, tr) => {
            const rowspan = cell.node.attrs.rowspan;
            const spanRange = i + rowspan;
            return rowspan > 1 && spanRange > rowIndex;
          })(tr);
          rowSpanCells.push(...foundCells);
        }

        if (rowSpanCells.length) {
          rowSpanCells.forEach(cell => {
            tr = setCellAttrs(cell, {
              rowspan: cell.node.attrs.rowspan + 1,
            })(tr);
          });
        }
      }

      return safeInsert(
        tableNodes.row.create(cloneRow.attrs, cells),
        rowPos
      )(tr);
    }
  }
  return tr;
};

// :: (columnIndex: number) → (tr: Transaction) → Transaction
// Returns a new transaction that removes a column at index `columnIndex`. If there is only one column left, it will remove the entire table.
//
// ```javascript
// dispatch(
//   removeColumnAt(i)(state.tr)
// );
// ```
export const removeColumnAt = columnIndex => tr => {
  const table = findTable(tr.selection);
  if (table) {
    const map = TableMap.get(table.node);
    if (columnIndex === 0 && map.width === 1) {
      return removeTable(tr);
    } else if (columnIndex >= 0 && columnIndex <= map.width) {
      removeColumn(
        tr,
        {
          map,
          tableStart: table.start,
          table: table.node,
        },
        columnIndex
      );
      return cloneTr(tr);
    }
  }
  return tr;
};

// :: (rowIndex: number) → (tr: Transaction) → Transaction
// Returns a new transaction that removes a row at index `rowIndex`. If there is only one row left, it will remove the entire table.
//
// ```javascript
// dispatch(
//   removeRowAt(i)(state.tr)
// );
// ```
export const removeRowAt = rowIndex => tr => {
  const table = findTable(tr.selection);
  if (table) {
    const map = TableMap.get(table.node);
    if (rowIndex === 0 && map.height === 1) {
      return removeTable(tr);
    } else if (rowIndex >= 0 && rowIndex <= map.height) {
      removeRow(
        tr,
        {
          map,
          tableStart: table.start,
          table: table.node,
        },
        rowIndex
      );
      return cloneTr(tr);
    }
  }
  return tr;
};

// :: (tr: Transaction) → Transaction
// Returns a new transaction that removes a table node if the cursor is inside of it.
//
// ```javascript
// dispatch(
//   removeTable(state.tr)
// );
// ```
export const removeTable = tr => {
  const { $from } = tr.selection;
  for (let depth = $from.depth; depth > 0; depth--) {
    let node = $from.node(depth);
    if (node.type.spec.tableRole === "table") {
      return cloneTr(tr.delete($from.before(depth), $from.after(depth)));
    }
  }
  return tr;
};

// :: (tr: Transaction) → Transaction
// Returns a new transaction that removes selected columns.
//
// ```javascript
// dispatch(
//   removeSelectedColumns(state.tr)
// );
// ```
export const removeSelectedColumns = tr => {
  const { selection } = tr;
  if (isTableSelected(selection)) {
    return removeTable(tr);
  }
  if (isCellSelection(selection)) {
    const table = findTable(selection);
    if (table) {
      const map = TableMap.get(table.node);
      const rect = map.rectBetween(
        selection.$anchorCell.pos - table.start,
        selection.$headCell.pos - table.start
      );

      if (rect.left == 0 && rect.right == map.width) {
        return false;
      }

      const pmTableRect = Object.assign({}, rect, {
        map,
        table: table.node,
        tableStart: table.start,
      });

      for (let i = pmTableRect.right - 1; ; i--) {
        removeColumn(tr, pmTableRect, i);
        if (i === pmTableRect.left) {
          break;
        }
        pmTableRect.table = pmTableRect.tableStart
          ? tr.doc.nodeAt(pmTableRect.tableStart - 1)
          : tr.doc;
        pmTableRect.map = TableMap.get(pmTableRect.table);
      }
      return cloneTr(tr);
    }
  }
  return tr;
};

// :: (tr: Transaction) → Transaction
// Returns a new transaction that removes selected rows.
//
// ```javascript
// dispatch(
//   removeSelectedRows(state.tr)
// );
// ```
export const removeSelectedRows = tr => {
  const { selection } = tr;
  if (isTableSelected(selection)) {
    return removeTable(tr);
  }
  if (isCellSelection(selection)) {
    const table = findTable(selection);
    if (table) {
      const map = TableMap.get(table.node);
      const rect = map.rectBetween(
        selection.$anchorCell.pos - table.start,
        selection.$headCell.pos - table.start
      );

      if (rect.top == 0 && rect.bottom == map.height) {
        return false;
      }

      const pmTableRect = Object.assign({}, rect, {
        map,
        table: table.node,
        tableStart: table.start,
      });

      for (let i = pmTableRect.bottom - 1; ; i--) {
        removeRow(tr, pmTableRect, i);
        if (i === pmTableRect.top) {
          break;
        }
        pmTableRect.table = pmTableRect.tableStart
          ? tr.doc.nodeAt(pmTableRect.tableStart - 1)
          : tr.doc;
        pmTableRect.map = TableMap.get(pmTableRect.table);
      }

      return cloneTr(tr);
    }
  }
  return tr;
};

// :: ($pos: ResolvedPos) → (tr: Transaction) → Transaction
// Returns a new transaction that removes a column closest to a given `$pos`.
//
// ```javascript
// dispatch(
//   removeColumnClosestToPos(state.doc.resolve(3))(state.tr)
// );
// ```
export const removeColumnClosestToPos = $pos => tr => {
  const rect = findCellRectClosestToPos($pos);
  if (rect) {
    return removeColumnAt(rect.left)(setTextSelection($pos.pos)(tr));
  }
  return tr;
};

// :: ($pos: ResolvedPos) → (tr: Transaction) → Transaction
// Returns a new transaction that removes a row closest to a given `$pos`.
//
// ```javascript
// dispatch(
//   removeRowClosestToPos(state.doc.resolve(3))(state.tr)
// );
// ```
export const removeRowClosestToPos = $pos => tr => {
  const rect = findCellRectClosestToPos($pos);
  if (rect) {
    return removeRowAt(rect.top)(setTextSelection($pos.pos)(tr));
  }
  return tr;
};

// :: (columnIndex: number, cellTransform: (cell: {pos: number, start: number, node: ProseMirrorNode}, tr: Transaction) → Transaction, setCursorToLastCell: ?boolean) → (tr: Transaction) → Transaction
// Returns a new transaction that maps a given `cellTransform` function to each cell in a column at a given `columnIndex`.
// It will set the selection into the last cell of the column if `setCursorToLastCell` param is set to `true`.
//
// ```javascript
// dispatch(
//   forEachCellInColumn(0, (cell, tr) => emptyCell(cell, state.schema)(tr))(state.tr)
// );
// ```
export const forEachCellInColumn =
  (columnIndex, cellTransform, setCursorToLastCell) => tr => {
    const cells = getCellsInColumn(columnIndex)(tr.selection);
    if (cells) {
      for (let i = cells.length - 1; i >= 0; i--) {
        tr = cellTransform(cells[i], tr);
      }
      if (setCursorToLastCell) {
        const $pos = tr.doc.resolve(
          tr.mapping.map(cells[cells.length - 1].pos)
        );
        tr.setSelection(Selection.near($pos));
      }
      return cloneTr(tr);
    }
    return tr;
  };

// :: (rowIndex: number, cellTransform: (cell: {pos: number, start: number, node: ProseMirrorNode}, tr: Transaction) → Transaction, setCursorToLastCell: ?boolean) → (tr: Transaction) → Transaction
// Returns a new transaction that maps a given `cellTransform` function to each cell in a row at a given `rowIndex`.
// It will set the selection into the last cell of the row if `setCursorToLastCell` param is set to `true`.
//
// ```javascript
// dispatch(
//   forEachCellInRow(0, (cell, tr) => setCellAttrs(cell, { background: 'red' })(tr))(state.tr)
// );
// ```
export const forEachCellInRow =
  (rowIndex, cellTransform, setCursorToLastCell) => tr => {
    const cells = getCellsInRow(rowIndex)(tr.selection);
    if (cells) {
      for (let i = cells.length - 1; i >= 0; i--) {
        tr = cellTransform(cells[i], tr);
      }
      if (setCursorToLastCell) {
        const $pos = tr.doc.resolve(
          tr.mapping.map(cells[cells.length - 1].pos)
        );
        tr.setSelection(Selection.near($pos));
      }
    }
    return tr;
  };

// :: (cell: {pos: number, start: number, node: ProseMirrorNode}, attrs: Object) → (tr: Transaction) → Transaction
// Returns a new transaction that sets given `attrs` to a given `cell`.
//
// ```javascript
// dispatch(
//   setCellAttrs(findCellClosestToPos($pos), { background: 'blue' })(tr);
// );
// ```
export const setCellAttrs = (cell, attrs) => tr => {
  if (cell) {
    tr.setNodeMarkup(cell.pos, null, Object.assign({}, cell.node.attrs, attrs));
    return cloneTr(tr);
  }
  return tr;
};

// :: (schema: Schema, rowsCount: ?number, colsCount: ?number, withHeaderRow: ?boolean, cellContent: ?Node) → Node
// Returns a table node of a given size.
// `withHeaderRow` defines whether the first row of the table will be a header row.
// `cellContent` defines the content of each cell.
//
// ```javascript
// const table = createTable(state.schema); // 3x3 table node
// dispatch(
//   tr.replaceSelectionWith(table).scrollIntoView()
// );
// ```
export const createTable = (
  schema,
  rowsCount = 3,
  colsCount = 3,
  withHeaderRow = true,
  cellContent = null
) => {
  const {
    cell: tableCell,
    header_cell: tableHeader,
    row: tableRow,
    table,
  } = tableNodeTypes(schema);

  const cells = [];
  const headerCells = [];
  for (let i = 0; i < colsCount; i++) {
    cells.push(createCell(tableCell, cellContent));

    if (withHeaderRow) {
      headerCells.push(createCell(tableHeader, cellContent));
    }
  }

  const rows = [];
  for (let i = 0; i < rowsCount; i++) {
    rows.push(
      tableRow.createChecked(
        null,
        withHeaderRow && i === 0 ? headerCells : cells
      )
    );
  }

  return table.createChecked(null, rows);
};

// :: ($pos: ResolvedPos) → ?{pos: number, start: number, node: ProseMirrorNode}
// Iterates over parent nodes, returning a table cell or a table header node closest to a given `$pos`.
//
// ```javascript
// const cell = findCellClosestToPos(state.selection.$from);
// ```
export const findCellClosestToPos = $pos => {
  const predicate = node =>
    node.type.spec.tableRole && /cell/i.test(node.type.spec.tableRole);
  return findParentNodeClosestToPos($pos, predicate);
};

// :: ($pos: ResolvedPos) → ?{left: number, top: number, right: number, bottom: number}
// Returns the rectangle spanning a cell closest to a given `$pos`.
//
// ```javascript
// dispatch(
//   findCellRectClosestToPos(state.selection.$from)
// );
// ```
export const findCellRectClosestToPos = $pos => {
  const cell = findCellClosestToPos($pos);
  if (cell) {
    const table = findTableClosestToPos($pos);
    const map = TableMap.get(table.node);
    const cellPos = cell.pos - table.start;
    return map.rectBetween(cellPos, cellPos);
  }
};

const filterCellsInRow = (rowIndex, predicate) => tr => {
  let foundCells = [];
  const cells = getCellsInRow(rowIndex)(tr.selection);
  if (cells) {
    for (let j = cells.length - 1; j >= 0; j--) {
      if (predicate(cells[j], tr)) {
        foundCells.push(cells[j]);
      }
    }
  }

  return foundCells;
};

// :: (columnIndex: number) → (tr: Transaction) → {$anchor: ResolvedPos, $head: ResolvedPos, indexes: [number]}
// Returns a range of rectangular selection spanning all merged cells around a column at index `columnIndex`.
//
// ```javascript
// const range = getSelectionRangeInColumn(3)(state.tr);
// ```
export const getSelectionRangeInColumn = columnIndex => tr => {
  let startIndex = columnIndex;
  let endIndex = columnIndex;

  // looking for selection start column (startIndex)
  for (let i = columnIndex; i >= 0; i--) {
    const cells = getCellsInColumn(i)(tr.selection);
    if (cells) {
      cells.forEach(cell => {
        let maybeEndIndex = cell.node.attrs.colspan + i - 1;
        if (maybeEndIndex >= startIndex) {
          startIndex = i;
        }
        if (maybeEndIndex > endIndex) {
          endIndex = maybeEndIndex;
        }
      });
    }
  }
  // looking for selection end column (endIndex)
  for (let i = columnIndex; i <= endIndex; i++) {
    const cells = getCellsInColumn(i)(tr.selection);
    if (cells) {
      cells.forEach(cell => {
        let maybeEndIndex = cell.node.attrs.colspan + i - 1;
        if (cell.node.attrs.colspan > 1 && maybeEndIndex > endIndex) {
          endIndex = maybeEndIndex;
        }
      });
    }
  }

  // filter out columns without cells (where all rows have colspan > 1 in the same column)
  const indexes = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const maybeCells = getCellsInColumn(i)(tr.selection);
    if (maybeCells && maybeCells.length) {
      indexes.push(i);
    }
  }
  startIndex = indexes[0];
  endIndex = indexes[indexes.length - 1];

  const firstSelectedColumnCells = getCellsInColumn(startIndex)(tr.selection);
  const firstRowCells = getCellsInRow(0)(tr.selection);
  const $anchor = tr.doc.resolve(
    firstSelectedColumnCells[firstSelectedColumnCells.length - 1].pos
  );

  let headCell;
  for (let i = endIndex; i >= startIndex; i--) {
    const columnCells = getCellsInColumn(i)(tr.selection);
    if (columnCells && columnCells.length) {
      for (let j = firstRowCells.length - 1; j >= 0; j--) {
        if (firstRowCells[j].pos === columnCells[0].pos) {
          headCell = columnCells[0];
          break;
        }
      }
      if (headCell) {
        break;
      }
    }
  }

  const $head = tr.doc.resolve(headCell.pos);
  return { $anchor, $head, indexes };
};

// :: (rowIndex: number) → (tr: Transaction) → {$anchor: ResolvedPos, $head: ResolvedPos, indexes: [number]}
// Returns a range of rectangular selection spanning all merged cells around a row at index `rowIndex`.
//
// ```javascript
// const range = getSelectionRangeInRow(3)(state.tr);
// ```
export const getSelectionRangeInRow = rowIndex => tr => {
  let startIndex = rowIndex;
  let endIndex = rowIndex;
  // looking for selection start row (startIndex)
  for (let i = rowIndex; i >= 0; i--) {
    const cells = getCellsInRow(i)(tr.selection);
    cells.forEach(cell => {
      let maybeEndIndex = cell.node.attrs.rowspan + i - 1;
      if (maybeEndIndex >= startIndex) {
        startIndex = i;
      }
      if (maybeEndIndex > endIndex) {
        endIndex = maybeEndIndex;
      }
    });
  }
  // looking for selection end row (endIndex)
  for (let i = rowIndex; i <= endIndex; i++) {
    const cells = getCellsInRow(i)(tr.selection);
    cells.forEach(cell => {
      let maybeEndIndex = cell.node.attrs.rowspan + i - 1;
      if (cell.node.attrs.rowspan > 1 && maybeEndIndex > endIndex) {
        endIndex = maybeEndIndex;
      }
    });
  }

  // filter out rows without cells (where all columns have rowspan > 1 in the same row)
  const indexes = [];
  for (let i = startIndex; i <= endIndex; i++) {
    const maybeCells = getCellsInRow(i)(tr.selection);
    if (maybeCells && maybeCells.length) {
      indexes.push(i);
    }
  }
  startIndex = indexes[0];
  endIndex = indexes[indexes.length - 1];

  const firstSelectedRowCells = getCellsInRow(startIndex)(tr.selection);
  const firstColumnCells = getCellsInColumn(0)(tr.selection);
  const $anchor = tr.doc.resolve(
    firstSelectedRowCells[firstSelectedRowCells.length - 1].pos
  );

  let headCell;
  for (let i = endIndex; i >= startIndex; i--) {
    const rowCells = getCellsInRow(i)(tr.selection);
    if (rowCells && rowCells.length) {
      for (let j = firstColumnCells.length - 1; j >= 0; j--) {
        if (firstColumnCells[j].pos === rowCells[0].pos) {
          headCell = rowCells[0];
          break;
        }
      }
      if (headCell) {
        break;
      }
    }
  }

  const $head = tr.doc.resolve(headCell.pos);
  return { $anchor, $head, indexes };
};
