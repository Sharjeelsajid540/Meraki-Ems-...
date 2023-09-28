using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Response
{
    public class LeaveEmailResponse
    {
        public int ID { get; set; }

        public DateTime? From { get; set; }

        public DateTime? To { get; set; }
        public string? Description { get; set; }

        public string Email { get; set; }

        public string ManagerName { get; set; }

        public string EmpName { get; set; }



        public Boolean IsSuccess { get; set; }
        public string SuccessMessage { get; set; }
        public List<string> Errors { get; set; }

        public bool IsRequestSuccessful { get; set; }
    }
}
