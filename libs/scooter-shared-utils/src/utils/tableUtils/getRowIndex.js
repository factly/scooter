export function getRowIndex(selection) {
  const isRowSelection = selection.isRowSelection && selection.isRowSelection();
  if (!isRowSelection) {
    return undefined;
  }

  const path = selection.$from.path;
  return path[path.length - 8];
}

export function getRowIndexFromText(selection) {
  const isRowSelection = selection.isRowSelection && selection.isRowSelection();
  const path = selection.$from.path;
  if (isRowSelection) {
    return path[path.length - 8];
  } else {
    return path[path.length - 11];
  }
}
