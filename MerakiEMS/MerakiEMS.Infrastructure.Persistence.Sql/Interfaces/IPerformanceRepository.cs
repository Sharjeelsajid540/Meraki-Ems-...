using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IPerformanceRepository
    {
        Task<Performance> AddPerform(PerformanceRequest req);
        Task<bool> Deleteperformance(Performance prformanceToDelete);
        Task<List<Performance>> GetPerform();
        Task<Performance> GetUserByID(int id);
        Task<bool> UpdatePerformance(UpdatePerformanceRequest request);
    }
}
