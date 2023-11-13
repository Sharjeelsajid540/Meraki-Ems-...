using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : Controller
    {
        private readonly ILeavesService _leavesService;
        public LeavesController(ILeavesService leavesService)
        {
            _leavesService = leavesService;

        }

        [HttpPost]
        [Route("AddLeave")]
        public async Task<ApiResponse<string>> LeaveRequestByAdmin(LeaveRequest req)
        {
            var response = await _leavesService.RequestLeave(req);

            return response;
        }
        [HttpPut]
        [Route("AdminRequest")]
        public async Task<AdminLeaveResponse> LeaveAdminRequest(AdminRequest req)
        {
            var response = await _leavesService.AdminLeaveRequest(req);

            return response;
        }
        [HttpPost]
        [Route("SendEmail")]
        public async Task<EmailResult> SendLeaveEmail(EmailID email)
        {
            var response = await _leavesService.SendLeaveEmail(email);
            return response;
        }
        [HttpGet]
        [Route("GetAllLeave")]
        public async Task<List<LeaveResponse>> GetAllLeave(bool isLeaveFilter)
        {
            var response = await _leavesService.GetAllLeave(isLeaveFilter);
            return response;
        }

        [HttpPost]
        [Route("GetLeave")]
        public async Task<List<LeaveResponse>> GetLeave(UserID user)
        {
            var response = await _leavesService.GetLeave(user);
            return response;
        }
    }
}
