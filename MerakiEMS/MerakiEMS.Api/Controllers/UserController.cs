using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Application.Services;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<List <Role>> GetRole()
        {
            var response = await _authenticateService.GetRoleList();
            return response;
        }
        [HttpPost]
        [Route("UserCheckIn")]
        public async Task<CheckInResponse> AddUserAttendance(CheckInRequest req)
        {
            var response = await _authenticateService.InsertAttendance(req);
            return response;
        }
        [HttpPut]
        [Route("UserCheckOut")]
        public async Task<CheckoutResponse> UpdateUserAttendance(CheckOutRequest req)
        {
            var response = await _authenticateService.UpdateAttendance(req);
            return response;
        }
        [HttpGet]
        [Route("UserAttendance")]
        public async Task<List<UserAttendance>> GetUserAttendance()
        {
            var response = await _authenticateService.GetAttendanceList();
            return response;
        }
    }
}
