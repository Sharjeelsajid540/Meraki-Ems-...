using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Contracts.Response
{
    public class LoginResponse
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }

    }
}
