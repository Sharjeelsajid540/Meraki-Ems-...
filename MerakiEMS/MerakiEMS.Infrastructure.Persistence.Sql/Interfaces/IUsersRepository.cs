﻿using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Application.Contracts.Response;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IUsersRepository
    { 
        Task<User> CheckUser( User user);
         Task<string> GenerateToken( LoginResponse response );
        Task<LoginResponse> CheckLogin(User user);

        Task<User> InsertUser(AddEmployeeRequest req);
        Task<List<Role>> RoleList();
        Task<CheckInResponse> InsertAttendance(CheckInRequest req);

        Task<UserAttendance> EditAttendance(CheckOutRequest req);
        Task<List<UserAttendance>> AttendanceList();
        Task<List<UserAttendance>> SingleAttendanceList(UserAttendanceRequest req);

        Task<Leave> RequestLeave(LeaveRequest lev);

        Task<Leave> AdminLeaveRequest(AdminRequest req);
        Task<List<GetUsersResponse>> GetAllUsers();
        Task<GetUsersResponse> GetUser(int id);
        Task<User> UpdateUser(UpdateUserRequest user);
        Task<User> DeleteUser(int id);
        Task<List<Leave>> GetLeave();
        Task<List<ManagerListResponse>> MangerList();
        Task<List<Leave>> GetAllLeaves(UserID user);
        Task<AddTicketResponse> AddTicket(Tickets ticket);
        Task<List<Tickets>> GetAllTickets();
        Task<List<Tickets>> GetTickets(int id);
        Task <AddTicketResponse> UpdateTickets(UpdateTicketRequest req);

        Task<LeaveEmailResponse> SendLeaveEmail(EmailID email);
        Task<Performance> AddPerform(PerformanceRequest req);

        Task<List<Performance>> GetPerform();
        Task<CheckStatusResponse> CheckCheckIn(CheckStatusRequest req);
        Task<CheckStatusResponse> CheckCheckOut(CheckStatusRequest req);

        Task<List<UserListResponse>> UserList();

        Task<UserAttendance> FinePaid(FineRequest req);
        Task<int> FineCount(int UserID);
    }
    
}
