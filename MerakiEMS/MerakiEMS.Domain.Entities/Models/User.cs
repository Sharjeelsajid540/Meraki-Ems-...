using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class User
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? CNIC { get; set; }
        public string? ContactNo { get; set; }
        public string? EContactNo { get; set; }
        public string? Address { get; set; }
        public int? ManagerID { get; set; }
        public int? TotalLeaves { get; set; }
        public string? Image { get; set; }


    }
}
