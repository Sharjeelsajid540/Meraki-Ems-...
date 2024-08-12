using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class FineRequest
    {
        public int ID { get; set; }

        public string? FinePaid { get; set; }
    }
}
