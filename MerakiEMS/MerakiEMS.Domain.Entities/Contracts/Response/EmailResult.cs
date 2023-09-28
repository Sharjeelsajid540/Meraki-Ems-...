using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class EmailResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
