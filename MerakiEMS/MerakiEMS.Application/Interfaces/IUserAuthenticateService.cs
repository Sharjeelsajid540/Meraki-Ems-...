using Microsoft.AspNetCore.Mvc;
using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;

namespace MerakiEMS.Application.Interfaces
{
    public interface IUserAuthenticateService
    {
        //Task<ApiResponse<string>> AuthenticateUser(RegisterRequest request);
        Task<LoginResponse> LoginUser(LoginRequest request);
        Task<ApiResponse<string>> AddUser(AddEmployeeRequest req);
        Task<List<Role>>GetRoleList();
        Task<CheckInResponse> InsertAttendance(CheckInRequest req);
        Task<CheckoutResponse> UpdateAttendance(CheckOutRequest req);
        Task<List<AttendanceListResponse>> GetAttendanceList();
        Task<List<AttendanceListResponse>> GetSingleAttendanceList(UserAttendanceRequest req);

        Task<ApiResponse<string>> RequestLeave(LeaveRequest lev);
        Task<List<GetUsersResponse>> GetUsers();
        Task<UpdateUserResponse> UpdateUser(User user);
        Task<UpdateUserResponse> DeleteUser(int id);
        Task<List<Leave>> GetLeave();
        Task<List<Leave>> GetAllLeaves(int id);
    }
}
