import React from "react";

const Table = ({ columns, rows, className }) => (
  <table
    className={`w-full min-w-full overflow-x-auto border border-gray-200 ${className}`}
  >
    {columns?.length ? (
      <thead>
        <tr>
          {columns.map((columnData, idx) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              key={idx}
            >
              {columnData}
            </th>
          ))}
        </tr>
      </thead>
    ) : null}
    <tbody className="w-full divide-y divide-gray-200 bg-white text-sm">
      {rows.map(row =>
        rows?.length ? (
          <tr>
            {row.map((rowData, idx) => (
              <td className="whitespace-nowrap px-6 py-2" key={idx}>
                {rowData}
              </td>
            ))}
          </tr>
        ) : null
      )}
    </tbody>
  </table>
);

export default Table;
