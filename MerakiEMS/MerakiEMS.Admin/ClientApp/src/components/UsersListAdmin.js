import React, { useState, useMemo, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { fetchAllAttendanceData } from '../Api/Api';
import './css/UserListAdmin.css';


function UsersListAdmin() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filtering, setFiltering] = useState('')


  function calculateTotalHours(timeString) {
    if (!timeString) {
      console.log("first")
      return 0; // Handle the case where timeString is undefined or empty
    }
  
    // Split the timeString by ':' and convert to hours
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
  
    // Calculate the total hours
    const totalHours = hours + minutes / 60 + seconds / 3600;
  
    return totalHours;
  }
  
  // Define a function to apply conditional formatting based on total hours
  function getWorkingHoursColor(workingHours) {
    if (workingHours < 8.5) {
      
      return 'red';
    } else if (workingHours >= 8.5 && workingHours < 9) {
      return 'orange';
    } else {
      return 'green';
    }
  }
  
  // Define a function to render the "Working Hours" cell with conditional formatting
  const renderWorkingHoursCell = (cell) => {
    const cellValue = cell.getValue();

    // Calculate total hours from the "HH:MM:SS" format (with error handling)
    const totalHours = calculateTotalHours(cellValue);
  
    // Calculate the CSS class based on the total hours
    const colorClass = getWorkingHoursColor(totalHours);
  
    return (
      <span className={colorClass}>
        
        {cellValue}
      </span>
    );
  };
  const columns = [
    {
      header:'Employee ID',
      accessorKey:'userID',
    },
    {
      header:'Name',
      accessorKey:'name',
    },
    {
      header:'CheckIn Time',
      accessorKey:'checkInTime',
    },
    {
      header:'CheckOut Time',
      accessorKey:'checkOutTime',
    },
    {
      header:'Working Hours',
      accessorKey:'workingHours',
      cell: renderWorkingHoursCell,
    },
    {
      header:'Date',
      accessorKey:'createdAt',
    }
    
  ]
  useEffect(() => {
    
    fetchAllAttendanceData().then((response) => {
      if (response) {
        
        setAttendanceData(response);
      }
      
    });
  }, []);


 const data = useMemo(()=> attendanceData,[attendanceData])
 
 const table =useReactTable({
  data,
  columns, 
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state:{
    globalFilter:filtering
  },
  onGlobalFilterChange: setFiltering 
 });

table.getState().pagination.pageSize = 7;
  return (
    <div>
      <h2 className='headingList'>Employees Attendance List</h2>
      <div className='table-div'>
        <div className='globar-filter'>
        <input className='filter-input' placeholder='Filter Table' type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>
        </div>
      <table className="table">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>  
          {headerGroup.headers.map(header => (
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
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell,
                    cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
         
        </tbody>
      </table>
      </div>
      <div className="menu-list">
      <div className="FooterOptions">
        <button className='FooterBtn' onClick={()=> table.setPageIndex(0)}>{'<<'}</button>
        <button className='FooterBtn' disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()}>{'<'}</button>
        <button className='FooterBtn' disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()}>{'>'}</button>
        <button className='FooterBtn' onClick={()=> table.setPageIndex(table.getPageCount() - 1)}>{'>>'}</button>
        <span className="FooterOptions">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="FooterOptions">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>
      </div>
    </div>
  );
}

export default UsersListAdmin;
