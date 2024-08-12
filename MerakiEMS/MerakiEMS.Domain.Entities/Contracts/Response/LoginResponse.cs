using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Contracts.Response
{
    public class LoginResponse
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public bool IsCheckedIn { get; set; }
        public bool IsCheckedOut { get; set; }
        public string UserRole { get; set; }
        public int RoleID { get; set; }
        public List<string> UserPermissions { get; set; }
        
        public  List<int> PermissionID { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }

    }
}
