using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Contracts.Requests
{
    public class AddEmployeeRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public int UserID { get; set; }
        public int RoleID { get; set; }
        public string Email { get; set; }
        public string CNIC { get; set; }
        public string ContactNo { get; set; }
        public string EContactNo { get; set; }
        public int ManagerID { get; set; }
        public string Address { get; set; }

    }
}
