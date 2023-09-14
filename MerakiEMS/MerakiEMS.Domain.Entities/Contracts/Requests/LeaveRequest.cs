using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class LeaveRequest
    {


        public int UserID { get; set; }

        

        public string? From { get; set; }

        public string? To { get; set; }

        public string? Description { get; set; }







    }
}
