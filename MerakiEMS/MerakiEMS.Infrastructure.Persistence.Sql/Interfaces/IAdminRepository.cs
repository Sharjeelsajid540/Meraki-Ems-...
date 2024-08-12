using MerakiEMS.Application.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Requests;
using MerakiEMS.Domain.Entities.Contracts.Response;
using MerakiEMS.Domain.Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MerakiEMS.Infrastructure.Persistence.Sql.Interfaces
{
    public interface IAdminRepository
    {
        Task<User> InsertUser(AddEmployeeRequest req);
        Task<List<Role>> RoleList();
        Task<User> UpdateUser(UpdateUserRequest user);
        Task<User> DeleteUser(int id);
        Task<List<ManagerListResponse>> MangerList();
        Task <User> AddEmployee(AddEmployeeRequest req);
        Task <Interviews> InsertCandidate(AddCandidateRequest req);
        Task<List<Interviews>> GetCandidate(bool isDataFilter, string? Name);
        Task <Interviews>UpdateCandidate(UpdateCandidateRequest req);
        Task <bool> DeleteCandidate(Interviews leaveToDelete);
        Task <Interviews> Addapplicant(AddApplicantRequest req);
        //Task<Interviews> Deleteapplicant(int id);
        Task<Interviews> GetUserByID(int id);
        Task<InterviewListResponse> GetapplicantByID(int id);
        Task<List<UserAttendance>> GenerateExcell(GenerateExcellRequest req);
        Task<List<UserListResponse>> Getuserid();
    }
}
