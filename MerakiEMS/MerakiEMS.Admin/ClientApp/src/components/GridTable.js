import React, { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export const GridTable = ({ data, columns, minHeight }) => {
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    filterFn: (row, columnId, filterValue) => {
      if (filterValue.includes("<")) {
        return row[columnId] < filterValue.replace("<", "");
      } else if (filterValue.includes(">")) {
        return row[columnId] > filterValue.replace(">", "");
      } else {
        return row[columnId] === filterValue;
      }
    },
  });

  table.getState().pagination.pageSize = 7;
  const tableSize = table.getPageCount();
  return (
    <>
      {/* <div> */}
      <div style={{ minHeight: minHeight }}>
        <div className="globar-filter">
          <input
            className="filter-input"
            placeholder="Filter Table"
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tableSize > 1 ? (
        <div className="menu-list">
          <div className="FooterOptions">
            <button className="FooterBtn" onClick={() => table.setPageIndex(0)}>
              {"<<"}
            </button>
            <button
              className="FooterBtn"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {"<"}
            </button>
            <button
              className="FooterBtn"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {">"}
            </button>
            <button
              className="FooterBtn"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              {">>"}
            </button>
            <span className="FooterOptions">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            {/* <span className="FooterOptions">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span> */}
            <span className="FooterOptions">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const inputValue = Number(e.target.value);
                  const totalPages = table.getPageCount();
                  if (inputValue >= 1 && inputValue <= totalPages) {
                    table.setPageIndex(inputValue - 1);
                  }
                }}
                min="1"
                max={table.getPageCount()}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
    </>
  );
};
