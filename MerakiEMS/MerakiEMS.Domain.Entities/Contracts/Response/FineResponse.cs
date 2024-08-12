using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class FineResponse
    {
        public string SuccessMessage { get; set; }
        public string IsRequestSuccessfull { get; set; }
        public List<string> Errors { get; set; }
    }
}
