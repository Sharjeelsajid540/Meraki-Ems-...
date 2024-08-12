using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Contracts.Response
{
    public class ApiResponse<T>
    {
        public bool IsRequestSuccessful { get; set; }
        public T SuccessResponse { get; set; }
        public List<string> Errors { get; set; }
        public string Token { get; set; }
        public bool IsSuccess { get; set; }
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public DateTime DataCreated { get; set; }
    }
}
