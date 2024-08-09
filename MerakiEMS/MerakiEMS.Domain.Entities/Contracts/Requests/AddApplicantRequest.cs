using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Domain.Entities.Contracts.Requests
{
    public class AddApplicantRequest
    {
        public int ID { get; set; }
        public string? EmployeeName { get; set; }
        public string? ContactNo { get; set; }
        public DateTime? Date { get; set; }
        public string? Email { get; set; }
        public string? Comments { get; set; }
        public string? Experience { get; set; }
        public string? ProgrammingLanguage { get; set; }

        // Change from method-like syntax to a regular property
        public string? Status { get; set; }

        public string? File { get; set; }
        public string? Rating { get; set; }
        public string? OverallRating { get; set; }
        public string? Discipline { get; set; }
        public string? ProfessionalAttitude { get; set; }
    }

}
