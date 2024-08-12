using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class PerformanceResponse
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string? EmployeeName { get; set; }

        public string? Severity { get; set; }

        public string? Date { get; set; }
        public string? SpecifiedDate { get; set; }

        public string? Comments { get; set; }
        public List<string> Errors { get; set; }
    }
}
