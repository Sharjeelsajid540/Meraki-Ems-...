using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class UpdateUserRequest
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string CNIC { get; set; }
        public string ContactNo { get; set; }
        public string EContactNo { get; set; }
        public string Address { get; set; }
        public int ManagerID { get; set; }
        public int RoleID { get; set; }
    }
}
