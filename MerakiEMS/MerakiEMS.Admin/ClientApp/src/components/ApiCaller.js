// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AttendanceTable } from "./AttendanceTable"; // Import the GridTable component

// export const APICaller = () => {
//   const [data, setData] = useState([]);
//   const [filtering, setFiltering] = useState("");
//   const [pageIndex, setPageIndex] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     // Fetch data from the API whenever filtering, pageIndex, or pageSize changes
//     axios
//       .get(`https://localhost:7206/api/User/ProductsList?pageNumber={pageNumber:pageIndex + 1}&pageSize={pageSize}`
    
       
//       )
//       .then((response) => {
//         setData(response.data.userAttendanceData);
//         setTotalPages(response.data.totalPages);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [pageSize, pageIndex, filtering]);

//   const handleGoToPage = (page) => {
//     setPageIndex(page - 1);
//   };

//   const handlePageSizeChange = (size) => {
//     setPageSize(size);
//     setPageIndex(0);
//   };

//   // Define your columns as needed
//   const columns = [
//     // Define your column configuration here
//   ];

//   return (
//     <div>
//       {/* Render your GridTable component and pass necessary props */}
//       <AttendanceTable
//         data={data}
//         columns={columns}
//         minHeight="400px"
//         pageIndex={pageIndex}
//         pageSize={pageSize}
//         totalPages={totalPages}
//         handleGoToPage={handleGoToPage}
//         handlePageSizeChange={handlePageSizeChange}
//       />
//     </div>
//   );
// };
