using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class AttendanceFilter
    {
        public bool IsLateFilter { get; set; }
        public string? Name { get; set; }
        public DateTime? Date { get; set; }

        public bool FineStatus { get; set; }
    }
}
