using MerakiEMS.Application.Contracts.Requests;
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
    public class AdminController : Controller
    {
        private readonly IAdminService _adminService;


        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;

        }
        [HttpPost]
        [Route("AddUser")]
        public async Task<ApiResponse<string>> AddUser(AddEmployeeRequest req)
        {
            var response = await _adminService.AddUser(req);
            return response;
        }

        [HttpGet]
        [Route("UserRole")]
        public async Task<List<Role>> GetRole()
        {
            var response = await _adminService.GetRoleList();
            return response;
        }

        [HttpGet]
        [Route("ManagerList")]
        public async Task<List<ManagerListResponse>> ManagerList()
        {
            var response = await _adminService.GetManagerList();
            return response;
        }
        [HttpPost]
        [Route("UpdateUser")]
        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user)
        {
            var response = await _adminService.UpdateUser(user);
            return response;
        }

        [HttpDelete]
        [Route("DeleteUser")]

        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = await _adminService.DeleteUser(id);
            return response;
        }
    }
}
