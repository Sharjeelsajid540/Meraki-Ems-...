using MailKit.Security;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System.Net.Mail;
using MailKit.Net.Smtp;
using MerakiEMS.Application.Services;
using UAParser;
using Org.BouncyCastle.Asn1.Ocsp;

namespace MerakiEMS.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserAuthenticateService _authenticateService;


        public UserController(IUserAuthenticateService authenticateService)
        {
            _authenticateService = authenticateService;

        }
        [HttpPut]
        [Route("FinePaid")]
        public async Task<FineResponse> FinePaid(FineRequest req)
        {
            var response = await _authenticateService.FinePaid(req);

            return response;
        }


        [HttpPost]
        [Route("AddLeave")]
        public async Task<ApiResponse<string>> LeaveRequestByAdmin(LeaveRequest req)
        {
            var response = await _authenticateService.RequestLeave(req);

            return response;
        }

        [HttpPost]
        [Route("AddPerform")]
        public async Task<ApiResponse<string>> AddPerform(PerformanceRequest req)
        {
            var response = await _authenticateService.AddPerform(req);

            return response;
        }
        [HttpGet]
        [Route("GetPerformance")]
        public async Task<List<PerformanceResponse>> GetPerform()
        {
            var response = await _authenticateService.GetPerform();
            return response;
        }


        [HttpPut]
        [Route("AdminRequest")]
        public async Task<AdminLeaveResponse> LeaveAdminRequest(AdminRequest req)
        {
            var response = await _authenticateService.AdminLeaveRequest(req);

            return response;
        }
        [HttpPut]
        [Route("UserCheckOut")]
        public async Task<CheckoutResponse> UpdateUserAttendance(CheckOutRequest req)
        {
            var response = await _authenticateService.UpdateAttendance(req);
            return response;
        }



        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (request == null) return BadRequest();
            var response = await _authenticateService.LoginUser(request);
            return Ok(response);

        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<ApiResponse<string>> AddUser(AddEmployeeRequest req)
        {
            var response = await _authenticateService.AddUser(req);
            return response;
        }
        [HttpGet]
        [Route("UserRole")]
        public async Task<List<Role>> GetRole()
        {
            var response = await _authenticateService.GetRoleList();
            return response;
        }
        [HttpGet]
        [Route("ManagerList")]
        public async Task<List<ManagerListResponse>> ManagerList()
        {
            var response = await _authenticateService.GetManagerList();
            return response;
        }
        [HttpPost]
        [Route("UserCheckIn")]
        public async Task<CheckInResponse> AddUserAttendance(CheckInRequest req)
        {


            var response = await _authenticateService.InsertAttendance(req);

            return response;
        }

        [HttpGet]
        [Route("AllUserAttendance")]
        public async Task<List<AttendanceListResponse>> GetUserAttendance()
        {
            var response = await _authenticateService.GetAttendanceList();
            return response;
        }
        [HttpPost]
        [Route("UserAttendance")]
        public async Task<List<AttendanceListResponse>> GetSingleUserAttendance(UserAttendanceRequest req)
        {
            var response = await _authenticateService.GetSingleAttendanceList(req);
            return response;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<List<GetUsersResponse>> GetAllUsers()
        {
            var response = await _authenticateService.GetAllUsers();
            return response;
        }
        [HttpPost]
        [Route("SendEmail")]
        public async Task<EmailResult> SendLeaveEmail(EmailID email)
        {
            var response = await _authenticateService.SendLeaveEmail(email);
            return response;
        }

        [HttpPost]
        [Route("GetUser")]
        public async Task<GetUsersResponse> GetUser(int id)
        {
            var response = await _authenticateService.GetUser(id);
            return response;
        }
        [HttpPost]
        [Route("UpdateUser")]
        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user)
        {
            var response = await _authenticateService.UpdateUser(user);
            return response;
        }

        [HttpDelete]
        [Route("DeleteUser")]

        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = await _authenticateService.DeleteUser(id);
            return response;
        }
        [HttpGet]
        [Route("GetAllLeave")]
        public async Task<List<LeaveResponse>> GetLeave()
        {
            var response = await _authenticateService.GetLeave();
            return response;
        }

        [HttpPost]
        [Route("GetLeave")]
        public async Task<List<LeaveResponse>> GetAllLeaves(UserID user)
        {
            var response = await _authenticateService.GetAllLeaves(user);
            return response;
        }
        [HttpPost]
        [Route("AddTicket")]
        public async Task<AddTicketResponse> AddTicket(Tickets ticket)
        {
            var response = await _authenticateService.AddTicket(ticket);
            return response;
        }
        [HttpGet]
        [Route("GetAllTickets")]
        public async Task<List<GetTicketResponse>> GetAllTickets()
        {
            var response = await _authenticateService.GetAllTickets();
            return response;
        }
        [HttpPost]
        [Route("GetTickets")]
        public async Task<List<GetTicketResponse>> GetTickets(int id)
        {
            var response = await _authenticateService.GetTickets(id);
            return response;
        }
        [HttpPut]
        [Route("UpdateTicket")]
        public async Task<AddTicketResponse> UpdateTicket(UpdateTicketRequest request)
        {
            var response = await _authenticateService.UpdateTickets(request);
            return response;
        }
        [HttpGet]
        [Route("Test")]
        public async Task<string> Test()
        {
            var response = "Successful";
            return response;
        }

        [HttpGet]
        [Route("ComputerName")]
        public string GetComputerName()
        {
            return Environment.MachineName;
        }
        [HttpPost]
        [Route("CheckCheckIn")]
        public async Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req)
        {
            var response = await _authenticateService.CheckCheckIn(req);
            return response;
        }

        [HttpPost]
        [Route("CheckCheckOut")]
        public async Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req)
        {
            var response = await _authenticateService.CheckCheckOut(req);
            return response;
        }
        [HttpGet]
        [Route("UserList")]
        public async Task<List<UserListResponse>> UserList()
        {
            var response = await _authenticateService.GetUserList();
            return response;
        }
        [HttpPost]
        [Route("FineCount")]
        public async Task<int> FineCount(int UserID)
        {
            var response = await _authenticateService.FineCount(UserID);
            return response;
        }
    }
    
}
