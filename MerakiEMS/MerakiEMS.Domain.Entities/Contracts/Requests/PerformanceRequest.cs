using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class PerformanceRequest
    {
      

        public string? Severity { get; set; }
        public DateTime SpecifiedDate { get; set; }

        public string? Comments { get; set; }

        public string? Name { get; set; }
    }
}
