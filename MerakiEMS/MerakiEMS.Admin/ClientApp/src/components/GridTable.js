import React, { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export const GridTable = ({ data, columns }) => {
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
  });

  table.getState().pagination.pageSize = 7;

  return (
    <>
      <div>
        <div className="table-div">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <span className="FooterOptions">
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
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
