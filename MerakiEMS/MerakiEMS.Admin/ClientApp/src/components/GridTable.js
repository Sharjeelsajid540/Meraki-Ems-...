import React from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export const GridTable = ({ data, columns, minHeight, minWidth, sortable }) => {
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  table.getState().pagination.pageSize = 7;
  const tableSize = table.getPageCount();
  return (
    <>
      <div style={{ minHeight: minHeight, minWidth: minWidth }}>
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={
                      sortable && header.column.getToggleSortingHandler()
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {
                      { asc: "⬆", desc: "⬇" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
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
    </>
  );
};
