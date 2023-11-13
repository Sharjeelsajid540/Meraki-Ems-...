using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface IPerformanceService
    {
        Task<ApiResponse<string>> AddPerform(PerformanceRequest req);
        Task<ApiResponse<string>> UpdatePerformance(UpdatePerformanceRequest request);
        Task<ApiResponse<List<PerformanceResponse>>> GetPerform();
    }
}
