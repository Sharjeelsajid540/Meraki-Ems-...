using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Models
{
    public class Interviews
    {
        [Key]
        public int ID { get; set; }


        public string? EmployeeName { get; set; }

        public string? ContactNo { get; set; }
        public DateTime? Date { get; set; }
        public string? Email { get; set; }
        public string? Comments { get; set; }
        public string? Experience { get; set; }
        public string? ProgrammingLanguage { get; set; }
        public string? Status { get; set; }
        public string? File { get; set; }
        public string? Rating { get; set; }
        public string? OverallRating { get; set; }
        public string? Discipline { get; set; }

        public string? ProfessionalAttitude { get; set; }
      
    }
       
}
