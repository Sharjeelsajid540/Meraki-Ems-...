using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class AttendanceResponse
    {
       
        public List<Attendance> GroupedAttendanceList { get; set;}
    }
    public class Attendance
    {
        public DateTime? AttendanceDate { get; set; }
        public List<UserAttendance> AttendanceList { get; set; }
        public TimeSpan TotalWorkingHours { get; set; }

    }
}
