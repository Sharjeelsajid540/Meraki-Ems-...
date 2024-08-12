using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class EmailID
    {
        public int ID { get; set; }

        public DateTime? From { get; set; }

        public DateTime? To { get; set; }

        public string? Description { get; set; }
    }
}
