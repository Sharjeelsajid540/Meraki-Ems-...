using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        public int RoleID { get; set; }
    }
}
