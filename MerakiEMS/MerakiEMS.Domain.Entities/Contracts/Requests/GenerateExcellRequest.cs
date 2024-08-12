using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class GenerateExcellRequest
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public List<NameValue> Name { get; set; }
    }

    public class NameValue
    {
        public string Value { get; set; }
        public string Label { get; set; }
    }


}
