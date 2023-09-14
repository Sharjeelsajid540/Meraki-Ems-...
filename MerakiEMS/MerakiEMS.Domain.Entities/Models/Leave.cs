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

        public string? From { get; set; }

        public string? To { get; set; }

        public string? Description { get; set; }

        public DateTime? CreatedAt { get; set; }

        public string? AdminRequestViewer { get; set; }
    }
}
