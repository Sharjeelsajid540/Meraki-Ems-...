using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Repositories
{
    public class PerformanceRepository : IPerformanceRepository
    {
        private readonly UserContext _context;
        public PerformanceRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<Performance> AddPerform(PerformanceRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var user = await _context.User
               .Where(u => string.Equals(u.Name, req.Name))
               .FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            Performance perform = new Performance();
            perform.UserID = user.ID;
            perform.EmployeeName = user.Name;
            perform.Severity = req.Severity;
            perform.Date = Time;
            perform.SpecifiedDate = req.SpecifiedDate;
            perform.Comments = req.Comments;
            await _context.Performance.AddAsync(perform);
            await _context.SaveChangesAsync();
            return perform;
        }

        public async Task<List<Performance>> GetPerform()
        {
            var response = await _context.Performance.OrderByDescending(s => s.Date).ToListAsync();
            return response;
        }
        public async Task<bool> UpdatePerformance(UpdatePerformanceRequest request)
        {
            var performanceData = await _context.Performance.Where(c => c.ID == request.PerformanceID).FirstOrDefaultAsync();
            if (performanceData != null)
            {
                performanceData.Severity = request.Severity;
                performanceData.SpecifiedDate = request.SpecifiedDate;
                performanceData.Comments = request.Comments;
                await _context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
