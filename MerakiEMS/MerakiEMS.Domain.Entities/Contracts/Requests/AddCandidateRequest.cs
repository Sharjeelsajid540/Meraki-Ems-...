using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class AddCandidateRequest

    { 

        public string? ContactNo { get; set; }
        public DateTime Date { get; set; }

        public string? Comments { get; set; }
        public string? Email { get; set; }

        public string? Name { get; set; }
        public string? Rating { get; set; }

    }
}
