import React from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

export const AttendanceTable = ({
  data,
  columns,
  minHeight,
  pageIndex,
  pageSize,
  totalPages,
  handleGoToPage,
  handlePageSizeChange,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div style={{ minHeight: minHeight }}>
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
      {totalPages > 1 ? (
        <div className="menu-list">
          <div className="FooterOptions">
            <button className="FooterBtn" onClick={() => handleGoToPage(1)}>
              {"<<"}
            </button>
            <button
              className="FooterBtn"
              disabled={pageIndex === 0}
              onClick={() => handleGoToPage(pageIndex)}
            >
              {"<"}
            </button>
            <button
              className="FooterBtn"
              disabled={pageIndex === totalPages - 1}
              onClick={() => handleGoToPage(pageIndex + 2)}
            >
              {">"}
            </button>
            <button
              className="FooterBtn"
              onClick={() => handleGoToPage(totalPages)}
            >
              {">>"}
            </button>
            <span className="FooterOptions">
              <div>Page</div>
              <strong>
                {pageIndex + 1} of {totalPages}
              </strong>
            </span>
            <span className="FooterOptions">
              | Go to page:
              <input
                type="number"
                value={pageIndex + 1}
                onChange={(e) => handleGoToPage(e.target.value)}
                min="1"
                max={totalPages}
                className="border p-1 rounded w-16"
              />
            </span>
            <span className="FooterOptions">
              | Page Size:
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
