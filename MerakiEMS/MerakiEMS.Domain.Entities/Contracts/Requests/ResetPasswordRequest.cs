using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class ResetPasswordRequest
    {
        
        public string ResetToken { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
