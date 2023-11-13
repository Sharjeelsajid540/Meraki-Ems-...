using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class UpdatePerformanceRequest
    {
        public int PerformanceID { get; set; }

        public string? Severity { get; set; }
        public DateTime SpecifiedDate { get; set; }

        public string? Comments { get; set; }

    }
}
