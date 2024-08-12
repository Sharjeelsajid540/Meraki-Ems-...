using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class Posts
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }
        public int IsActive { get; set; }
        public DateTime DateTime { get; set; }
    }
}
