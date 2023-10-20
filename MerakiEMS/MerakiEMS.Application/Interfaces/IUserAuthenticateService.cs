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
using Microsoft.AspNetCore.Http;

namespace MerakiEMS.Application.Interfaces
{
    public interface IUserAuthenticateService
    {
        Task<LoginResponse> LoginUser(LoginRequest request);
        Task<ApiResponse<string>> AddUser(AddEmployeeRequest req);
        Task<List<Role>> GetRoleList();
        Task<CheckInResponse> InsertAttendance(CheckInRequest req);
        Task<CheckoutResponse> UpdateAttendance(CheckOutRequest req);
        Task<List<AttendanceListResponse>> GetAttendanceList();
        Task<List<AttendanceListResponse>> GetSingleAttendanceList(UserAttendanceRequest req);

        Task<ApiResponse<string>> RequestLeave(LeaveRequest req);
        Task<AdminLeaveResponse> AdminLeaveRequest(AdminRequest req);
        Task<List<GetUsersResponse>> GetAllUsers();
        Task<GetUsersResponse> GetUser(int id);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest user);
        Task<UpdateUserResponse> DeleteUser(int id);
        Task<List<LeaveResponse>> GetLeave();

        Task<List<ManagerListResponse>> GetManagerList();
        Task<List<LeaveResponse>> GetAllLeaves(UserID user);
       Task<AddTicketResponse> AddTicket(Tickets ticket);
        Task<List<GetTicketResponse>> GetAllTickets();
        Task<List<GetTicketResponse>> GetTickets(int id);
        Task<AddTicketResponse> UpdateTickets(UpdateTicketRequest req);

        Task<EmailResult> SendLeaveEmail(EmailID email);

        Task<ApiResponse<string>> AddPerform(PerformanceRequest req);

        Task<List<PerformanceResponse>> GetPerform();
        Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req);

        Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req);

        Task<List<UserListResponse>> GetUserList();

        Task<FineResponse> FinePaid(FineRequest req);
        Task<int> FineCount(int UserID);
    }
}
