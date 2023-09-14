using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class AttendanceResponse2
    {
       
        public List<Attendance2> GroupedAttendanceList { get; set;}
    }
    public class Attendance2
    {
        public string? AttendanceDate { get; set; }
        public string? TotalWorkingHours { get; set; }
        public List<AttendanceListResponse> AttendanceList { get; set; }
    }
}
