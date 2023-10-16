using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class AttendanceListResponse
    {
        public int UserID { get; set; }
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? CheckInTime { get; set; }
        public string? CheckOutTime { get; set; }
        public string? WorkingHours { get; set; }
        public string? CreatedAt { get; set; }
        public bool? IsLate { get; set; }
        public bool? IsHourCompleted { get; set; }
        public string? ComputerName { get; set; }
        public string? IPAddress { get; set; }

       
    }
}
