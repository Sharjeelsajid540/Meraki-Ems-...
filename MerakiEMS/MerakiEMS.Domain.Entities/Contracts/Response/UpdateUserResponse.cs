using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class UpdateUserResponse
    {
        public Boolean IsSuccess { get; set; }
        public string SuccessMessage { get; set; }
        public List<string> Errors { get; set; }
    }
}
