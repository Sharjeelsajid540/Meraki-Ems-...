using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class GetUsersResponse
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }

    }
}
