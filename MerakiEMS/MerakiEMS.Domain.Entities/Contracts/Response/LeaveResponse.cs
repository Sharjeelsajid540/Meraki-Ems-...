using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class LeaveResponse
    {
        public int ID { get; set; }

        public int From { get; set; }

        public int To { get; set; }

        public string? Description { get; set; }

        public string? CreatedAt { get; set; }

        public string? RequestViewer { get; set; }
    }
}
