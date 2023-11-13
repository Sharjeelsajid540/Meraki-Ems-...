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
    public interface ILeavesService
    {
        Task<ApiResponse<string>> RequestLeave(LeaveRequest req);
        Task<AdminLeaveResponse> AdminLeaveRequest(AdminRequest req);
        Task<List<LeaveResponse>> GetAllLeave(bool isLeaveFilter);
        Task<List<LeaveResponse>> GetLeave(UserID user);
        Task<EmailResult> SendLeaveEmail(EmailID email);
    }
}
