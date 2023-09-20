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

        public int UserID { get; set; }

        public string? From { get; set; }

        public string? To { get; set; }

        public string? Description { get; set; }

        public string? CreatedAt { get; set; }

        public string? AdminRequestViewer { get; set; }

        public string? Comments { get; set; }

        public string Status { get; set; }

        public string? UpdatedAt { get; set; }
    }
}
