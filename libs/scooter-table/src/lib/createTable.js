import { TextSelection } from "@tiptap/pm/state";
import { getTableNodeTypes } from "./getTableNodeTypes";

export function createTable(
  state,
  rowsCount,
  colsCount,
  withHeaderRow,
  cellContent
) {
  const types = getTableNodeTypes(state.schema);
  const headerCells = [];
  const cells = [];
  const createCell = (cellType, cellContent) =>
    cellContent
      ? cellType.createChecked(null, cellContent)
      : cellType.createAndFill();

  for (let index = 0; index < colsCount; index += 1) {
    const cell = createCell(types.cell, cellContent);

    if (cell) {
      cells.push(cell);
    }

    if (withHeaderRow) {
      const headerCell = createCell(types.header_cell, cellContent);

      if (headerCell) {
        headerCells.push(headerCell);
      }
    }
  }

  const rows = [];

  for (let index = 0; index < rowsCount; index += 1) {
    rows.push(
      types.row.createChecked(
        null,
        withHeaderRow && index === 0 ? headerCells : cells
      )
    );
  }

  return types.table.createChecked(null, rows);
}

export function addTable(
  state,
  dispatch,
  { rowsCount, colsCount, withHeaderRow, cellContent }
) {
  const offset = state.tr.selection.anchor + 1;

  const nodes = createTable(
    state,
    rowsCount,
    colsCount,
    withHeaderRow,
    cellContent
  );
  const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
  const resolvedPos = tr.doc.resolve(offset);

  tr.setSelection(TextSelection.near(resolvedPos));

  dispatch(tr);
}

// add table to a new paragraph
export function addTableToEnd(
  state,
  dispatch,
  { rowsCount, colsCount, withHeaderRow, cellContent }
) {
  let tr = state.tr;

  // get block end position
  const end = tr.selection.$head.end(1); // param 1 is node deep
  const resolvedEnd = tr.doc.resolve(end);

  // move cursor to the end, then insert table
  const nodes = createTable(
    state,
    rowsCount,
    colsCount,
    withHeaderRow,
    cellContent
  );
  tr.setSelection(TextSelection.near(resolvedEnd));
  tr = tr.replaceSelectionWith(nodes).scrollIntoView();

  // move cursor into table
  const offset = end + 1;
  const resolvedPos = tr.doc.resolve(offset);
  tr.setSelection(TextSelection.near(resolvedPos));

  dispatch(tr);
}
