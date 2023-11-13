using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Application.Interfaces;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using MerakiEMS.Infrastructure.Persistence.Sql.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _adminRepository;

        public AdminService(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _adminRepository.UpdateUser(user);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;

        }
        public async Task<ApiResponse<string>> AddUser(AddEmployeeRequest req)
        {
            var response = new ApiResponse<string>();
            if (req == null)
            {
                response.IsRequestSuccessful = false;
                response.SuccessResponse = "User fields can not be empty!";
            }
            else
            {
                var postt = await _adminRepository.InsertUser(req);
                if (postt == null)
                {
                    response.IsRequestSuccessful = false;
                    response.SuccessResponse = "User Already Exists!";

                }
                else
                {
                    response.IsRequestSuccessful = true;
                    response.SuccessResponse = "User added successfully";
                }

            }

            return response;

        }

        public async Task<UpdateUserResponse> DeleteUser(int id)
        {
            var response = new UpdateUserResponse();
            try
            {
                var res = await _adminRepository.DeleteUser(id);
                if (res == null)
                {
                    response.SuccessMessage = "Invalid User ID!";

                }
                else
                {
                    response.IsSuccess = true;
                    response.SuccessMessage = "User Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.SuccessMessage += ex.Message;

            }
            return response;

        }

        public async Task<List<Role>> GetRoleList()
        {
            var response = await _adminRepository.RoleList();
            return response;
        }
        public async Task<List<ManagerListResponse>> GetManagerList()
        {
            var response = await _adminRepository.MangerList();
            return response;
        }
    }
}
