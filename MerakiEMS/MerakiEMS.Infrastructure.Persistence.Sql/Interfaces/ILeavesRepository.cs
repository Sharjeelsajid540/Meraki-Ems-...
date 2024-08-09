using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface ILeavesRepository
    {


        Task<List<Leave>> GetAllLeave(bool isLeaveFilter, string Name, string Status);
        Task<List<Leave>> GetLeave(UserID user);
        Task<Leave> RequestLeave(LeaveRequest lev);
        Task<Leave> AdminLeaveRequest(AdminRequest req);
        Task<LeaveEmailResponse> SendLeaveEmail(int userId);
        Task<User> GetUserById(int userId);
        Task<Leave> GetUserByID(int id);
        Task<bool> Deleteleave(Leave leave);


    }
}
