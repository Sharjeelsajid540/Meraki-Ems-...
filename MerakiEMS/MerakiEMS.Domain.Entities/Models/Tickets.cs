using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class Tickets
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public int RequesterID { get; set; }
        public string RequesterName { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Reviewer { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
