using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class IPResponse
    {
        public string IPAddress { get; set; }
        public string UserAgent { get; set; }
    }
}
