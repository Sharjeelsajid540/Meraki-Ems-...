using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class PostResponse
    {
        public int ID { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }
        public int IsActive { get; set; }
        public int PId { get; set; }
        public DateTime DateTime { get; set; }
    }
}
