using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class ExcellSheetResponse
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public TimeSpan? WorkingHours { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Name { get; set; }
        public bool? IsLate { get; set; }
        public bool? IsHourCompleted { get; set; }
        public string? FinePaid { get; set; }
        public DateTime? PaidDate { get; set; }

    }
}
