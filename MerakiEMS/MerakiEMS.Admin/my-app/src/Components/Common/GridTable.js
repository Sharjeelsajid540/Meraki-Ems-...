import React, { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export const GridTable = ({ data, columns, sortable, role }) => {
  const [sorting, setSorting] = useState([]);
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

  table.getState().pagination.pageSize = 8;
  var tableSize = 0;
  if (data && data.length > 0) {
    tableSize = table.getPageCount();
  }

  return (
    <>
      <div>
        <div
          className={`bg-white ml-3 mr-3 px-5 shadow-lg border rounded-[20px] overflow-auto ${
            role === "User" ? "max-h-400px" : "max-h-470px"
          } 3xl:max-h-720px `}
        >
          <table className="table table-stripe relative">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="bg-custom-blue text-white" key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isFirst = index === 0;
                    const isLast = index === headerGroup.headers.length - 1;
                    return (
                      <th
                        key={header.id}
                        onClick={
                          sortable && header.column.getToggleSortingHandler()
                        }
                        className={` ${isFirst ? "rounded-l-[10px]" : ""} ${
                          isLast ? "rounded-r-[10px]" : ""
                        }`}
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
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody>
              {data && data.length > 0 ? (
                table.getRowModel().rows.map((row) => (
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
                ))
              ) : (
                <tr>
                  <td>No Data Avaliable</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {tableSize > 1 ? (
          <div className="flex justify-center">
            <div className="flex items-center mt-10 gap-20 bg-custom-blue text-white px-10  rounded-3xl shadow-md">
              <button
                className="rounded px-2"
                onClick={() => table.setPageIndex(0)}
              >
                {"<<"}
              </button>
              <button
                className="rounded px-2"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                {"<"}
              </button>
              <button
                className="rounded px-2"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                {">"}
              </button>
              <button
                className="rounded px-2"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                {">>"}
              </button>
              <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                  {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
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
                  className="border p-3 rounded w-20 bg-custom-blue text-white focus:outline-none border-none"
                />
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
