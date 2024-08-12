using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class AdminRequest
    {
        public int? ID { get; set; }
       

        public string? AdminRequestViewer { get; set; }

        public string? Status { get; set; }

        public string? Comments { get; set; }

    }
}
