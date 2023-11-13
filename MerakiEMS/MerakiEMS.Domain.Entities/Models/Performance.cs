using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class Performance
    {
        [Key]
        public int ID { get; set; }
        public int UserID { get; set; }

        public string? EmployeeName { get; set; }

        public string? Severity { get; set; }
        public DateTime? Date { get; set; }
        public DateTime? SpecifiedDate { get; set; }
        public string? Comments { get; set; }
    }
}
