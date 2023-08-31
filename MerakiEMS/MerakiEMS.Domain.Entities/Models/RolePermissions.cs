using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class RolePermissions
    {
        public int ID { get; set; }
        public int RoleID { get; set; }
        public int PermissionID { get; set; }
    }
}
