using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Application.Interfaces
{
    public interface IAdminService
    {
        Task<ApiResponse<string>> AddUser(AddEmployeeRequest req);
        Task<UpdateUserResponse> DeleteUser(int id);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user);
        Task<List<ManagerListResponse>> GetManagerList();
        Task<List<Role>> GetRoleList();
        Task<ApiResponse<string>> AddCandidate(AddCandidateRequest req);
        Task<List<InterviewResponse>> GetCandidate(bool isDataFilter, string? Name);
        
        Task<ApiResponse<string>> UpdateCandidate(UpdateCandidateRequest req);
        
        Task<ApiResponse<string>> Addapplicant(AddApplicantRequest req);
        Task<UpdateUserResponse> Deleteapplicant(int id);
        Task<InterviewListResponse> Getimageapplican(int id);
        Task<string> GenerateExcelFile (GenerateExcellRequest req);
        Task<List<UserListResponse>> Getuserid();
    }
}
