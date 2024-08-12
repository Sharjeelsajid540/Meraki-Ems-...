using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class Leave
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public string? Name { get; set; }

        public DateTime? From { get; set; }

        public DateTime? To { get; set; }

        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? AdminRequestViewer { get; set; }

        public string? Status { get; set; }

        public string? Comments { get; set; }
        public string? LeaveType { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
