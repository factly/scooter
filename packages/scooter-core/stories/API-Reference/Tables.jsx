import Table from "../components/Table";
import {
  EDITOR_METHODS_TABLE_COLUMNS,
  EDITOR_METHODS_TABLE_ROWS,
  EDITOR_COMMANDS_TABLE_COLUMNS,
  EDITOR_COMMANDS_TABLE_ROWS,
} from "./constants";

export const MethodsTable = () => (
  <Table
    columns={EDITOR_METHODS_TABLE_COLUMNS}
    rows={EDITOR_METHODS_TABLE_ROWS}
  />
);
export const CommandsTable = () => (
  <Table
    columns={EDITOR_COMMANDS_TABLE_COLUMNS}
    rows={EDITOR_COMMANDS_TABLE_ROWS}
  />
);
