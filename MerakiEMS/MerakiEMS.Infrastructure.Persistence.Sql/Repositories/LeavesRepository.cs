using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
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
    public class LeavesRepository : ILeavesRepository
    {
        private readonly UserContext _context;

        public LeavesRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<LeaveEmailResponse> SendLeaveEmail(EmailID req)
        {
            var userIdsWithRole1 = await _context.UserRole
                .Where(ur => ur.RoleID == 1 && ur.UserID != req.ID)
                .Select(ur => ur.UserID)
                .ToListAsync();

            var user = await _context.User
                .Where(u => u.ID == req.ID)
                .FirstOrDefaultAsync();

            if (user != null)
            {
                var manager = await _context.User
                    .Where(u => u.ID == user.ManagerID)
                    .FirstOrDefaultAsync();

                if (manager != null)
                {
                    var leaveData = await _context.Leave
                        .Where(x => x.UserID == req.ID)
                        .FirstOrDefaultAsync();

                    if (leaveData != null)
                    {
                        var response = new LeaveEmailResponse();
                        response.ID = req.ID;
                        response.ManagerName = manager.Name;
                        response.EmpName = user.Name;
                        response.Description = req.Description;
                        response.From = req.From;
                        response.To = req.To;
                        var userEmails = await _context.User
                            .Where(u => userIdsWithRole1.Contains(u.ID))
                            .Select(u => u.Email)
                            .ToListAsync();

                        response.Emails = userEmails;
                        return response;
                    }
                }
            }
            return null;
        }

        public async Task<Leave> AdminLeaveRequest(AdminRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            var CheckIn = await _context.Leave.Where
            (s => s.ID == req.ID).FirstOrDefaultAsync();
            if (CheckIn != null)
            {
                CheckIn.AdminRequestViewer = req.AdminRequestViewer;
                CheckIn.Status = req.Status;
                CheckIn.Comments = req.Comments;
                CheckIn.UpdatedAt = Time;
                await _context.SaveChangesAsync();
            }
            return CheckIn;
        }

        public async Task<Leave> RequestLeave(LeaveRequest req)
        {
            var pakistanTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time");
            var Time = TimeZoneInfo.ConvertTime(DateTime.Now, pakistanTimeZone);
            Leave leave = new Leave
            {
                ID = req.ID,
                UserID = req.UserID,
                Name = req.Name,
                From = req.From,
                To = req.To,
                Description = req.Description,
                Comments = req.Comments,
                UpdatedAt = req.UpdatedAt,
                LeaveType = req.LeaveType,
                CreatedAt = Time,
                AdminRequestViewer = "",
                Status = "Pending"
            };

            _context.Leave.Add(leave);
            await _context.SaveChangesAsync();
            return leave;
        }
        public async Task<List<Leave>> GetAllLeave(bool isLeaveFilter)
        {
            IQueryable<Leave> query = _context.Leave;

            if (isLeaveFilter)
            {
                query = query.Where(s => s.Status == "Pending");
            }

            query = query.OrderByDescending(s => s.ID);

            var response = await query.ToListAsync();
            return response;
        }
        public async Task<List<Leave>> GetLeave(UserID user)
        {
            var response = await _context.Leave.Where(s => s.UserID == user.ID).OrderByDescending(s => s.From).ToListAsync();
            return response;
        }
    }
}
