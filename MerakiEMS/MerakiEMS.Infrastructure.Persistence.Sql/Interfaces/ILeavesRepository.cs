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
        Task<List<Leave>> GetAllLeave(bool isLeaveFilter);
        Task<List<Leave>> GetLeave(UserID user);
        Task<Leave> RequestLeave(LeaveRequest lev);
        Task<Leave> AdminLeaveRequest(AdminRequest req);
        Task<LeaveEmailResponse> SendLeaveEmail(EmailID email);
    }
}
