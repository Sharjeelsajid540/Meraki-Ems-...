using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class CheckOutRequest
    {
        public int AttendanceID { get; set; }
        public DateTime CheckOutTime { get; set;}
        public int UserID { get; set; } 
       
    }
}
