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

        [HttpPost]
        [Route("DeleteUser")]

        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = await _adminService.DeleteUser(id);
            return response;
        }
        [HttpPost]
        [Route("AddInterviewCandidate")]
        public async Task<ApiResponse<string>> AddCandidate(AddCandidateRequest req)
        {
            var response = await _adminService.AddCandidate(req);
            return response;
        }
        

        [HttpGet]
        [Route("GetAllCandidateData")]
        public async Task<List<InterviewResponse>> GetAllCandidateData(bool isDataFilter, string? Name)
        
        {
            var response = await _adminService.GetCandidate( isDataFilter,Name);
            return response;
        }
        

        [HttpPost]
        [Route("UpdateCandidate")]
        public async Task<ApiResponse<string>> UpdateCandidate(UpdateCandidateRequest req)
        {
            var response = await _adminService.UpdateCandidate(req);
            return (response);
        }
       

       
        [HttpPost]
        [Route("Addapplicant")]
        public async Task<ApiResponse<string>> Addapplicant(AddApplicantRequest req)
        {
            var response = await _adminService.Addapplicant(req);
            return response;
        }
        [HttpPost]
        [Route("Deleteapplicant")]
        public async Task<UpdateUserResponse> Deleteapplicant(int id)
        {
            var response = await _adminService.Deleteapplicant(id); 
            return response;
        }
        [HttpPost]
        [Route("Getimageapplicant")]
        public async Task<InterviewListResponse> Getimageapplicant(int id)
        {
            var response = await _adminService.Getimageapplican(id);
            return response;
        }
        [HttpPost]
        [Route("GenerateExcelFile")]
        public async Task<string> GenerateExcelFile(GenerateExcellRequest req)
        {
            var response = await _adminService.GenerateExcelFile(req);
            return response;

        }
        [HttpPost]
        [Route("Getuserid")]
        public async Task<List<UserListResponse>> Getuserid()
        {
            var response = await _adminService.Getuserid();
            return response;

        }




    }
}
